# QA matrix · Shell, navigation và layout chung

Feature ID: `master-layout` · Actor: PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| anonymous deep-link protected | Guest vào protected deep-link: yêu cầu auth, giữ intent hợp lệ; không render dữ liệu riêng. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| company pending state | S1/CS1 chưa đủ: menu/readiness và API guard đồng nhất; không cho mutation tuyển dụng. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| employer chưa có công ty | EMPLOYER chưa có company: vào onboarding được phép, không gọi dashboard tenant rỗng. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| role đổi giữa hai tab | Session/role đổi: shell cập nhật, cancel requests cũ, không giữ private state của actor trước. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| long breadcrumb/mobile overflow | Tên dài/mobile: breadcrumb wrap, drawer điều hướng được bằng bàn phím; không tràn ngang toàn trang. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Menu xuất hiện theo permission và company state, không chỉ role.
- Đọc guard ở router cha; permission list rỗng từ parser không chứng minh public.
- Giữ chat, support, candidate và admin shells theo router thật.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
