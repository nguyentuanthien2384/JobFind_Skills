# Endpoint contract · CV đã chuẩn bị và AI CV

Feature ID: `candidate-cv-ai` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/profile/cvs | modern/identity | cv:self:manage | body none; response Cv | 200 | companyRequired=False; idempotency=False |
| POST /api/profile/cvs | modern/identity | cv:self:manage | body CvCreate; response Cv | 201 | companyRequired=False; idempotency=False |
| POST /api/profile/cvs/import | modern/identity | cv:self:manage | body CvImport; response Cv | 201 | companyRequired=False; idempotency=False |
| PUT /api/profile/cvs/:cvId | modern/identity | cv:self:manage | body CvUpdate; response Cv | 200 | companyRequired=False; idempotency=False |
| DELETE /api/profile/cvs/:cvId | modern/identity | cv:self:manage | body none; response Ack | 200 | companyRequired=False; idempotency=False |
| POST /api/ai/parse-resume | modern/jobs | ai:candidate:use | body ParseResume; response AcceptedTask | 202 | companyRequired=False; idempotency=True |
| POST /api/ai/generate-cv | modern/jobs | ai:candidate:use | body GenerateCv; response AcceptedTask | 202 | companyRequired=False; idempotency=True |
| GET /api/ai/tasks/:taskId | modern/jobs | ['ai:candidate:use', 'ai:recruiter:use'] | body none; response Task | 200 | companyRequired=False; idempotency=False |

## Body/schema từ source modern
### CvCreate

Required: 

| Field | Type/constraints | Required |
| --- | --- | --- |
| title | {"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]} | no |
| template | {"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]} | no |
| fullName | {"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]} | no |
| email | {"anyOf":[{"type":"string","maxLength":320},{"type":"null"}]} | no |
| phone | {"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]} | no |
| address | {"anyOf":[{"type":"string","maxLength":1000},{"type":"null"}]} | no |
| summary | {"anyOf":[{"type":"string","maxLength":20000},{"type":"null"}]} | no |
| skills | {"type":"array","items":{"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"},"maxItems":100} | no |
| languages | {"type":"array","items":{"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"},"maxItems":100} | no |
| experiences | {"type":"array","items":{"type":"object","properties":{"company":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"position":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"from":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]},"to":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]},"description":{"anyOf":[{"type":"string","maxLength":10000},{"type":"null"}]}},"required":[],"additionalProperties":false},"maxItems":100} | no |
| educations | {"type":"array","items":{"type":"object","properties":{"school":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"major":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"degree":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"year":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]}},"required":[],"additionalProperties":false},"maxItems":100} | no |
| parsedFrom | {"type":"object","properties":{"fileName":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"parsedAt":{"anyOf":[{"type":"string","format":"date"},{"type":"string","format":"date-time"}]},"raw":{"type":"object","properties":{"title":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"template":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]},"fullName":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"email":{"anyOf":[{"type":"string","maxLength":320},{"type":"null"}]},"phone":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]},"address":{"anyOf":[{"type":"string","maxLength":1000},{"type":"null"}]},"summary":{"anyOf":[{"type":"string","maxLength":20000},{"type":"null"}]},"skills":{"type":"array","items":{"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"},"maxItems":100},"languages":{"type":"array","items":{"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"},"maxItems":100},"experiences":{"type":"array","items":{"type":"object","properties":{"company":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"position":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"duration":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"description":{"anyOf":[{"type":"string","maxLength":10000},{"type":"null"}]}},"required":[],"additionalProperties":false},"maxItems":100},"educations":{"type":"array","items":{"type":"object","properties":{"school":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"major":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"degree":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"year":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]}},"required":[],"additionalProperties":false},"maxItems":100},"yearsOfExperience":{"anyOf":[{"type":"number","minimum":0,"maximum":100},{"type":"null"}]}},"required":[],"additionalProperties":false}},"required":[],"additionalProperties":false} | no |

### CvImport

Required: parsed

| Field | Type/constraints | Required |
| --- | --- | --- |
| parsed | {"type":"object","properties":{"title":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"template":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]},"fullName":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"email":{"anyOf":[{"type":"string","maxLength":320},{"type":"null"}]},"phone":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]},"address":{"anyOf":[{"type":"string","maxLength":1000},{"type":"null"}]},"summary":{"anyOf":[{"type":"string","maxLength":20000},{"type":"null"}]},"skills":{"type":"array","items":{"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"},"maxItems":100},"languages":{"type":"array","items":{"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"},"maxItems":100},"experiences":{"type":"array","items":{"type":"object","properties":{"company":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"position":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"duration":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"description":{"anyOf":[{"type":"string","maxLength":10000},{"type":"null"}]}},"required":[],"additionalProperties":false},"maxItems":100},"educations":{"type":"array","items":{"type":"object","properties":{"school":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"major":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"degree":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"year":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]}},"required":[],"additionalProperties":false},"maxItems":100},"yearsOfExperience":{"anyOf":[{"type":"number","minimum":0,"maximum":100},{"type":"null"}]}},"required":[],"additionalProperties":false} | yes |
| fileName | {"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]} | no |

### CvUpdate

Required: 

| Field | Type/constraints | Required |
| --- | --- | --- |
| title | {"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]} | no |
| template | {"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]} | no |
| fullName | {"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]} | no |
| email | {"anyOf":[{"type":"string","maxLength":320},{"type":"null"}]} | no |
| phone | {"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]} | no |
| address | {"anyOf":[{"type":"string","maxLength":1000},{"type":"null"}]} | no |
| summary | {"anyOf":[{"type":"string","maxLength":20000},{"type":"null"}]} | no |
| skills | {"type":"array","items":{"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"},"maxItems":100} | no |
| languages | {"type":"array","items":{"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"},"maxItems":100} | no |
| experiences | {"type":"array","items":{"type":"object","properties":{"company":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"position":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"from":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]},"to":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]},"description":{"anyOf":[{"type":"string","maxLength":10000},{"type":"null"}]}},"required":[],"additionalProperties":false},"maxItems":100} | no |
| educations | {"type":"array","items":{"type":"object","properties":{"school":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"major":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"degree":{"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]},"year":{"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]}},"required":[],"additionalProperties":false},"maxItems":100} | no |

### ParseResume

Required: fileBase64

| Field | Type/constraints | Required |
| --- | --- | --- |
| fileBase64 | {"type":"string","maxLength":8388608,"minLength":1,"pattern":"\\S"} | yes |
| fileName | {"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]} | no |

### GenerateCv

Required: sourceText, language

| Field | Type/constraints | Required |
| --- | --- | --- |
| sourceText | {"type":"string","maxLength":20000,"minLength":1,"pattern":"\\S"} | yes |
| jobId | {"type":"integer","minimum":1,"maximum":9007199254740991} | no |
| language | {"type":"string","enum":["vi","en"]} | yes |

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Prepared CV MongoDB khác snapshot CV nộp legacy.
- 202 nghĩa là accepted task, không phải đã có kết quả AI.
- Xử lý provider unavailable/error và output validation; giữ private files.

## Acceptance API
- empty CVs
- invalid/oversize PDF
- task pending/failed
- stale polling
- owner mismatch
- duplicate task key

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
