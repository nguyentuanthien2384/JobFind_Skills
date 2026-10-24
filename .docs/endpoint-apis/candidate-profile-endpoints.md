# Endpoint contract · Hồ sơ cá nhân ứng viên

Feature ID: `candidate-profile` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| PUT /api/update-user | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/profile | modern/identity | profile:self | body none; response Profile | 200 | companyRequired=False; idempotency=False |
| PUT /api/profile | modern/identity | profile:self | body ProfileUpdate; response Profile | 200 | companyRequired=False; idempotency=False |
| PUT /api/setDataUserSetting | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Body/schema từ source modern
### ProfileUpdate

Required: 

| Field | Type/constraints | Required |
| --- | --- | --- |
| headline | {"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]} | no |
| about | {"anyOf":[{"type":"string","maxLength":20000},{"type":"null"}]} | no |
| skills | {"type":"array","items":{"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"},"maxItems":100} | no |
| email | {"anyOf":[{"type":"string","maxLength":320},{"type":"null"}]} | no |
| firstName | {"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]} | no |
| lastName | {"anyOf":[{"type":"string","maxLength":255},{"type":"null"}]} | no |
| phonenumber | {"anyOf":[{"type":"string","maxLength":100},{"type":"null"}]} | no |
| jobPreference | {"type":"object","properties":{"categoryJobCode":{"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]},"addressCode":{"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]},"salaryJobCode":{"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]},"experienceJobCode":{"anyOf":[{"type":"string","maxLength":64},{"type":"null"}]},"isFindJob":{"type":"boolean"},"isTakeMail":{"type":"boolean"}},"required":[],"additionalProperties":false} | no |

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Legacy user profile và identity profile cần adapter đúng mode.
- Completion score nếu chưa có backend phải được ghi là derived UI/fixture.
- Chỉ cập nhật fields whitelist và ownership từ session.

## Acceptance API
- missing optional fields
- invalid phone/link
- save error preserves draft
- actor khác
- long Vietnamese name
- mobile

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
