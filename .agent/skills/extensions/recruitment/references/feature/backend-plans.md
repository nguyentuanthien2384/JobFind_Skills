# Backend plan · Kanban, đánh giá và AI tuyển dụng

Feature ID: `pipeline` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Nguồn hiện hành
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Cv/KanbanBoard.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/applicationService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/application-service/src/libs/db.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/application-service/src/controllers/applicationController.js | File hiện có, đọc khi triển khai để tránh drift |

## Owner và dữ liệu
Trace endpoint tới controller/service/store. Legacy backend và job-core MySQL, application PostgreSQL, identity/audit MongoDB và search projection có owner riêng. Feature không cần schema mới thì ghi không áp dụng; không tạo bảng chỉ từ layout.

## API hiện có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/applications/stages | modern/applications | application:manage | body none; response Record | 200 | companyRequired=True; idempotency=False |
| GET /api/applications/board | modern/applications | application:manage | body none; response Record | 200 | companyRequired=True; idempotency=False |
| PATCH /api/applications/:id/stage | modern/applications | application:manage | body MoveStage; response Application | 200 | companyRequired=True; idempotency=False |
| PATCH /api/applications/:id/rating | modern/applications | application:manage | body Rating; response Application | 200 | companyRequired=True; idempotency=False |
| POST /api/applications/:id/notes | modern/applications | application:manage | body Note; response Record | 201 | companyRequired=True; idempotency=False |

## Quy tắc dữ liệu và nghiệp vụ
- Dùng 6 stage keys source thay vì labels tiếng Anh mẫu.
- application.id khác legacy_cv_id; mỗi action dùng đúng ID.
- Stage history/notes/rating/outbox cần tenant và transaction; AI chỉ hỗ trợ review.

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
- unauthorized job
- stale optimistic update
- duplicate move
- AI failure
- CV mapping mismatch
- keyboard/mobile drag alternative

## Kết quả
Patch vào owner/controller/service/contract/model thực sự cần thiết; kiểm tra có evidence và plan rollout nếu user giao đổi mode. Các lệnh live migration/seed/payment/email không được tự chạy để hoàn tất plan.
