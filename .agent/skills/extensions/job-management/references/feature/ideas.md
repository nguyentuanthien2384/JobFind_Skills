# Ý tưởng · Đăng và quản lý tin

Feature ID: `job-posting` · Actor: COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện đăng và quản lý tin theo nhu cầu actor COMPANY, EMPLOYER, ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Tạo/sửa/repost tin
2. Preview
3. Quản lý/filter tin

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Post/AddPost.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/jobPostingService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-021 | Đăng Tin Tuyển Dụng - Bước 1 | 1280 × 1377 | source-mapped |

## Quy tắc nghiệp vụ
- Giữ JOB_MANAGE/owner/company state và quota server.
- Wizard sử dụng một contract field set, không thêm endpoint từng bước.
- Create/repost idempotency giữ một key cho một thao tác; source flags quyết định mode.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra invalid catalog code với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra quota 0 với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate repost với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra job outside tenant với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra core vs legacy với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra write refresh failure với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/job-posting-idea.md → design-briefs/job-posting-brief.md → frontend-plans/job-posting-plan.md → backend-plans/job-posting-plan.md → endpoint-apis/job-posting-endpoints.md → qa/job-posting-qa.md
