# QA matrix · Việc đã lưu và công ty theo dõi

Feature ID: `saved-jobs-follow` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| guest denied | Guest/role thiếu social permission: từ chối; không optimistic như success. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate click | Double click: khóa/dedupe thao tác đang chờ, state cuối theo server. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| API error rollback | API lỗi: rollback optimistic favorite/follow, giữ thông báo có thể retry chủ đích. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| deleted target | Target bị xóa/ẩn: trạng thái unavailable, không mở dữ liệu riêng hoặc crash. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| session change | Session đổi: clear/refresh danh sách và chặn response actor cũ. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| empty lists | List rỗng: empty CTA hợp lệ, count 0. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Social permissions từ session và ownership từ server.
- Toggle state cần rollback nếu API lỗi; không coi fixture favorite là trạng thái thật.
- Job/company không còn public phải xử lý có thông báo phù hợp.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
