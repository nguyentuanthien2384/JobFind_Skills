# Frontend plan · Ứng tuyển và theo dõi đơn

Feature ID: `applications` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
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

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `applications`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Personal step
2. Upload/select prepared CV
3. Cover/intro và review
4. Submitting/result feedback
5. My applications list, filter và progress
6. Interview/offer detail theo dữ liệu thật

## State/data ownership
- Session/actor lấy từ auth context/source guards; tenant từ server authorization.
- Server lists/tasks qua adapter/hook, UI controls/drafts ở component/hook phù hợp; URL state khi feature có filters/history.
- Dữ liệu schema và DTO đọc endpoint contract; interceptor đã trả response.data và có thể resolve error object.

## Task triển khai
1. Đối chiếu reference và source, chọn variant/mode; ghi khoảng cách cần sửa.
2. Reuse shell/components và tách blocks có props/event callbacks; scoped CSS/SCSS theo tokens reference.
3. Nối actions qua service/hook hiện có, giữ flags và ID namespace.
4. Bổ sung đầy đủ states và validation; khóa submit lặp, giữ draft và rollback optimistic update.
5. Giải quyết responsive/keyboard/PDF/media phù hợp với feature.
6. Chạy focused test/lint/build phù hợp; so screenshot/interaction và cập nhật QA/context.

## Quy tắc không thể bỏ qua
- Apply wizard là trình bày mở rộng của modal; giữ data contract đã có.
- application.id dùng endpoints application, legacy_cv_id nối CV cũ.
- Lịch/offer/progress lấy trạng thái thật theo flag; không tạo thao tác rút đơn nếu source chưa hỗ trợ.
- Submit thực tế: cvService.createNewCv → POST /api/create-new-cv; payload userId, postId, file, description. Backend lấy actor userId từ session; description 1–255 ký tự.
- Apply UI PDF-only ≤2MiB; desktop reference ghi PDF 10MB/mobile PDF-DOCX10MB. Giữ ảnh exact để tham khảo, ghi validation difference khi code; backend utils/legacyApplication chưa enforce PDF MIME/size ở submit nên là server-validation gap.
- Portfolio URL chưa có trong payload/model; wizard 3 bước là UI extension. Mobile JF-023 Continue chỉ chuyển bước, không submit thẳng; desktop JF-024 CTA cần giữ intent review/submit rõ.
- GET /api/my-applications không trả interview/offer snapshot; candidate không được gọi GET /api/applications/:id vì manage permission. Candidate detail/calendar/offer read view cần contract mới, không dùng notes nội bộ recruiter.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/create-new-cv | legacy | CANDIDATE_APPLY | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-all-cv-by-userId | legacy | CANDIDATE_PROFILE_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/my-applications | modern/applications | application:self:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/get-detail-user-by-id | legacy | CANDIDATE_PROFILE_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/profile/cvs | modern/identity | cv:self:manage | body none; response Cv | 200 | companyRequired=False; idempotency=False |

## Kiểm tra behavior
- duplicate apply
- job bị đóng
- no prepared CV
- invalid PDF
- legacy/progress mode
- empty applications
- write 401

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
