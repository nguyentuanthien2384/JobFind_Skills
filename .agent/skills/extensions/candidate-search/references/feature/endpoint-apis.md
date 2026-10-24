# Endpoint contract · Kho ứng viên và mở CV

Feature ID: `candidate-search` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/fillter-cv-by-selection | legacy | CANDIDATE_SEARCH | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/candidate-search-jobs | legacy | CANDIDATE_SEARCH | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/check-see-candiate | legacy | CANDIDATE_SEARCH | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/talent-pool | modern/applications | talent-pool:manage | body none; response Record | 200 | companyRequired=True; idempotency=False |
| POST /api/talent-pool | modern/applications | talent-pool:manage | body TalentSave; response Record | 201 | companyRequired=True; idempotency=False |

## Body/schema từ source modern
### TalentSave

Required: candidateId

| Field | Type/constraints | Required |
| --- | --- | --- |
| candidateId | {"anyOf":[{"type":"integer","minimum":1,"maximum":9007199254740991},{"type":"string","pattern":"^[1-9][0-9]{0,15}$","format":"jobfind-id"}]} | yes |
| candidateName | {"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]} | no |
| tags | {"type":"array","items":{"type":"string","maxLength":100,"minLength":1,"pattern":"\\S"},"maxItems":50} | no |
| note | {"anyOf":[{"type":"string","maxLength":5000},{"type":"null"}]} | no |

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Giữ route /admin/list-candiate và endpoint spelling đang dùng.
- Không lộ private PII trước unlock; server kiểm tra entitlement.
- Candidate/profile/CV/application ID cần mapping đúng khi mở detail.

## Acceptance API
- no quota/expired package
- duplicate unlock
- cross-tenant
- stale filters
- no candidates
- private PDF forbidden

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
