# QA matrix · Trung tâm thông báo

Feature ID: `notifications` · Actor: CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| wrong-role destination | Destination thuộc role khác: không điều hướng vào dữ liệu forbidden, dùng target hợp lệ hoặc unavailable. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate event | Event lặp: dedupe ID, unread không tăng hai lần. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| deleted application/job | Target bị xóa: mở thông báo có fallback, không gọi write hay lộ resource khác. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| zero unread | Unread 0: badge/tab/count đồng nhất, không hiện fixture unread. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| push permission denied | Push denied: app vẫn chạy, trạng thái permission thật và không tự prompt lặp. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| mark-read error | Mark-read lỗi: server owner guard, UI rollback/feedback; không giảm count giả. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-033 | Trung Tâm Thông Báo - Tuyển Dụng VN | 1280 × 1378 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Destination phải theo quyền của actor và route thật.
- Unread dedupe theo notification ID; mark-read kiểm tra owner.
- Preferences trong thiết kế cần đối chiếu fields source; queued không là delivered.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
