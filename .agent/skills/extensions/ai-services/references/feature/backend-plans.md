# Backend plan · CV đã chuẩn bị và AI CV

Feature ID: `candidate-cv-ai` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Nguồn hiện hành
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/service/aiSearchService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/identity-service/package.json | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/candidateWorkspace.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/preparedCvPdf.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/components/modal/PreparedCvPicker.js | File hiện có, đọc khi triển khai để tránh drift |

## Owner và dữ liệu
Trace endpoint tới controller/service/store. Legacy backend và job-core MySQL, application PostgreSQL, identity/audit MongoDB và search projection có owner riêng. Feature không cần schema mới thì ghi không áp dụng; không tạo bảng chỉ từ layout.

## API hiện có
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

## Quy tắc dữ liệu và nghiệp vụ
- Prepared CV MongoDB khác snapshot CV nộp legacy.
- 202 nghĩa là accepted task, không phải đã có kết quả AI.
- Xử lý provider unavailable/error và output validation; giữ private files.

## Trình tự task
1. Đọc route/guard/controller/service/schema và xác định phần reuse/đổi/thêm.
2. Validate params/query/body theo contract thật; actor/tenant lấy phía server.
3. Chỉ thêm migration khi field/index/constraint cần thiết; ghi rollback/backfill.
4. Đặt state write và outbox trong cùng transaction khi feature có event, dedupe tại consumer.
5. Giữ response/error/pagination tương thích adapter frontend; không tự replay write sau timeout/refresh.
6. Kiểm tra success/failure/401/403/owner chéo/duplicate phù hợp; cập nhật endpoint và QA.

## Consistency và failure
- application.id, legacy_cv_id, job ID và prepared CV _id phải được ghi đúng trong mapping.
- Phân biệt accepted/queued/sent/delivered. Nếu dependency/provider lỗi, ghi state có thể retry đúng phạm vi.
- Internal route không public vì permission field null; đọc trust middleware và gateway registration.

## Test theo rủi ro
- empty CVs
- invalid/oversize PDF
- task pending/failed
- stale polling
- owner mismatch
- duplicate task key

## Kết quả
Patch vào owner/controller/service/contract/model thực sự cần thiết; kiểm tra có evidence và plan rollout nếu user giao đổi mode. Các lệnh live migration/seed/payment/email không được tự chạy để hoàn tất plan.
