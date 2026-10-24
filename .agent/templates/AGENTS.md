# JobFind — Quy tắc làm việc

## Đọc trước
Đọc .agent/skill-registry.md, .docs/CONTEXT.md, ARCHITECTURE và feature docs liên quan. Source hiện tại/quy tắc người dùng ưu tiên snapshot. Không nạp toàn bộ bộ skills vào một context.

## Stack và trace
React 18 JavaScript/JSX + CRA; CSS/SCSS/Ant Design/Reactstrap. Adapter frontend/src/service, axios frontend/src/axios.js. Express/Babel + Sequelize/MySQL legacy, microservices/shared contracts; PostgreSQL/MongoDB/Elasticsearch/RabbitMQ theo service ownership. Không tự chuyển sang Next/Nest/Prisma/TypeScript/shadcn.

Trace role/permission/tenant → route/parent guard → component → adapter/flags → endpoint/controller/service/store → model/contracts/tests. Giữ spelling route legacy. Tenant/actor do server xác minh; không tin role/user từ body. Giữ namespace application.id/legacy Cv.id/Mongo CV _id và stage keys.

## Thiết kế
Stitch https://stitch.withgoogle.com/projects/4225480897019041322 là exact reference 37 màn. Default match-reference, giữ từng variant/tokens/section order; normalized branding chỉ theo yêu cầu. Screen local JF IDs không phải Stitch IDs. Figma V2 là bộ mở rộng 192 screen/state độc lập. Màn mới từ route backlog là extension; calendar/settings/recurring billing cần plan source.

## Thực hiện
Chọn workflow và skills theo delta. Task nhiều lớp dùng cùng feature ID cho idea/design/frontend/backend/API/QA. Hợp nhất tài liệu hiện có, giữ lịch sử, không ghi đè force. Tiếp tục hoàn thành phạm vi đã giao mà không ép Continue sau từng bước.

Access token memory/refresh HttpOnly cookie; marker token_user không là token. GET có refresh retry theo source, writes không tự replay. Giữ flags hiện hành, response/envelope và idempotency contract. Dữ liệu thiết kế synthetic; không lưu secrets/PII/CV thật trong docs/logs.

## Bằng chứng
design_status/code_status/test_status độc lập. PNG, source tồn tại hoặc build pass chưa chứng minh feature hoạt động/khớp thiết kế. Chạy focused checks cần thiết, ghi lệnh/kết quả/skipped thật. Không tự gửi thư, mua gói, migrate production, activate flags hay deploy ngoài phạm vi được giao.

## Tiếp tục
Cập nhật .docs/CONTEXT.md, FEATURES_DONE.md và .stitch/backlog.json theo evidence. Archive nguyên bản trước rút gọn context. Xem .agent/scripts cho inventory/coverage/prompt/baton/checkpoint. Slash commands cần IDE hỗ trợ; đọc workflow trực tiếp khi không có.
