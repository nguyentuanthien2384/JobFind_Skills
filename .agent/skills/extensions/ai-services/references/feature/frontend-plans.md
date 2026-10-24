# Frontend plan · CV đã chuẩn bị và AI CV

Feature ID: `candidate-cv-ai` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/service/aiSearchService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/identity-service/package.json | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/candidateWorkspace.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/preparedCvPdf.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/components/modal/PreparedCvPicker.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `candidate-cv-ai`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. CV workspace list
2. Upload/import form
3. PDF preview/details
4. AI edit/result panel
5. Pending/failure state
6. CV picker trong apply modal

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
- Prepared CV MongoDB khác snapshot CV nộp legacy.
- 202 nghĩa là accepted task, không phải đã có kết quả AI.
- Xử lý provider unavailable/error và output validation; giữ private files.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/profile/cvs | modern/identity | cv:self:manage | body none; response Cv | 200 | companyRequired=False; idempotency=False |
| POST /api/profile/cvs | modern/identity | cv:self:manage | body CvCreate; response Cv | 201 | companyRequired=False; idempotency=False |
| POST /api/profile/cvs/import | modern/identity | cv:self:manage | body CvImport; response Cv | 201 | companyRequired=False; idempotency=False |
| PUT /api/profile/cvs/:cvId | modern/identity | cv:self:manage | body CvUpdate; response Cv | 200 | companyRequired=False; idempotency=False |
| DELETE /api/profile/cvs/:cvId | modern/identity | cv:self:manage | body none; response Ack | 200 | companyRequired=False; idempotency=False |
| POST /api/ai/parse-resume | modern/jobs | ai:candidate:use | body ParseResume; response AcceptedTask | 202 | companyRequired=False; idempotency=True |
| POST /api/ai/generate-cv | modern/jobs | ai:candidate:use | body GenerateCv; response AcceptedTask | 202 | companyRequired=False; idempotency=True |
| GET /api/ai/tasks/:taskId | modern/jobs | ['ai:candidate:use', 'ai:recruiter:use'] | body none; response Task | 200 | companyRequired=False; idempotency=False |

## Kiểm tra behavior
- empty CVs
- invalid/oversize PDF
- task pending/failed
- stale polling
- owner mismatch
- duplicate task key

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
