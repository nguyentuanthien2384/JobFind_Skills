# Ý tưởng · Ứng tuyển và theo dõi đơn

Feature ID: `applications` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện ứng tuyển và theo dõi đơn theo nhu cầu actor CANDIDATE, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Nộp CV
2. Theo dõi trạng thái
3. Mở PDF/phỏng vấn/offer
4. Filter/paging đơn của mình

## Bằng chứng nguồn
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

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-018 | Đơn Ứng Tuyển Của Tôi - Tuyển Dụng VN | 1280 × 1938 | source-mapped |
| JF-022 | Ứng tuyển: Bước 1 - Thông tin cá nhân | 1280 × 1053 | partial |
| JF-023 | Ứng tuyển: Senior UI/UX Designer | 390 × 1817 | partial |
| JF-024 | Ứng tuyển: Senior UI/UX Designer (Desktop) | 1280 × 1249 | partial |

## Quy tắc nghiệp vụ
- Apply wizard là trình bày mở rộng của modal; giữ data contract đã có.
- application.id dùng endpoints application, legacy_cv_id nối CV cũ.
- Lịch/offer/progress lấy trạng thái thật theo flag; không tạo thao tác rút đơn nếu source chưa hỗ trợ.
- Submit thực tế: cvService.createNewCv → POST /api/create-new-cv; payload userId, postId, file, description. Backend lấy actor userId từ session; description 1–255 ký tự.
- Apply UI PDF-only ≤2MiB; desktop reference ghi PDF 10MB/mobile PDF-DOCX10MB. Giữ ảnh exact để tham khảo, ghi validation difference khi code; backend utils/legacyApplication chưa enforce PDF MIME/size ở submit nên là server-validation gap.
- Portfolio URL chưa có trong payload/model; wizard 3 bước là UI extension. Mobile JF-023 Continue chỉ chuyển bước, không submit thẳng; desktop JF-024 CTA cần giữ intent review/submit rõ.
- GET /api/my-applications không trả interview/offer snapshot; candidate không được gọi GET /api/applications/:id vì manage permission. Candidate detail/calendar/offer read view cần contract mới, không dùng notes nội bộ recruiter.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra duplicate apply với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra job bị đóng với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra no prepared CV với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra invalid PDF với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra legacy/progress mode với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra empty applications với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra write 401 với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/applications-idea.md → design-briefs/applications-brief.md → frontend-plans/applications-plan.md → backend-plans/applications-plan.md → endpoint-apis/applications-endpoints.md → qa/applications-qa.md
