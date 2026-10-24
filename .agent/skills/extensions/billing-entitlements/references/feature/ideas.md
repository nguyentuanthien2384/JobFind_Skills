# Ý tưởng · Mua gói và lịch sử giao dịch

Feature ID: `billing-packages` · Actor: COMPANY, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện mua gói và lịch sử giao dịch theo nhu cầu actor COMPANY, ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Chọn gói
2. Mở luồng thanh toán
3. Xem lịch sử
4. Đi sử dụng quota

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Post/BuyPost.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/PackageCv/BuyCv.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/packageCvService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-003 | Billing & Subscriptions | 1280 × 1160 | partial |

## Quy tắc nghiệp vụ
- Post/CV packages và histories là dữ liệu tách biệt.
- Payment success cần xác minh server và idempotency callback; return URL chưa đủ.
- Recurring/auto-renew trong JF-003 chưa có đầy đủ route/contract; ghi proposal.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra duplicate payment callback với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra cancel/error với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra inactive package với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra price tampering với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra quota expired với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra recurring unsupported với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/billing-packages-idea.md → design-briefs/billing-packages-brief.md → frontend-plans/billing-packages-plan.md → backend-plans/billing-packages-plan.md → endpoint-apis/billing-packages-endpoints.md → qa/billing-packages-qa.md
