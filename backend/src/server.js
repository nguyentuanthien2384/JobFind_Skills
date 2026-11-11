import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initwebRoutes from "./routes/web";
import connectDB from "./config/connectDB";
import http from "http";
import { sendJobMail } from "./utils/schedule";
import { startLegacyOutboxRelay } from "./utils/legacyOutboxRelay";
import { startLegacyModerationConsumer } from "./utils/legacyModerationConsumer";
import { initSocket } from "./config/socket";
import { isAllowedCorsOrigin } from "./config/corsOrigin";
import db from "./models/index";
require("dotenv").config();

let app = express();
app.disable('x-powered-by');
const applyCorsHeaders = (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && isAllowedCorsOrigin(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Authorization,Content-Type,X-Requested-With,Accept,Origin,Idempotency-Key'
    );
    if (req.method === 'OPTIONS') {
        if (origin && !isAllowedCorsOrigin(origin)) return res.sendStatus(403);
        return res.sendStatus(204);
    }
    return next();
};

app.use(applyCorsHeaders);
// Separate limits keep large base64 uploads on the endpoints that need them
// while normal auth/search/chat APIs reject oversized JSON bodies early.
const defaultJsonBody = bodyParser.json({ limit: '1mb' });
const defaultUrlencodedBody = bodyParser.urlencoded({ limit: '1mb', extended: true });
const uploadJsonBody = bodyParser.json({ limit: '50mb' });
const uploadUrlencodedBody = bodyParser.urlencoded({ limit: '50mb', extended: true });
const LARGE_BODY_PATHS = new Set([
    '/api/create-new-cv',
    '/api/create-new-company',
    '/api/update-company',
    '/api/create-new-user',
    '/api/update-user',
    '/api/setDataUserSetting',
]);
const usesLargeBodyParser = (req) => LARGE_BODY_PATHS.has((req.originalUrl || req.url || '').split('?')[0]);
app.use((req, res, next) => (usesLargeBodyParser(req) ? uploadJsonBody : defaultJsonBody)(req, res, next));
app.use((req, res, next) => (usesLargeBodyParser(req) ? uploadUrlencodedBody : defaultUrlencodedBody)(req, res, next));

viewEngine(app);
initwebRoutes(app);

connectDB();

// Tự động tạo các bảng tính năng mới (nếu chưa có trong CSDL)
const syncNewTables = async () => {
    try {
        if (db.CompanyReview) await db.CompanyReview.sync();
        if (db.FavoritePost) await db.FavoritePost.sync();
        if (db.CompanyFollow) await db.CompanyFollow.sync();
        if (db.Notification) await db.Notification.sync();
        if (db.Interview) await db.Interview.sync();
        if (db.ChatMessage) await db.ChatMessage.sync();
        if (db.PointWallet) await db.PointWallet.sync();
        if (db.PointTransaction) await db.PointTransaction.sync();
        if (db.MockInterviewSession) await db.MockInterviewSession.sync();
        if (db.JobInvitation) await db.JobInvitation.sync();
        console.log("All feature tables synced successfully (including Multi-Industry Differentiators).");
    } catch (error) {
        console.log("Warning syncing new feature tables:", error.message);
    }
};
syncNewTables();

sendJobMail();
startLegacyOutboxRelay();
startLegacyModerationConsumer();

const server = http.createServer(app);

// Khoi tao Socket.IO tren cung HTTP server cho tinh nang chat, dashboard & Pizza-Tracker real-time
const io = initSocket(server);
app.set("io", io);

let port = process.env.PORT || 6969;

server.listen(port, () => {
    console.log("Backend Nodejs is running on the port : " + port);
});
