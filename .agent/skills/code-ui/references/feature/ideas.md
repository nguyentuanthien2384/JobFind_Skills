# Ý tưởng · Shell, navigation và layout chung

Feature ID: `master-layout` · Actor: PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện shell, navigation và layout chung theo nhu cầu actor PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Đi đến đúng route qua menu
2. Giữ back/forward và deep-link
3. Đăng nhập/đăng xuất cập nhật shell

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/App.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/HomeAdmin.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/Candidate/HomeCandidate.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/auth/RouteGuard.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/auth/accessControl.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

## Quy tắc nghiệp vụ
- Menu xuất hiện theo permission và company state, không chỉ role.
- Đọc guard ở router cha; permission list rỗng từ parser không chứng minh public.
- Giữ chat, support, candidate và admin shells theo router thật.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra anonymous deep-link protected với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra company pending state với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra employer chưa có công ty với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra role đổi giữa hai tab với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra long breadcrumb/mobile overflow với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/master-layout-idea.md → design-briefs/master-layout-brief.md → frontend-plans/master-layout-plan.md → backend-plans/master-layout-plan.md → endpoint-apis/master-layout-endpoints.md → qa/master-layout-qa.md
