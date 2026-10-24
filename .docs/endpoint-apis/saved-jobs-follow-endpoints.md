# Endpoint contract · Việc đã lưu và công ty theo dõi

Feature ID: `saved-jobs-follow` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/toggle-favorite-post | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-favorite-post-by-user | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/toggle-follow-company | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-followed-company-by-user | legacy | SOCIAL_INTERACT | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Body/schema từ source modern
Legacy DTO hoặc query-only: đọc controller/service và schema được dẫn trước tạo payload. Không có payload được bịa từ mockup.

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Social permissions từ session và ownership từ server.
- Toggle state cần rollback nếu API lỗi; không coi fixture favorite là trạng thái thật.
- Job/company không còn public phải xử lý có thông báo phù hợp.

## Acceptance API
- guest denied
- duplicate click
- API error rollback
- deleted target
- session change
- empty lists

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
