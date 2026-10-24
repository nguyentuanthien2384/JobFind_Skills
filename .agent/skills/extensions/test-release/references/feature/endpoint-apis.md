# Endpoint contract · Shell, navigation và layout chung

Feature ID: `master-layout` · Actor: PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/auth/me | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Body/schema từ source modern
Legacy DTO hoặc query-only: đọc controller/service và schema được dẫn trước tạo payload. Không có payload được bịa từ mockup.

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Menu xuất hiện theo permission và company state, không chỉ role.
- Đọc guard ở router cha; permission list rỗng từ parser không chứng minh public.
- Giữ chat, support, candidate và admin shells theo router thật.

## Acceptance API
- anonymous deep-link protected
- company pending state
- employer chưa có công ty
- role đổi giữa hai tab
- long breadcrumb/mobile overflow

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
