# Ý tưởng · Tổng quan quản trị

Feature ID: `admin-overview` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện tổng quan quản trị theo nhu cầu actor ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Đổi period
2. Mở target moderation
3. Mở reports
4. Export chỉ khi source hỗ trợ

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Dashboard/AdminDashboard.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/adminReportService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-002 | Admin Dashboard Overview | 1280 × 1434 | source-mapped |

## Quy tắc nghiệp vụ
- ADMIN platform data khác company dashboard cùng route /admin/.
- Modern admin endpoints có /api/admin prefix.
- Stats/chart không dùng fixture khi user yêu cầu tích hợp thật.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra non-admin forbidden với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra empty range với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra partial report error với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra time zone bounds với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra fixture/live separation với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/admin-overview-idea.md → design-briefs/admin-overview-brief.md → frontend-plans/admin-overview-plan.md → backend-plans/admin-overview-plan.md → endpoint-apis/admin-overview-endpoints.md → qa/admin-overview-qa.md
