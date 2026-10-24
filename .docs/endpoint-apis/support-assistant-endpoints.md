# Endpoint contract · Trợ lý hỗ trợ và handoff

Feature ID: `support-assistant` · Actor: PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/support/turn | modern/support | None | body SupportTurn; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/support/knowledge | modern/support | None | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/support/conversations | modern/support | None | body none; response Record | 200 | companyRequired=False; idempotency=False |
| POST /api/support/conversations/:id/handoff | modern/support | support:chat:use | body SupportHandoff; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/support/handoffs | modern/support | support:manage | body none; response Record | 200 | companyRequired=False; idempotency=False |

## Body/schema từ source modern
### SupportTurn

Required: requestId, text

| Field | Type/constraints | Required |
| --- | --- | --- |
| requestId | {"type":"string","format":"uuid"} | yes |
| text | {"type":"string","maxLength":1400,"minLength":1,"pattern":"\\S"} | yes |
| conversationId | {"type":"string","format":"uuid"} | no |
| version | {"type":"integer","minimum":0,"maximum":9007199254740991} | no |
| replaceFrom | {"anyOf":[{"type":"string","format":"uuid"},{"type":"null"}]} | no |
| parentId | {"anyOf":[{"type":"string","format":"uuid"},{"type":"null"}]} | no |

### SupportHandoff

Required: consent

| Field | Type/constraints | Required |
| --- | --- | --- |
| consent | {"const":true} | yes |

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Public/private tools có boundary, ownership và session scope riêng.
- Handoff management chỉ role được SUPPORT_MANAGE.
- Retrieved content không có quyền yêu cầu agent gửi thư hoặc quyết định tuyển dụng.

## Acceptance API
- tool private unauthenticated
- provider unavailable
- stream interrupted
- handoff forbidden
- prompt injection
- conversation ownership

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
