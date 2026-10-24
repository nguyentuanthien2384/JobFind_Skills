# QA matrix · CV đã chuẩn bị và AI CV

Feature ID: `candidate-cv-ai` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| empty CVs | CV list rỗng: cho tạo/import hợp lệ, picker không giả có CV đã chọn. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| invalid/oversize PDF | PDF sai/quá lớn: validate theo đúng import/prepared/apply contract; không lẫn giới hạn các luồng. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| task pending/failed | Task accepted/pending: chưa coi completed; failed terminal hiện lỗi/provider readiness. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| stale polling | Polling cũ/unmount: không ghi đè task mới, timer/request dừng phù hợp. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| owner mismatch | CV owner khác: read/update/delete bị từ chối, không lộ private PDF. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate task key | Cùng task idempotency key khi contract hỗ trợ: giữ một kết quả; khác intent dùng key mới. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Prepared CV MongoDB khác snapshot CV nộp legacy.
- 202 nghĩa là accepted task, không phải đã có kết quả AI.
- Xử lý provider unavailable/error và output validation; giữ private files.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
