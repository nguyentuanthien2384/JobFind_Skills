# Backend plan · Báo cáo và audit

Feature ID: `admin-reports-audit` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Nguồn hiện hành
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Report/ReportDashboard.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/adminReportService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Owner và dữ liệu
Trace endpoint tới controller/service/store. Legacy backend và job-core MySQL, application PostgreSQL, identity/audit MongoDB và search projection có owner riêng. Feature không cần schema mới thì ghi không áp dụng; không tạo bảng chỉ từ layout.

## API hiện có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/admin/reports/overview | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/admin/reports/timeseries | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/admin/reports/funnel | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/admin/audit | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/get-sum-by-year-post | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-sum-by-year-cv | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Quy tắc dữ liệu và nghiệp vụ
- Tenant platform reports chỉ ADMIN và permissions đúng.
- Thời gian, totals và filters lấy server/derived dữ liệu thật; chart fixture chỉ design.
- Audit redacts PII/secrets, query có pagination/bounds.

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
- no data range
- report source unavailable
- range timezone
- forbidden company
- large pagination
- audit redaction

## Kết quả
Patch vào owner/controller/service/contract/model thực sự cần thiết; kiểm tra có evidence và plan rollout nếu user giao đổi mode. Các lệnh live migration/seed/payment/email không được tự chạy để hoàn tất plan.
