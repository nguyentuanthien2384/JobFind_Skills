# Backend plan · Mua gói và lịch sử giao dịch

Feature ID: `billing-packages` · Actor: COMPANY, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Nguồn hiện hành
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Post/BuyPost.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/PackageCv/BuyCv.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/packageCvService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |

## Owner và dữ liệu
Trace endpoint tới controller/service/store. Legacy backend và job-core MySQL, application PostgreSQL, identity/audit MongoDB và search projection có owner riêng. Feature không cần schema mới thì ghi không áp dụng; không tạo bảng chỉ từ layout.

## API hiện có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/get-payment-link | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/payment-success | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-payment-cv-link | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/payment-cv-success | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-history-trade-post | legacy | PACKAGE_HISTORY_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-history-trade-cv | legacy | PACKAGE_HISTORY_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Quy tắc dữ liệu và nghiệp vụ
- Post/CV packages và histories là dữ liệu tách biệt.
- Payment success cần xác minh server và idempotency callback; return URL chưa đủ.
- Recurring/auto-renew trong JF-003 chưa có đầy đủ route/contract; ghi proposal.

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
- duplicate payment callback
- cancel/error
- inactive package
- price tampering
- quota expired
- recurring unsupported

## Kết quả
Patch vào owner/controller/service/contract/model thực sự cần thiết; kiểm tra có evidence và plan rollout nếu user giao đổi mode. Các lệnh live migration/seed/payment/email không được tự chạy để hoàn tất plan.
