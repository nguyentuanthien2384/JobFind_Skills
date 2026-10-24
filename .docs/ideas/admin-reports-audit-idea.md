# Ý tưởng · Báo cáo và audit

Feature ID: `admin-reports-audit` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện báo cáo và audit theo nhu cầu actor ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Filter range
2. View report/audit target
3. Export nếu implemented

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Report/ReportDashboard.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/adminReportService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-029 | Revenue & Analytics Dashboard | 1280 × 1613 | source-mapped |

## Quy tắc nghiệp vụ
- Tenant platform reports chỉ ADMIN và permissions đúng.
- Thời gian, totals và filters lấy server/derived dữ liệu thật; chart fixture chỉ design.
- Audit redacts PII/secrets, query có pagination/bounds.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra no data range với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra report source unavailable với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra range timezone với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra forbidden company với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra large pagination với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra audit redaction với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/admin-reports-audit-idea.md → design-briefs/admin-reports-audit-brief.md → frontend-plans/admin-reports-audit-plan.md → backend-plans/admin-reports-audit-plan.md → endpoint-apis/admin-reports-audit-endpoints.md → qa/admin-reports-audit-qa.md
