# Ý tưởng · Chỉnh sửa hồ sơ doanh nghiệp

Feature ID: `company-profile` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện chỉnh sửa hồ sơ doanh nghiệp theo nhu cầu actor COMPANY, EMPLOYER, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Create/edit company
2. Save draft/form
3. Preview public profile

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Company/AddCompany.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/userService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/companyService.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-005 | Company Profile Editor - VNG Corporation | 1280 × 2210 | source-mapped |

## Quy tắc nghiệp vụ
- EMPLOYER không có company chỉ vào onboarding theo CREATE_COMPANY.
- Pending company navigation khác active S1/CS1.
- Verification/license documents không public theo preview.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra owner mismatch với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra pending/rejected/ban state với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra invalid media/link với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra save failure với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra missing company với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra private document preview với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/company-profile-idea.md → design-briefs/company-profile-brief.md → frontend-plans/company-profile-plan.md → backend-plans/company-profile-plan.md → endpoint-apis/company-profile-endpoints.md → qa/company-profile-qa.md
