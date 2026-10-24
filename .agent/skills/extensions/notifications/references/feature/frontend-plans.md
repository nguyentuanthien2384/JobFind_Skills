# Frontend plan · Trung tâm thông báo

Feature ID: `notifications` · Actor: CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/Candidate/CandidateNotifications.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/notificationJobsService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/notification-service/package.json | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `notifications`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Tabs all/unread/type
2. Date-grouped notification rows
3. Unread badges và actions
4. Preferences chỉ phần source hỗ trợ
5. Empty/error/loading

## State/data ownership
- Session/actor lấy từ auth context/source guards; tenant từ server authorization.
- Server lists/tasks qua adapter/hook, UI controls/drafts ở component/hook phù hợp; URL state khi feature có filters/history.
- Dữ liệu schema và DTO đọc endpoint contract; interceptor đã trả response.data và có thể resolve error object.

## Task triển khai
1. Đối chiếu reference và source, chọn variant/mode; ghi khoảng cách cần sửa.
2. Reuse shell/components và tách blocks có props/event callbacks; scoped CSS/SCSS theo tokens reference.
3. Nối actions qua service/hook hiện có, giữ flags và ID namespace.
4. Bổ sung đầy đủ states và validation; khóa submit lặp, giữ draft và rollback optimistic update.
5. Giải quyết responsive/keyboard/PDF/media phù hợp với feature.
6. Chạy focused test/lint/build phù hợp; so screenshot/interaction và cập nhật QA/context.

## Quy tắc không thể bỏ qua
- Destination phải theo quyền của actor và route thật.
- Unread dedupe theo notification ID; mark-read kiểm tra owner.
- Preferences trong thiết kế cần đối chiếu fields source; queued không là delivered.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/get-notification-by-user | legacy | NOTIFICATION_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-notification-jobs | legacy | RECOMMENDATION_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/mark-read-notification | legacy | NOTIFICATION_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/push/config | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/push/subscription | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| DELETE /api/push/subscription | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Kiểm tra behavior
- wrong-role destination
- duplicate event
- deleted application/job
- zero unread
- push permission denied
- mark-read error

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
