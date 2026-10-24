# Ý tưởng · Kết quả tìm việc và bộ lọc

Feature ID: `job-search` · Actor: PUBLIC, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện kết quả tìm việc và bộ lọc theo nhu cầu actor PUBLIC, CANDIDATE, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Đổi keyword/filter/sort
2. Chuyển trang
3. Mở chi tiết/lưu job
4. Clear filters

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/JobPage/JobPage.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/aiSearchService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-036 | Tuyển Dụng VN - Search Results | 1280 × 1944 | source-mapped |

## Quy tắc nghiệp vụ
- Filters dùng codes/schemas source và pagination có bounds.
- URL lưu filter, back/forward phải hồi phục kết quả.
- Response trễ không ghi đè query mới; debounce theo hook/lodash đã có.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra zero results với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra network timeout/object error với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra đổi query nhanh với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra page ngoài range với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra back/forward với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra mode legacy/search với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/job-search-idea.md → design-briefs/job-search-brief.md → frontend-plans/job-search-plan.md → backend-plans/job-search-plan.md → endpoint-apis/job-search-endpoints.md → qa/job-search-qa.md
