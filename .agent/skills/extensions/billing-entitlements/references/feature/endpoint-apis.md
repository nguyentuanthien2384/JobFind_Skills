# Endpoint contract · Mua gói và lịch sử giao dịch

Feature ID: `billing-packages` · Actor: COMPANY, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/get-payment-link | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/payment-success | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-payment-cv-link | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/payment-cv-success | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-history-trade-post | legacy | PACKAGE_HISTORY_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-history-trade-cv | legacy | PACKAGE_HISTORY_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Body/schema từ source modern
Legacy DTO hoặc query-only: đọc controller/service và schema được dẫn trước tạo payload. Không có payload được bịa từ mockup.

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Post/CV packages và histories là dữ liệu tách biệt.
- Payment success cần xác minh server và idempotency callback; return URL chưa đủ.
- Recurring/auto-renew trong JF-003 chưa có đầy đủ route/contract; ghi proposal.

## Acceptance API
- duplicate payment callback
- cancel/error
- inactive package
- price tampering
- quota expired
- recurring unsupported

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
