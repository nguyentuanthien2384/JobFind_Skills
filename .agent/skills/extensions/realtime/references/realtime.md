# Chat, PDF, push và reconnect

Đọc `backend/src/config/socket.js`, `services/chatService.js`, `chatMediaService.js`, `realtimePresenceService.js`, `webPushService.js`, `utils/chatProtocol.js`, `chatPdf.js`, `realtimeLimiter.js`; frontend `container/Chat/`, `components/chat/`, `push/`; gateway upgrade proxy. Tìm và đọc tests tương ứng.

## Ranh giới nghiệp vụ
Chat tuyển dụng giữa ứng viên và nhà tuyển dụng đủ quyền khác Support Chat/handoff với admin. Dùng policy ở server để cho phép cặp người/tenant; không chỉ chặn UI. Chat support chưa hỗ trợ PDF/job sharing như chat tuyển dụng.

## Reliability
- Authenticate socket qua token/session thật; revalidate revoked session và hết JWT. Đọc cơ chế reconnect hiện có trước sửa; không thêm lưu JWT bền vững.
- Giữ `clientMessageId` của cùng ý định gửi cho retry/ack timeout. Merge optimistic item theo server ID/client ID; không append trùng sau reconnect hoặc history fetch.
- Có sending/sent/failed/retry rõ ràng; không hiển thị sent trước ack/lưu bền vững tương ứng. Cleanup listener và timer khi component unmount/account thay đổi.
- Kiểm tra room membership, rate limits, multi-tab, reconnect qua gateway/nginx và Redis adapter nếu phần sửa liên quan; không chỉ thử websocket direct backend.

## Media
HTTP `/api/chat-attachments` nhận PDF và trả ID; socket chỉ gửi reference, không BLOB/base64. `GET /api/chat-attachments/:id` private, receiver đọc được sau send, quan hệ chat còn hợp lệ. `GET /api/chat-jobs` trả job của đúng company/partner.
Chat PDF: 5 MiB và 100 trang theo code/doc hiện tại; AI PDF khác (20 trang). Kiểm tra magic bytes/parse/password/forbidden actions/timeout/size; cấu trúc hợp lệ không đồng nghĩa antivirus. Không đưa PDF/CV lên URL công khai, log, local/sessionStorage hoặc Web Push.
Tái dùng `components/documents` và PDF.js assets copy script; không dùng CDN để đọc tài liệu riêng tư. Bản tin chia sẻ có snapshot và link phiên bản mới; không tự thay snapshot cũ.

## Notifications/push
Permission push do người dùng chọn. Binding subscription đúng session, cleanup logout/account switch; không gửi PII/CV trong payload. Theo dõi job-company dùng policy và destination hiện có (`notificationDestination.js`, `notificationJobsService.js`). unread count và click destination phải đúng role/quyền.

## Kiểm tra
Duplicate send/ack mất, history + incoming race, reconnect, expired/revoked token, forged receiver/attachment ID, receiver đọc trước send, tenant đổi trạng thái, PDF quá giới hạn, multi-tab/logout và mobile composer. Browser/live scripts có thể tạo DB QA hoặc gửi push; đọc và xác định target trước chạy.
