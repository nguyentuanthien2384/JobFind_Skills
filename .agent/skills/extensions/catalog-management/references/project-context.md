# Bối cảnh JobFind — snapshot 05/10/2026

## Nguồn hiện hành
Xác định root có frontend/package.json, backend/package.json và microservices/package.json. Đọc AGENTS.md hiện có và source mới trước sửa. Snapshot từ ZIP chỉ là bản đồ static; chưa chứng minh runtime hoặc production đang hoạt động.

## Stack và đường dẫn
- frontend: React 18.3/React Router 7.4, JavaScript/JSX, react-scripts 5 CRA, CSS/SCSS, Ant Design/Reactstrap.
- Frontend adapter ở frontend/src/service (số ít); axios ở frontend/src/axios.js.
- Legacy backend: Express 5/Babel, backend/src/controllers → backend/src/services → Sequelize 6/MySQL.
- microservices: gateway, identity, job-core, search, application, notification, admin, AI worker, support-chat + shared; package scripts/workspaces là nguồn xác minh.
- Job core MySQL; application PostgreSQL; profile/prepared CV và audit MongoDB; Elasticsearch search projection; RabbitMQ outbox/inbox.

## Session, dữ liệu và quyền
- Access token memory, refresh cookie HttpOnly; localStorage token_user là marker. Interceptor trả response.data và có thể resolve object lỗi.
- GET được retry một lần sau refresh theo source; thao tác ghi phải do người dùng chủ đích gửi lại, không tự replay.
- ADMIN, COMPANY, EMPLOYER, CANDIDATE có permission riêng. Kiểm tra frontend/src/auth/accessControl.js, backend/src/utils/authorization.js và microservices/shared/accessControl.js; strings giữa lớp có thể khác.
- Company state hoạt động/duyệt S1/CS1; tenant/owner do server xác minh. Signup không tự chọn ADMIN/COMPANY.
- application.id, legacy Cv.id và MongoDB prepared CV _id khác nhau; legacy_cv_id và job ID dùng để nối đúng.
- Stage keys: moi_ung_tuyen, dang_xem_xet, phong_van, de_nghi, nhan_viec, tu_choi.
- Modern path /api + operation.path; admin /api/admin + path. Legacy /api/accecpt-company, /admin/list-candiate và /api/fillter-cv-by-selection giữ spelling hiện có.

## Thứ tự đọc
Router/parent guards → screen/component → adapter/flags → route/gateway → controller/service/store → models/contracts → tests. Đọc actual schema trước quyết định field; không lấy ảnh làm database schema.

## Trạng thái có bằng chứng
Theo dõi design_status, code_status, test_status độc lập. Có màn thiết kế hoặc source component không chứng minh UI khớp reference. Ghi passed/failed/skipped theo kiểm tra đã chạy. Ghi PROPOSAL cho calendar tổng hợp, general system settings và recurring subscriptions còn thiếu source.
