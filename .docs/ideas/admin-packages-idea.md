# Ý tưởng · Quản lý gói đăng tin và CV

Feature ID: `admin-packages` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện quản lý gói đăng tin và cv theo nhu cầu actor ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Create/edit package
2. Activate/deactivate
3. View catalog/paging

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/PackagePost/ManagePackagePost.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/PackageCv/ManagePackageCv.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-026 | Quản lý Gói dịch vụ | 1280 × 1580 | source-mapped |

## Quy tắc nghiệp vụ
- Hai catalogs post/CV, model/type/quota/price distinct.
- Không biến UI combined table thành một backend package model duy nhất.
- Admin changes không viết lại entitlement đã mua ngoài policy source.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra invalid amount/quota với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra wrong type với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra forbidden company actor với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra existing entitlement compatibility với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate submit với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/admin-packages-idea.md → design-briefs/admin-packages-brief.md → frontend-plans/admin-packages-plan.md → backend-plans/admin-packages-plan.md → endpoint-apis/admin-packages-endpoints.md → qa/admin-packages-qa.md
