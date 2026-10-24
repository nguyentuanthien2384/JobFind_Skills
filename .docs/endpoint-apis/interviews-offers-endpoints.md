# Endpoint contract · Phỏng vấn và thư mời

Feature ID: `interviews-offers` · Actor: COMPANY, EMPLOYER, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/applications/:id/interview-invitation | modern/applications | application:manage | body InterviewInvitation; response Application | 200 | companyRequired=True; idempotency=False |
| POST /api/applications/:id/decision-notification | modern/applications | application:manage | body Decision; response Application | 200 | companyRequired=True; idempotency=False |
| GET /api/my-applications | modern/applications | application:self:read | body none; response Record | 200 | companyRequired=False; idempotency=False |

## Body/schema từ source modern
### InterviewInvitation

Required: interview

| Field | Type/constraints | Required |
| --- | --- | --- |
| message | {"anyOf":[{"type":"string","maxLength":3000},{"type":"null"}]} | no |
| interview | {"type":"object","additionalProperties":false,"properties":{"companyName":{"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"},"interviewDate":{"type":"string","format":"date"},"interviewTime":{"type":"string","pattern":"^(?:[01][0-9]\|2[0-3]):[0-5][0-9]$"},"durationMinutes":{"type":"string","pattern":"^[1-9][0-9]{1,2}$"},"timeZone":{"const":"Asia/Ho_Chi_Minh"},"interviewMode":{"enum":["onsite","online","phone"]},"location":{"type":"string","maxLength":1000},"meetingUrl":{"type":"string","maxLength":2000},"round":{"type":"string","maxLength":150},"interviewers":{"type":"string","maxLength":500},"preparation":{"type":"string","maxLength":3000},"contactName":{"type":"string","maxLength":150,"minLength":1,"pattern":"\\S"},"contactEmail":{"type":"string","maxLength":254,"minLength":1,"pattern":"\\S","format":"email"},"contactPhone":{"type":"string","maxLength":50},"confirmBy":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}T(?:[01][0-9]\|2[0-3]):[0-5][0-9]$"}},"required":["companyName","interviewDate","interviewTime","timeZone","interviewMode","contactName","contactEmail"],"allOf":[{"if":{"properties":{"interviewMode":{"const":"onsite"}}},"then":{"required":["location"],"properties":{"location":{"type":"string","maxLength":1000,"minLength":1,"pattern":"\\S"}}}},{"if":{"properties":{"interviewMode":{"const":"online"}}},"then":{"required":["meetingUrl"],"properties":{"meetingUrl":{"type":"string","maxLength":2000,"minLength":1,"pattern":"\\S"}}}},{"if":{"properties":{"interviewMode":{"const":"phone"}}},"then":{"required":["contactPhone"],"properties":{"contactPhone":{"type":"string","maxLength":50,"minLength":1,"pattern":"\\S"}}}}]} | yes |

### Decision

Required: decision

| Field | Type/constraints | Required |
| --- | --- | --- |
| decision | {"type":"string","enum":["accepted","rejected"]} | yes |
| message | {"anyOf":[{"type":"string","maxLength":3000},{"type":"null"}]} | no |
| offer | {"type":"object","additionalProperties":false,"properties":{"companyName":{"type":"string","maxLength":255,"minLength":1,"pattern":"\\S"},"startDate":{"type":"string","format":"date"},"startTime":{"type":"string","pattern":"^(?:[01][0-9]\|2[0-3]):[0-5][0-9]$"},"timeZone":{"const":"Asia/Ho_Chi_Minh"},"responseDeadline":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}T(?:[01][0-9]\|2[0-3]):[0-5][0-9]$"},"workMode":{"enum":["onsite","remote","hybrid"]},"location":{"type":"string","maxLength":1000},"meetingUrl":{"type":"string","maxLength":2000},"contactName":{"type":"string","maxLength":150,"minLength":1,"pattern":"\\S"},"contactEmail":{"type":"string","maxLength":254,"minLength":1,"pattern":"\\S","format":"email"},"contactPhone":{"type":"string","maxLength":50},"workSchedule":{"type":"string","maxLength":500},"salary":{"type":"string","maxLength":1000},"probation":{"type":"string","maxLength":1000},"benefits":{"type":"string","maxLength":3000},"requiredDocuments":{"type":"string","maxLength":3000},"onboardingInstructions":{"type":"string","maxLength":3000}},"required":["companyName","startDate","startTime","timeZone","responseDeadline","workMode","contactName","contactEmail"],"allOf":[{"if":{"properties":{"workMode":{"enum":["onsite","hybrid"]}}},"then":{"required":["location"],"properties":{"location":{"type":"string","maxLength":1000,"minLength":1,"pattern":"\\S"}}}},{"if":{"properties":{"workMode":{"const":"remote"}}},"then":{"required":["meetingUrl"],"properties":{"meetingUrl":{"type":"string","maxLength":2000,"minLength":1,"pattern":"\\S"}}}}]} | no |
| interviewed | {"type":"boolean"} | no |

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Forms thư phỏng vấn/offer có trong pipeline; calendar tổng hợp độc lập là proposal.
- Asia/Ho_Chi_Minh và +07:00 theo validator hiện hành.
- Meeting URL/location/contact/deadline phải theo schema; event queued không chứng minh email delivered.
- application_events.decision_snapshot.interview ở PostgreSQL là snapshot lời mời; calendar latest-invitation là một MVP proposal, chưa có multi-round/cancel/RSVP persistence được chứng minh.
- confirmBy phải > now và ≤ interview start; bằng giờ bắt đầu hợp lệ. Duration tùy chọn 15–480 phút; timezone Asia/Ho_Chi_Minh/+07:00, logistics theo onsite/online/phone.
- Company/employer calendar cần frontend candidate-manage và API application:manage với S1/CS1/tenant. Candidate không dùng recruiter API: my-applications chỉ có stage/times, không interview snapshot; candidate read view cần plan mới.
- Invitation write hiện không có idempotency contract; khóa UI không bảo đảm exactly-once. Giữ timeout uncertain/no-auto-replay, plan idempotency khi cần. emailQueued không chứng minh delivered.

## Acceptance API
- deadline trước start
- invalid URL/contact/time zone
- wrong application owner
- email failure/replay
- calendar API chưa có

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
