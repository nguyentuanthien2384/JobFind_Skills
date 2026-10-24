# Ý tưởng · Trung tâm thông báo

Feature ID: `notifications` · Actor: CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện trung tâm thông báo theo nhu cầu actor CANDIDATE, COMPANY, EMPLOYER, ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Mở thông báo
2. Đánh dấu đọc
3. Chuyển tab/paging
4. Opt-in push theo UI action

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/Candidate/CandidateNotifications.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/notificationJobsService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/notification-service/package.json | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-033 | Trung Tâm Thông Báo - Tuyển Dụng VN | 1280 × 1378 | source-mapped |

## Quy tắc nghiệp vụ
- Destination phải theo quyền của actor và route thật.
- Unread dedupe theo notification ID; mark-read kiểm tra owner.
- Preferences trong thiết kế cần đối chiếu fields source; queued không là delivered.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra wrong-role destination với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate event với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra deleted application/job với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra zero unread với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra push permission denied với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra mark-read error với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/notifications-idea.md → design-briefs/notifications-brief.md → frontend-plans/notifications-plan.md → backend-plans/notifications-plan.md → endpoint-apis/notifications-endpoints.md → qa/notifications-qa.md
