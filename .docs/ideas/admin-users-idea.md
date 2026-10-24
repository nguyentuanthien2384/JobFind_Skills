# Ý tưởng · Quản lý người dùng

Feature ID: `admin-users` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện quản lý người dùng theo nhu cầu actor ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Search/paging
2. Ban/unban theo quyền
3. Mở user detail

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/User/ManageUser.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/controllers/userController.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-027 | Quản Lý Người Dùng - Admin Panel | 1280 × 1138 | source-mapped |

## Quy tắc nghiệp vụ
- Server kiểm tra administration permission; không tin role/userId client cho actor.
- Status/action dùng source, không duyệt users chỉ bằng checkbox local.
- Giữ payload không có password/secrets.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra forbidden actor với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate mutation với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra wrong target với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra paging after update với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra password in response với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra long name/email với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/admin-users-idea.md → design-briefs/admin-users-brief.md → frontend-plans/admin-users-plan.md → backend-plans/admin-users-plan.md → endpoint-apis/admin-users-endpoints.md → qa/admin-users-qa.md
