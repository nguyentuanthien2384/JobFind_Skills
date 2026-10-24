# QA matrix · Ứng tuyển và theo dõi đơn

Feature ID: `applications` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| duplicate apply | Duplicate: errCode5/409, hiển thị đã nộp và link lịch sử; không tạo CV/outbox thứ hai. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| job bị đóng | Job đóng: errCode4/409; job hidden/notfound errCode3/404, giữ draft và không báo đã nộp. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| no prepared CV | No prepared CV/flag off: empty/not-ready; chỉ cho chọn nguồn CV đã có và reviewed đúng. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| invalid PDF | Apply UI: chỉ PDF hợp lệ≤2MiB, %PDF signature/data URL; giới hạn server chưa enforce phải ghi gap. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| legacy/progress mode | Legacy/progress mode: ID cvId/application.id/legacy_cv_id nối đúng; candidate không gọi recruiter detail API. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| empty applications | Không đơn: empty state, count 0; không hiển thị snapshot lịch/offer chưa có trong my-applications. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| write 401 | Write 401/session changed: không replay POST, giữ/chốt draft theo session; kết quả chưa rõ thì kiểm lịch sử trước gửi lại. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-018 | Đơn Ứng Tuyển Của Tôi - Tuyển Dụng VN | 1280 × 1938 | source-mapped |
| JF-022 | Ứng tuyển: Bước 1 - Thông tin cá nhân | 1280 × 1053 | partial |
| JF-023 | Ứng tuyển: Senior UI/UX Designer | 390 × 1817 | partial |
| JF-024 | Ứng tuyển: Senior UI/UX Designer (Desktop) | 1280 × 1249 | partial |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Apply wizard là trình bày mở rộng của modal; giữ data contract đã có.
- application.id dùng endpoints application, legacy_cv_id nối CV cũ.
- Lịch/offer/progress lấy trạng thái thật theo flag; không tạo thao tác rút đơn nếu source chưa hỗ trợ.
- Submit thực tế: cvService.createNewCv → POST /api/create-new-cv; payload userId, postId, file, description. Backend lấy actor userId từ session; description 1–255 ký tự.
- Apply UI PDF-only ≤2MiB; desktop reference ghi PDF 10MB/mobile PDF-DOCX10MB. Giữ ảnh exact để tham khảo, ghi validation difference khi code; backend utils/legacyApplication chưa enforce PDF MIME/size ở submit nên là server-validation gap.
- Portfolio URL chưa có trong payload/model; wizard 3 bước là UI extension. Mobile JF-023 Continue chỉ chuyển bước, không submit thẳng; desktop JF-024 CTA cần giữ intent review/submit rõ.
- GET /api/my-applications không trả interview/offer snapshot; candidate không được gọi GET /api/applications/:id vì manage permission. Candidate detail/calendar/offer read view cần contract mới, không dùng notes nội bộ recruiter.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
