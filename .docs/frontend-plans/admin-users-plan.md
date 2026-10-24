# Frontend plan · Quản lý người dùng

Feature ID: `admin-users` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/User/ManageUser.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/controllers/userController.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `admin-users`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Search/filter/status summary
2. Users table
3. Details/actions
4. Confirm/error/loading
5. Pagination

## State/data ownership
- Session/actor lấy từ auth context/source guards; tenant từ server authorization.
- Server lists/tasks qua adapter/hook, UI controls/drafts ở component/hook phù hợp; URL state khi feature có filters/history.
- Dữ liệu schema và DTO đọc endpoint contract; interceptor đã trả response.data và có thể resolve error object.

## Task triển khai
1. Đối chiếu reference và source, chọn variant/mode; ghi khoảng cách cần sửa.
2. Reuse shell/components và tách blocks có props/event callbacks; scoped CSS/SCSS theo tokens reference.
3. Nối actions qua service/hook hiện có, giữ flags và ID namespace.
4. Bổ sung đầy đủ states và validation; khóa submit lặp, giữ draft và rollback optimistic update.
5. Giải quyết responsive/keyboard/PDF/media phù hợp với feature.
6. Chạy focused test/lint/build phù hợp; so screenshot/interaction và cập nhật QA/context.

## Quy tắc không thể bỏ qua
- Server kiểm tra administration permission; không tin role/userId client cho actor.
- Status/action dùng source, không duyệt users chỉ bằng checkbox local.
- Giữ payload không có password/secrets.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/get-all-user | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/ban-user | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/unban-user | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Kiểm tra behavior
- forbidden actor
- duplicate mutation
- wrong target
- paging after update
- password in response
- long name/email

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
