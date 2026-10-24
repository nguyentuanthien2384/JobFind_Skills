# Frontend plan · Đăng và quản lý tin

Feature ID: `job-posting` · Actor: COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Post/AddPost.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/jobPostingService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `job-posting`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Header/stepper
2. Title/category/location/basic fields
3. Description/requirements/benefits
4. Salary/experience/work type
5. Preview/quota feedback
6. Validation và submitting state

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
- Giữ JOB_MANAGE/owner/company state và quota server.
- Wizard sử dụng một contract field set, không thêm endpoint từng bước.
- Create/repost idempotency giữ một key cho một thao tác; source flags quyết định mode.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/create-new-post | legacy | JOB_MANAGE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/create-reup-post | legacy | JOB_MANAGE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| PUT /api/update-post | legacy | JOB_MANAGE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/jobs | modern/jobs | job:manage | body JobCreate; response Job | 201 | companyRequired=True; idempotency=True |
| PUT /api/jobs/:id | modern/jobs | job:manage | body JobUpdate; response Job | 200 | companyRequired=True; idempotency=False |
| POST /api/jobs/:id/repost | modern/jobs | job:manage | body JobRepost; response Job | 201 | companyRequired=True; idempotency=True |
| GET /api/jobs/manage | modern/jobs | job:manage | body none; response ManagedJobRow | 200 | companyRequired=True; idempotency=False |

## Kiểm tra behavior
- invalid catalog code
- quota 0
- duplicate repost
- job outside tenant
- core vs legacy
- write refresh failure

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
