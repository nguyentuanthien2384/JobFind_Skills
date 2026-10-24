# Endpoint contract · Ứng tuyển và theo dõi đơn

Feature ID: `applications` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/create-new-cv | legacy | CANDIDATE_APPLY | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-all-cv-by-userId | legacy | CANDIDATE_PROFILE_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/my-applications | modern/applications | application:self:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/get-detail-user-by-id | legacy | CANDIDATE_PROFILE_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/profile/cvs | modern/identity | cv:self:manage | body none; response Cv | 200 | companyRequired=False; idempotency=False |

## Body/schema từ source modern
Legacy DTO hoặc query-only: đọc controller/service và schema được dẫn trước tạo payload. Không có payload được bịa từ mockup.

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Apply wizard là trình bày mở rộng của modal; giữ data contract đã có.
- application.id dùng endpoints application, legacy_cv_id nối CV cũ.
- Lịch/offer/progress lấy trạng thái thật theo flag; không tạo thao tác rút đơn nếu source chưa hỗ trợ.
- Submit thực tế: cvService.createNewCv → POST /api/create-new-cv; payload userId, postId, file, description. Backend lấy actor userId từ session; description 1–255 ký tự.
- Apply UI PDF-only ≤2MiB; desktop reference ghi PDF 10MB/mobile PDF-DOCX10MB. Giữ ảnh exact để tham khảo, ghi validation difference khi code; backend utils/legacyApplication chưa enforce PDF MIME/size ở submit nên là server-validation gap.
- Portfolio URL chưa có trong payload/model; wizard 3 bước là UI extension. Mobile JF-023 Continue chỉ chuyển bước, không submit thẳng; desktop JF-024 CTA cần giữ intent review/submit rõ.
- GET /api/my-applications không trả interview/offer snapshot; candidate không được gọi GET /api/applications/:id vì manage permission. Candidate detail/calendar/offer read view cần contract mới, không dùng notes nội bộ recruiter.

## Acceptance API
- duplicate apply
- job bị đóng
- no prepared CV
- invalid PDF
- legacy/progress mode
- empty applications
- write 401

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
