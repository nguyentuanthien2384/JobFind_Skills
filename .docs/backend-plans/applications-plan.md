# Backend plan · Ứng tuyển và theo dõi đơn

Feature ID: `applications` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Nguồn hiện hành
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/components/modal/SendCvModal.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/components/modal/PreparedCvPicker.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/Candidate/ManageCvCandidate.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/applicationService.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/cvService.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/userService.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/aiSearchService.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/preparedCvPdf.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/controllers/cvController.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/utils/legacyApplication.js | File hiện có, đọc khi triển khai để tránh drift |

## Owner và dữ liệu
Trace endpoint tới controller/service/store. Legacy backend và job-core MySQL, application PostgreSQL, identity/audit MongoDB và search projection có owner riêng. Feature không cần schema mới thì ghi không áp dụng; không tạo bảng chỉ từ layout.

## API hiện có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/create-new-cv | legacy | CANDIDATE_APPLY | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-all-cv-by-userId | legacy | CANDIDATE_PROFILE_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/my-applications | modern/applications | application:self:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/get-detail-user-by-id | legacy | CANDIDATE_PROFILE_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/profile/cvs | modern/identity | cv:self:manage | body none; response Cv | 200 | companyRequired=False; idempotency=False |

## Quy tắc dữ liệu và nghiệp vụ
- Apply wizard là trình bày mở rộng của modal; giữ data contract đã có.
- application.id dùng endpoints application, legacy_cv_id nối CV cũ.
- Lịch/offer/progress lấy trạng thái thật theo flag; không tạo thao tác rút đơn nếu source chưa hỗ trợ.
- Submit thực tế: cvService.createNewCv → POST /api/create-new-cv; payload userId, postId, file, description. Backend lấy actor userId từ session; description 1–255 ký tự.
- Apply UI PDF-only ≤2MiB; desktop reference ghi PDF 10MB/mobile PDF-DOCX10MB. Giữ ảnh exact để tham khảo, ghi validation difference khi code; backend utils/legacyApplication chưa enforce PDF MIME/size ở submit nên là server-validation gap.
- Portfolio URL chưa có trong payload/model; wizard 3 bước là UI extension. Mobile JF-023 Continue chỉ chuyển bước, không submit thẳng; desktop JF-024 CTA cần giữ intent review/submit rõ.
- GET /api/my-applications không trả interview/offer snapshot; candidate không được gọi GET /api/applications/:id vì manage permission. Candidate detail/calendar/offer read view cần contract mới, không dùng notes nội bộ recruiter.

## Trình tự task
1. Đọc route/guard/controller/service/schema và xác định phần reuse/đổi/thêm.
2. Validate params/query/body theo contract thật; actor/tenant lấy phía server.
3. Chỉ thêm migration khi field/index/constraint cần thiết; ghi rollback/backfill.
4. Đặt state write và outbox trong cùng transaction khi feature có event, dedupe tại consumer.
5. Giữ response/error/pagination tương thích adapter frontend; không tự replay write sau timeout/refresh.
6. Kiểm tra success/failure/401/403/owner chéo/duplicate phù hợp; cập nhật endpoint và QA.

## Consistency và failure
- application.id, legacy_cv_id, job ID và prepared CV _id phải được ghi đúng trong mapping.
- Phân biệt accepted/queued/sent/delivered. Nếu dependency/provider lỗi, ghi state có thể retry đúng phạm vi.
- Internal route không public vì permission field null; đọc trust middleware và gateway registration.

## Test theo rủi ro
- duplicate apply
- job bị đóng
- no prepared CV
- invalid PDF
- legacy/progress mode
- empty applications
- write 401

## Kết quả
Patch vào owner/controller/service/contract/model thực sự cần thiết; kiểm tra có evidence và plan rollout nếu user giao đổi mode. Các lệnh live migration/seed/payment/email không được tự chạy để hoàn tất plan.
