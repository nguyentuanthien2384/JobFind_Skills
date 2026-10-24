# Ý tưởng · Dashboard doanh nghiệp

Feature ID: `employer-dashboard` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện dashboard doanh nghiệp theo nhu cầu actor COMPANY, EMPLOYER, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Đi quản lý tin/pipeline
2. Xem ứng viên
3. Mua gói theo quyền
4. Mở attention target

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Home.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/Dashboard/CompanyDashboard.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/adminNavigation.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-034 | Tuyển Dụng VN - Dashboard Doanh Nghiệp | 1280 × 1455 | source-mapped |

## Quy tắc nghiệp vụ
- Cùng /admin/ với platform admin nhưng component/data theo actor.
- Stats giới hạn company scope; không gọi platform revenue reports từ doanh nghiệp.
- Số fixture không được hiển thị như data thật.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra company unverified/no membership với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra zero activity với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra report API error với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra employer permission subset với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra mobile cards với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/employer-dashboard-idea.md → design-briefs/employer-dashboard-brief.md → frontend-plans/employer-dashboard-plan.md → backend-plans/employer-dashboard-plan.md → endpoint-apis/employer-dashboard-endpoints.md → qa/employer-dashboard-qa.md
