# Backend plan · Danh mục nghề nghiệp và kỹ năng

Feature ID: `recruitment-catalogs` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Nguồn hiện hành
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/JobSkill/ManageJobSkill.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/JobType/ManageJobType.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/useCatalogList.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/recruitmentCatalog.cjs | File hiện có, đọc khi triển khai để tránh drift |

## Owner và dữ liệu
Trace endpoint tới controller/service/store. Legacy backend và job-core MySQL, application PostgreSQL, identity/audit MongoDB và search projection có owner riêng. Feature không cần schema mới thì ghi không áp dụng; không tạo bảng chỉ từ layout.

## API hiện có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/get-list-allcode | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/create-new-all-code | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| PUT /api/update-all-code | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| DELETE /api/delete-all-code | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-list-skill | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/create-new-skill | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| PUT /api/update-skill | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Quy tắc dữ liệu và nghiệp vụ
- Codes/type/job skill relations theo source; labels không thay key.
- Xóa/update phải giữ referenced jobs/profiles và unique constraints hiện hành.
- Catalog consumer dropdowns/search facets cần tương thích cả legacy/modern.

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
- duplicate code
- referenced delete
- role forbidden
- stale dropdown
- pagination reset
- invalid type

## Kết quả
Patch vào owner/controller/service/contract/model thực sự cần thiết; kiểm tra có evidence và plan rollout nếu user giao đổi mode. Các lệnh live migration/seed/payment/email không được tự chạy để hoàn tất plan.
