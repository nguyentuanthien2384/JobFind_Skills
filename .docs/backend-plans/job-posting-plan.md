# Backend plan · Đăng và quản lý tin

Feature ID: `job-posting` · Actor: COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Nguồn hiện hành
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Post/AddPost.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/jobPostingService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Owner và dữ liệu
Trace endpoint tới controller/service/store. Legacy backend và job-core MySQL, application PostgreSQL, identity/audit MongoDB và search projection có owner riêng. Feature không cần schema mới thì ghi không áp dụng; không tạo bảng chỉ từ layout.

## API hiện có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/create-new-post | legacy | JOB_MANAGE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/create-reup-post | legacy | JOB_MANAGE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| PUT /api/update-post | legacy | JOB_MANAGE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/jobs | modern/jobs | job:manage | body JobCreate; response Job | 201 | companyRequired=True; idempotency=True |
| PUT /api/jobs/:id | modern/jobs | job:manage | body JobUpdate; response Job | 200 | companyRequired=True; idempotency=False |
| POST /api/jobs/:id/repost | modern/jobs | job:manage | body JobRepost; response Job | 201 | companyRequired=True; idempotency=True |
| GET /api/jobs/manage | modern/jobs | job:manage | body none; response ManagedJobRow | 200 | companyRequired=True; idempotency=False |

## Quy tắc dữ liệu và nghiệp vụ
- Giữ JOB_MANAGE/owner/company state và quota server.
- Wizard sử dụng một contract field set, không thêm endpoint từng bước.
- Create/repost idempotency giữ một key cho một thao tác; source flags quyết định mode.

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
- invalid catalog code
- quota 0
- duplicate repost
- job outside tenant
- core vs legacy
- write refresh failure

## Kết quả
Patch vào owner/controller/service/contract/model thực sự cần thiết; kiểm tra có evidence và plan rollout nếu user giao đổi mode. Các lệnh live migration/seed/payment/email không được tự chạy để hoàn tất plan.
