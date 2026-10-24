# QA matrix · Kanban, đánh giá và AI tuyển dụng

Feature ID: `pipeline` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| unauthorized job | Job unauthorized: read/move/rating/note đều tenant guarded. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| stale optimistic update | Optimistic move lỗi/stale: reconcile/rollback với server, không để card ở stage giả. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate move | Duplicate move: event/outbox/state ổn định theo contract thật; không giả có idempotency nếu không hỗ trợ. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| AI failure | AI unavailable/failed: giữ manual review, chưa coi output là quyết định tuyển dụng. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| CV mapping mismatch | CV ID mapping: dùng application.id cho modern actions, legacy_cv_id cho PDF cũ; không trộn _id Mongo. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| keyboard/mobile drag alternative | Keyboard/mobile: có thao tác move stage thay drag, focus/error feedback còn dùng được. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-025 | Phễu Tuyển Dụng - Senior Frontend Developer | 1280 × 1024 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Dùng 6 stage keys source thay vì labels tiếng Anh mẫu.
- application.id khác legacy_cv_id; mỗi action dùng đúng ID.
- Stage history/notes/rating/outbox cần tenant và transaction; AI chỉ hỗ trợ review.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
