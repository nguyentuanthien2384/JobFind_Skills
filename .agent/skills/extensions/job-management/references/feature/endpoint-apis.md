# Endpoint contract · Đăng và quản lý tin

Feature ID: `job-posting` · Actor: COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/create-new-post | legacy | JOB_MANAGE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/create-reup-post | legacy | JOB_MANAGE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| PUT /api/update-post | legacy | JOB_MANAGE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/jobs | modern/jobs | job:manage | body JobCreate; response Job | 201 | companyRequired=True; idempotency=True |
| PUT /api/jobs/:id | modern/jobs | job:manage | body JobUpdate; response Job | 200 | companyRequired=True; idempotency=False |
| POST /api/jobs/:id/repost | modern/jobs | job:manage | body JobRepost; response Job | 201 | companyRequired=True; idempotency=True |
| GET /api/jobs/manage | modern/jobs | job:manage | body none; response ManagedJobRow | 200 | companyRequired=True; idempotency=False |

## Body/schema từ source modern
### JobCreate

Required: name, descriptionHTML, categoryJobCode

| Field | Type/constraints | Required |
| --- | --- | --- |
| name | {"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"} | yes |
| descriptionHTML | {"type":"string","maxLength":200000,"minLength":1,"pattern":"\\S"} | yes |
| descriptionMarkdown | {"type":"string","maxLength":200000} | no |
| categoryJobCode | {"type":"string","maxLength":64,"minLength":1,"pattern":"\\S"} | yes |
| addressCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| salaryJobCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| amount | {"anyOf":[{"type":"integer","minimum":1,"maximum":100000},{"type":"string","pattern":"^(100000\|[1-9][0-9]{0,4})$"}]} | no |
| categoryJoblevelCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| categoryWorktypeCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| experienceJobCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| genderPostCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| timeEnd | {"anyOf":[{"type":"integer","minimum":1,"maximum":8640000000000000},{"type":"string","pattern":"^[1-9][0-9]{0,15}$","format":"jobfind-id"}]} | no |
| isHot | {"anyOf":[{"type":"boolean"},{"type":"integer","enum":[0,1]}]} | no |

### JobUpdate

Required: 

| Field | Type/constraints | Required |
| --- | --- | --- |
| name | {"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"} | no |
| descriptionHTML | {"type":"string","maxLength":200000,"minLength":1,"pattern":"\\S"} | no |
| descriptionMarkdown | {"type":"string","maxLength":200000} | no |
| categoryJobCode | {"type":"string","maxLength":64,"minLength":1,"pattern":"\\S"} | no |
| addressCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| salaryJobCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| amount | {"anyOf":[{"type":"integer","minimum":1,"maximum":100000},{"type":"string","pattern":"^(100000\|[1-9][0-9]{0,4})$"}]} | no |
| categoryJoblevelCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| categoryWorktypeCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| experienceJobCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| genderPostCode | {"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]} | no |
| expectedRevision | {"type":"string","pattern":"^jv1-[a-f0-9]{64}$","minLength":68,"maxLength":68} | no |
| timeEnd | {"anyOf":[{"type":"integer","minimum":1,"maximum":8640000000000000},{"type":"string","pattern":"^[1-9][0-9]{0,15}$","format":"jobfind-id"}]} | no |

### JobRepost

Required: timeEnd

| Field | Type/constraints | Required |
| --- | --- | --- |
| expectedRevision | {"type":"string","pattern":"^jv1-[a-f0-9]{64}$","minLength":68,"maxLength":68} | no |
| timeEnd | {"anyOf":[{"type":"integer","minimum":1,"maximum":8640000000000000},{"type":"string","pattern":"^[1-9][0-9]{0,15}$","format":"jobfind-id"}]} | yes |

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Giữ JOB_MANAGE/owner/company state và quota server.
- Wizard sử dụng một contract field set, không thêm endpoint từng bước.
- Create/repost idempotency giữ một key cho một thao tác; source flags quyết định mode.

## Acceptance API
- invalid catalog code
- quota 0
- duplicate repost
- job outside tenant
- core vs legacy
- write refresh failure

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
