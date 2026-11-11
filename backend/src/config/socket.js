// ============================================================
// CAU HINH SOCKET.IO — REAL-TIME CHAT & DASHBOARD & MULTI-INDUSTRY TRACKER
// Moi user khi ket noi se tu dong tham gia room "user:{userId}" (va "user_{userId}")
// ============================================================

const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const chatService = require('../services/chatService');
const { isAllowedCorsOrigin } = require('./corsOrigin');
const { verifyActiveSessionPayload } = require('../middlewares/jwtVerify');

let ioInstance = null;

// Luu danh sach userId dang online: Map<userId, Set<socketId>>
const onlineUsers = new Map();
const roomOf = (id) => `user:${id}`;

const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: (origin, callback) => callback(null, isAllowedCorsOrigin(origin)),
            methods: ['GET', 'POST'],
            credentials: true,
        },
        // Cho phep client cu ket noi bang ca websocket va polling
        transports: ['websocket', 'polling'],
    });

    // --- Xac thuc JWT khi ket noi Socket ---
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth && socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Chưa đăng nhập'));
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: ['HS256', 'HS384', 'HS512'],
            });
            const verified = await verifyActiveSessionPayload(decoded);
            if (!verified) {
                return next(new Error('Token không hợp lệ hoặc đã hết hạn'));
            }
            socket.userId = verified.user.id;
            socket.roleCode = verified.authorization.roleCode;
            socket.companyId = verified.authorization.companyId;
            return next();
        } catch (err) {
            return next(new Error('Token không hợp lệ hoặc đã hết hạn'));
        }
    });

    io.on('connection', (socket) => {
        const userId = socket.userId;

        // Moi user vao room rieng (ho tro ca 2 dinh dang room user:id va user_id)
        socket.join(roomOf(userId));
        socket.join(`user_${userId}`);

        // Cap nhat danh sach online
        if (!onlineUsers.has(userId)) {
            onlineUsers.set(userId, new Set());
        }
        onlineUsers.get(userId).add(socket.id);

        // Thong bao cho tat ca biet user nay vua online
        io.emit('user:online', { userId, online: true });

        // Gui danh sach user dang online cho nguoi vua ket noi
        socket.emit('users:online-list', Array.from(onlineUsers.keys()));

        // ============================================================
        // SU KIEN: Gui tin nhan real-time
        // ============================================================
        socket.on('chat:send', async (payload, callback) => {
            try {
                const { receiverId, content, jobPostId } = payload || {};
                const result = await chatService.sendMessage({
                    senderId: userId,
                    receiverId,
                    content,
                    jobPostId: jobPostId || null,
                });

                if (result.errCode === 0) {
                    // Day tin nhan ngay lap tuc cho nguoi nhan (neu dang online)
                    io.to(roomOf(receiverId)).emit('chat:new-message', result.data);
                    // Dong bo cho cac tab khac cua chinh nguoi gui
                    socket.to(roomOf(userId)).emit('chat:new-message', result.data);
                }

                if (typeof callback === 'function') {
                    callback(result);
                }
            } catch (error) {
                console.error('Socket chat:send error:', error);
                if (typeof callback === 'function') {
                    callback({ errCode: -1, errMessage: 'Lỗi máy chủ khi gửi tin nhắn' });
                }
            }
        });

        // ============================================================
        // SU KIEN: Danh dau da doc cuoc tro chuyen
        // ============================================================
        socket.on('chat:mark-read', async (payload) => {
            try {
                const { partnerId } = payload || {};
                if (!partnerId) return;
                await chatService.markMessagesAsRead(userId, partnerId);
                // Bao cho doi phuong biet tin nhan cua ho da duoc xem
                io.to(roomOf(partnerId)).emit('chat:messages-read', {
                    readerId: userId,
                    partnerId: Number(partnerId),
                });
            } catch (error) {
                console.error('Socket chat:mark-read error:', error);
            }
        });

        // ============================================================
        // SU KIEN: Dang go phim (typing indicator)
        // ============================================================
        socket.on('chat:typing', (payload) => {
            const { receiverId, isTyping } = payload || {};
            if (!receiverId) return;
            io.to(roomOf(receiverId)).emit('chat:typing', {
                senderId: userId,
                isTyping: Boolean(isTyping),
            });
        });

        // ============================================================
        // NGAT KET NOI
        // ============================================================
        socket.on('disconnect', () => {
            if (onlineUsers.has(userId)) {
                onlineUsers.get(userId).delete(socket.id);
                if (onlineUsers.get(userId).size === 0) {
                    onlineUsers.delete(userId);
                    io.emit('user:online', { userId, online: false });
                }
            }
        });
    });

    ioInstance = io;
    return io;
};

const getIO = () => ioInstance;

// ============================================================
// PHAT TIN HIEU REALTIME CHO MULTI-INDUSTRY DIFFERENTIATOR
// (cv:stage_updated, invitation:received, invitation:responded)
// ============================================================
const emitDifferentiatorEvent = (userId, eventName, payload) => {
    if (!ioInstance || !userId || !eventName) return;
    ioInstance.to(roomOf(userId)).emit(eventName, payload);
    ioInstance.to(`user_${userId}`).emit(eventName, payload);
};

// ============================================================
// PHAT TIN HIEU CAP NHAT DASHBOARD THEO PHAM VI QUYEN HAN
// ============================================================
const emitDashboardChanged = async (reason = 'general', scope = {}) => {
    if (!ioInstance) return;
    const payload = { reason, timestamp: Date.now() };
    const targets = new Set();

    const addUsers = async (where) => {
        const rows = await db.User.findAll({ where, attributes: ['id'], raw: true });
        rows.forEach((u) => targets.add(u.id));
    };

    try {
        const admins = await db.Account.findAll({
            where: { roleCode: 'ADMIN', statusCode: 'S1' },
            attributes: ['userId'],
            raw: true,
        });
        admins.forEach((a) => {
            if (a.userId) targets.add(a.userId);
        });

        let companyId = scope.companyId || null;
        if (!companyId && scope.postId) {
            const post = await db.Post.findOne({
                where: { id: scope.postId },
                attributes: ['userId'],
                raw: true,
            });
            if (post && post.userId) {
                targets.add(post.userId);
                const owner = await db.User.findOne({
                    where: { id: post.userId },
                    attributes: ['companyId'],
                    raw: true,
                });
                if (owner && owner.companyId) companyId = owner.companyId;
            }
        }
        if (companyId) {
            await addUsers({ companyId });
        }
        if (scope.userId) {
            targets.add(Number(scope.userId));
        }

        targets.forEach((uid) => {
            ioInstance.to(roomOf(uid)).emit('dashboard:changed', payload);
        });
    } catch (err) {
        console.error('emitDashboardChanged error:', err);
    }
};

module.exports = {
    initSocket,
    getIO,
    emitDifferentiatorEvent,
    emitDashboardChanged,
};
