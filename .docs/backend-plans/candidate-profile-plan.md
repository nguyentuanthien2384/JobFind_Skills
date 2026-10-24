# Backend plan · Hồ sơ cá nhân ứng viên

Feature ID: `candidate-profile` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Nguồn hiện hành
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/Candidate/CandidateInfo.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/aiSearchService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/controllers/userController.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/userService.js | File hiện có, đọc khi triển khai để tránh drift |

## Owner và dữ liệu
Trace endpoint tới controller/service/store. Legacy backend và job-core MySQL, application PostgreSQL, identity/audit MongoDB và search projection có owner riêng. Feature không cần schema mới thì ghi không áp dụng; không tạo bảng chỉ từ layout.

## API hiện có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| PUT /api/update-user | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/profile | modern/identity | profile:self | body none; response Profile | 200 | companyRequired=False; idempotency=False |
| PUT /api/profile | modern/identity | profile:self | body ProfileUpdate; response Profile | 200 | companyRequired=False; idempotency=False |
| PUT /api/setDataUserSetting | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Quy tắc dữ liệu và nghiệp vụ
- Legacy user profile và identity profile cần adapter đúng mode.
- Completion score nếu chưa có backend phải được ghi là derived UI/fixture.
- Chỉ cập nhật fields whitelist và ownership từ session.

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
- missing optional fields
- invalid phone/link
- save error preserves draft
- actor khác
- long Vietnamese name
- mobile

## Kết quả
Patch vào owner/controller/service/contract/model thực sự cần thiết; kiểm tra có evidence và plan rollout nếu user giao đổi mode. Các lệnh live migration/seed/payment/email không được tự chạy để hoàn tất plan.
