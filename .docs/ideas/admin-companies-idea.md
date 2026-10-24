# Ý tưởng · Duyệt và xác thực doanh nghiệp

Feature ID: `admin-companies` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện duyệt và xác thực doanh nghiệp theo nhu cầu actor ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Chọn company
2. Đọc hồ sơ
3. Approve/ban/unban
4. Refresh queue

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Company/ManageCompany.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/companyService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-008 | Duyệt Hồ Sơ Công Ty | 1280 × 1057 | source-mapped |
| JF-037 | Xác thực Doanh nghiệp - Admin | 1280 × 1024 | source-mapped |

## Quy tắc nghiệp vụ
- Giữ spelling accecpt-company từ source.
- Censor CS1 và status S1 không đồng nghĩa chỉ một boolean verified.
- Giấy phép/xác minh private: chỉ role/owner được phép.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra private doc access với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra stale row selected với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra pending/ban combinations với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra cross-role với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate approval với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/admin-companies-idea.md → design-briefs/admin-companies-brief.md → frontend-plans/admin-companies-plan.md → backend-plans/admin-companies-plan.md → endpoint-apis/admin-companies-endpoints.md → qa/admin-companies-qa.md
