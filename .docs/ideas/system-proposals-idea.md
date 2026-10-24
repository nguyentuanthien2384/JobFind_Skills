# Ý tưởng · Màn tổng hợp chưa có đầy đủ source

Feature ID: `system-proposals` · Actor: ADMIN, COMPANY

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện màn tổng hợp chưa có đầy đủ source theo nhu cầu actor ADMIN, COMPANY, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Lập kế hoạch feature mới
2. Vẽ prototype có nhãn
3. Triển khai sau khi scope/dependencies xác định

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/HomeAdmin.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-003 | Billing & Subscriptions | 1280 × 1160 | partial |
| JF-004 | Cài Đặt Hệ Thống - Admin Panel | 1280 × 1413 | proposal |
| JF-013 | Lịch Phỏng Vấn & Agenda | 1280 × 1049 | partial |
| JF-014 | Lịch Phỏng Vấn - Career Architect | 1280 × 1035 | partial |

## Quy tắc nghiệp vụ
- System settings tổng quát chưa có /admin/settings.
- Calendar tổng hợp không đồng nhất với interview-invitation endpoint.
- Recurring subscriptions không đồng nhất mua gói post/CV.
- Lập owner/schema/API/role/route plan trước implementation; UI offline vẫn có thể vẽ tiếp và ghi proposal.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra route/API absent với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra permission design chưa quyết định với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra prototype-only actions với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra no live claims với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra migration implications với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/system-proposals-idea.md → design-briefs/system-proposals-brief.md → frontend-plans/system-proposals-plan.md → backend-plans/system-proposals-plan.md → endpoint-apis/system-proposals-endpoints.md → qa/system-proposals-qa.md
