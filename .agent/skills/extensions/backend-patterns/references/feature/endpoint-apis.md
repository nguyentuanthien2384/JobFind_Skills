# Endpoint contract · Kanban, đánh giá và AI tuyển dụng

Feature ID: `pipeline` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/applications/stages | modern/applications | application:manage | body none; response Record | 200 | companyRequired=True; idempotency=False |
| GET /api/applications/board | modern/applications | application:manage | body none; response Record | 200 | companyRequired=True; idempotency=False |
| PATCH /api/applications/:id/stage | modern/applications | application:manage | body MoveStage; response Application | 200 | companyRequired=True; idempotency=False |
| PATCH /api/applications/:id/rating | modern/applications | application:manage | body Rating; response Application | 200 | companyRequired=True; idempotency=False |
| POST /api/applications/:id/notes | modern/applications | application:manage | body Note; response Record | 201 | companyRequired=True; idempotency=False |

## Body/schema từ source modern
### MoveStage

Required: stage

| Field | Type/constraints | Required |
| --- | --- | --- |
| stage | {"type":"string","enum":["moi_ung_tuyen","dang_xem_xet","phong_van","de_nghi","nhan_viec","tu_choi"]} | yes |
| reason | {"anyOf":[{"type":"string","maxLength":5000},{"type":"null"}]} | no |

### Rating

Required: rating

| Field | Type/constraints | Required |
| --- | --- | --- |
| rating | {"anyOf":[{"type":"integer","minimum":1,"maximum":5},{"type":"string","pattern":"^[1-5]$"}]} | yes |

### Note

Required: body

| Field | Type/constraints | Required |
| --- | --- | --- |
| body | {"type":"string","maxLength":5000,"minLength":1,"pattern":"\\S"} | yes |

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Dùng 6 stage keys source thay vì labels tiếng Anh mẫu.
- application.id khác legacy_cv_id; mỗi action dùng đúng ID.
- Stage history/notes/rating/outbox cần tenant và transaction; AI chỉ hỗ trợ review.

## Acceptance API
- unauthorized job
- stale optimistic update
- duplicate move
- AI failure
- CV mapping mismatch
- keyboard/mobile drag alternative

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
