# Frontend plan · Kanban, đánh giá và AI tuyển dụng

Feature ID: `pipeline` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Cv/KanbanBoard.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/applicationService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/application-service/src/libs/db.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/application-service/src/controllers/applicationController.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `pipeline`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Recruiter shell/job selector
2. 6 Kanban columns
3. Candidate cards với state thật
4. Detail drawer/rating/notes/history
5. Actions phỏng vấn/offer
6. AI screening panel và readiness

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
- Dùng 6 stage keys source thay vì labels tiếng Anh mẫu.
- application.id khác legacy_cv_id; mỗi action dùng đúng ID.
- Stage history/notes/rating/outbox cần tenant và transaction; AI chỉ hỗ trợ review.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/applications/stages | modern/applications | application:manage | body none; response Record | 200 | companyRequired=True; idempotency=False |
| GET /api/applications/board | modern/applications | application:manage | body none; response Record | 200 | companyRequired=True; idempotency=False |
| PATCH /api/applications/:id/stage | modern/applications | application:manage | body MoveStage; response Application | 200 | companyRequired=True; idempotency=False |
| PATCH /api/applications/:id/rating | modern/applications | application:manage | body Rating; response Application | 200 | companyRequired=True; idempotency=False |
| POST /api/applications/:id/notes | modern/applications | application:manage | body Note; response Record | 201 | companyRequired=True; idempotency=False |

## Kiểm tra behavior
- unauthorized job
- stale optimistic update
- duplicate move
- AI failure
- CV mapping mismatch
- keyboard/mobile drag alternative

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
