# Ý tưởng · Danh sách và chi tiết công ty

Feature ID: `companies` · Actor: PUBLIC, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện danh sách và chi tiết công ty theo nhu cầu actor PUBLIC, CANDIDATE, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Tìm/lọc/sort công ty
2. Mở /detail-company/:id
3. Theo dõi công ty
4. Review theo actor hợp lệ

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/Company/ListCompany.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/userService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/companyService.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-006 | Danh Mục Công Ty | 1280 × 2475 | source-mapped |
| JF-007 | Danh Sách Công Ty - Tuyển Dụng VN | 1280 × 1758 | source-mapped |

## Quy tắc nghiệp vụ
- JF-006 và JF-007 là 2 biến thể cùng /company.
- Public company không lộ verification documents.
- Follow/review chỉ khi quyền social hợp lệ; giữ company state.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra public/private separation với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra company banned/pending với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra guest follow với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra zero companies với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra logo lỗi với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra paging với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/companies-idea.md → design-briefs/companies-brief.md → frontend-plans/companies-plan.md → backend-plans/companies-plan.md → endpoint-apis/companies-endpoints.md → qa/companies-qa.md
