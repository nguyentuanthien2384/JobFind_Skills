# Endpoint contract · Chi tiết và external job

Feature ID: `job-detail` · Actor: PUBLIC, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/get-detail-post-by-id | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/jobs/:id | modern/jobs | None | body none; response Job | 200 | companyRequired=False; idempotency=False |
| POST /api/create-new-cv | legacy | CANDIDATE_APPLY | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Body/schema từ source modern
Legacy DTO hoặc query-only: đọc controller/service và schema được dẫn trước tạo payload. Không có payload được bịa từ mockup.

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Ứng tuyển là modal trên /detail-job/:id; /apply chưa là route hiện hữu.
- Giữ job state/public visibility và company validity.
- Guest lưu apply intent qua auth theo source.
- External job route/provenance không đồng nhất với job local.
- Apply validation/draft/session/PDF giới hạn theo applications feature; fixtures 10MB/DOCX/portfolio trong ảnh không là contract đang có.

## Acceptance API
- job không tồn tại/không public
- guest login intent
- đã ứng tuyển
- PDF lỗi
- expired job
- external link

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
