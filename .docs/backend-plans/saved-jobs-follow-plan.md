# Backend plan · Việc đã lưu và công ty theo dõi

Feature ID: `saved-jobs-follow` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Nguồn hiện hành
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/service/userService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/followCompanyService.js | File hiện có, đọc khi triển khai để tránh drift |

## Owner và dữ liệu
Trace endpoint tới controller/service/store. Legacy backend và job-core MySQL, application PostgreSQL, identity/audit MongoDB và search projection có owner riêng. Feature không cần schema mới thì ghi không áp dụng; không tạo bảng chỉ từ layout.

## API hiện có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/toggle-favorite-post | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-favorite-post-by-user | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/toggle-follow-company | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-followed-company-by-user | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Quy tắc dữ liệu và nghiệp vụ
- Social permissions từ session và ownership từ server.
- Toggle state cần rollback nếu API lỗi; không coi fixture favorite là trạng thái thật.
- Job/company không còn public phải xử lý có thông báo phù hợp.

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
- guest denied
- duplicate click
- API error rollback
- deleted target
- session change
- empty lists

## Kết quả
Patch vào owner/controller/service/contract/model thực sự cần thiết; kiểm tra có evidence và plan rollout nếu user giao đổi mode. Các lệnh live migration/seed/payment/email không được tự chạy để hoàn tất plan.
