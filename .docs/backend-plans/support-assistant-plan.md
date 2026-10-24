# Backend plan · Trợ lý hỗ trợ và handoff

Feature ID: `support-assistant` · Actor: PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Nguồn hiện hành
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/Chat/ChatPage.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/support-chat-service/package.json | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Owner và dữ liệu
Trace endpoint tới controller/service/store. Legacy backend và job-core MySQL, application PostgreSQL, identity/audit MongoDB và search projection có owner riêng. Feature không cần schema mới thì ghi không áp dụng; không tạo bảng chỉ từ layout.

## API hiện có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/support/turn | modern/support | None | body SupportTurn; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/support/knowledge | modern/support | None | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/support/conversations | modern/support | None | body none; response Record | 200 | companyRequired=False; idempotency=False |
| POST /api/support/conversations/:id/handoff | modern/support | support:chat:use | body SupportHandoff; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/support/handoffs | modern/support | support:manage | body none; response Record | 200 | companyRequired=False; idempotency=False |

## Quy tắc dữ liệu và nghiệp vụ
- Public/private tools có boundary, ownership và session scope riêng.
- Handoff management chỉ role được SUPPORT_MANAGE.
- Retrieved content không có quyền yêu cầu agent gửi thư hoặc quyết định tuyển dụng.

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
- tool private unauthenticated
- provider unavailable
- stream interrupted
- handoff forbidden
- prompt injection
- conversation ownership

## Kết quả
Patch vào owner/controller/service/contract/model thực sự cần thiết; kiểm tra có evidence và plan rollout nếu user giao đổi mode. Các lệnh live migration/seed/payment/email không được tự chạy để hoàn tất plan.
