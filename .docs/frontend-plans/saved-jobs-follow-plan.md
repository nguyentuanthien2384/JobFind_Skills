# Frontend plan · Việc đã lưu và công ty theo dõi

Feature ID: `saved-jobs-follow` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/service/userService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/followCompanyService.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `saved-jobs-follow`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Saved jobs list
2. Followed companies list
3. Empty/recommendation state
4. Filter và navigation đến detail

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
- Social permissions từ session và ownership từ server.
- Toggle state cần rollback nếu API lỗi; không coi fixture favorite là trạng thái thật.
- Job/company không còn public phải xử lý có thông báo phù hợp.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/toggle-favorite-post | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-favorite-post-by-user | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/toggle-follow-company | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-followed-company-by-user | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Kiểm tra behavior
- guest denied
- duplicate click
- API error rollback
- deleted target
- session change
- empty lists

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
