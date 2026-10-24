# Bản đồ JobFind — snapshot 04/10/2026

## Nguồn và độ tin cậy
Đối chiếu package.json, App.js, HomeAdmin.js, HomeCandidate.js, backend routes/models/services và shared contracts trong ZIP. README microservices còn ghi 8 ứng dụng; package workspaces hiện có **9 ứng dụng + 1 gói shared**. Đây là bản đồ source, không phải chứng nhận triển khai.

## Kiến trúc thực tế
| Lớp | Vị trí | Công nghệ / trách nhiệm |
|---|---|---|
| Web | `frontend/src/` | React 18.3, React Router 7.4, JavaScript, react-scripts 5; CSS/SCSS, Ant Design/Reactstrap và các component hiện có |
| API client | `frontend/src/service/`, `frontend/src/axios.js` | Thư mục **service số ít**; axios interceptor trả `response.data`, lỗi thường trở thành object chuẩn hóa |
| Backend cũ | `backend/src/server.js`, `routes/web.js` | Express 5.1, Babel; controller → services → Sequelize 6.37 → MySQL |
| Gateway | `microservices/api-gateway/` | Public API; auth proxy, hợp đồng, JWT, tenant, rate limit, circuit breaker, proxy Socket.IO |
| Identity | `microservices/identity-service/` | Hồ sơ/CV chuẩn bị trong MongoDB; không mặc định là chủ thể xác thực SSO đang chạy |
| Job Core | `microservices/job-core-service/` | Ghi tin/AI tasks/outbox trong MySQL |
| Search | `microservices/search-service/` | Elasticsearch projection, tìm kiếm, gợi ý, lọc dữ liệu công khai |
| Application | `microservices/application-service/` | PostgreSQL hồ sơ, Kanban, lịch sử, outbox tuyển dụng |
| Notification | `microservices/notification-service/` | Nhận event, ledger giao nhận/email; nhận event không đồng nghĩa đã gửi thư |
| Admin | `microservices/admin-service/` | Audit MongoDB và báo cáo từ các nguồn liên quan |
| AI Worker | `microservices/ai-worker/` | Xử lý tác vụ AI qua RabbitMQ, kiểm tra kết quả, chống lặp |
| Support Chat | `microservices/support-chat-service/` | Hỗ trợ AI theo tool/handoff, tách khỏi chat tuyển dụng |

Backend yêu cầu Node >=22.12.0. Cổng thường dùng: frontend 3000/3001, gateway 4000, backend 5000; xác minh `scripts/dev.mjs` và cấu hình runtime trước khi dùng. Không sửa port cố định chỉ theo bảng này.

## Quy tắc không được đánh đồng
- `backend/src/services` là lớp nghiệp vụ trong một tiến trình; `frontend/src/service` là adapter trình duyệt; `microservices` gồm ứng dụng độc lập.
- ID `Cv` ở MySQL, application `id` ở PostgreSQL, `_id` CV chuẩn bị ở MongoDB khác namespace. Join tiến trình bằng `legacy_cv_id`, kèm đối chiếu job ID.
- `ADMIN`, `COMPANY`, `EMPLOYER`, `CANDIDATE` là bốn role. Quyền UI và API dùng tên khác nhau; kiểm tra ma trận tương ứng, không sao chép chuỗi tùy ý.
- Công ty hoạt động/đã duyệt: `statusCode=S1`, `censorCode=CS1`. Quyền sở hữu tenant được kiểm tra ở backend/service, không chỉ bằng menu.
- Source có cả ghi legacy và core. Đổi mode là quyết định rollout, không phải thao tác cần làm để sửa UI.
- `docs/` và `microservices/docs/` đang tồn tại. `.docs/` là tài liệu điều phối bổ sung của bộ skills; không thay thế/xóa tài liệu gốc.

## API và phiên
API cũ thường có `{errCode, errMessage, data}`; payload cụ thể đọc từ controller/service. Không mặc định tất cả response nằm trong `data`. Client bắt cả object lỗi được resolve và exception.
Access token ở bộ nhớ; `token_user` mới chỉ là marker, refresh trong HttpOnly cookie. Chỉ retry GET một lần theo interceptor; request ghi không tự phát lại sau refresh. Phiên/role phải được xác minh lại với backend.

## Đường đọc ưu tiên
1. Router UI → component → `frontend/src/service/*` → gateway/route → controller/service → model/migration.
2. Modern API: `microservices/shared/contracts/operations.js`, `schemas.js`, `responses.js`; `publicPath` thêm `/api`, riêng admin thêm `/api/admin`.
3. Event: `shared/contracts/eventCatalog.js`, `shared/events.js`, `shared/eventEnvelope.js`, outbox/inbox của service chủ quản.
4. Kiểm thử: package scripts hiện tại, test gần module và workflow `.github/workflows/`.
