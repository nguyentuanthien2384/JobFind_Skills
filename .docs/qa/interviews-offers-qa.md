# QA matrix · Phỏng vấn và thư mời

Feature ID: `interviews-offers` · Actor: COMPANY, EMPLOYER, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| deadline trước start | confirmBy > now và ≤ start: hợp lệ; confirmBy=start hợp lệ. Quá khứ hoặc sau start bị validator từ chối. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| invalid URL/contact/time zone | Asia/Ho_Chi_Minh/+07, future start; online cần http(s) URL, onsite location, phone contact; duration nếu có 15–480. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| wrong application owner | Application/job khác tenant: server deny; candidate không dùng manage endpoint/calendar recruiter. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| email failure/replay | emailQueued chỉ xếp hàng; timeout/refresh không gửi lại tự động. Chưa có idempotency cho invitation thì ghi rõ gap. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| calendar API chưa có | Global calendar không có API hiện hữu; prototype ghi PROPOSAL. Khi bổ sung, latest invitation trước date filtering; không tự tạo lịch từ stage phong_van. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-013 | Lịch Phỏng Vấn & Agenda | 1280 × 1049 | partial |
| JF-014 | Lịch Phỏng Vấn - Career Architect | 1280 × 1035 | partial |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Forms thư phỏng vấn/offer có trong pipeline; calendar tổng hợp độc lập là proposal.
- Asia/Ho_Chi_Minh và +07:00 theo validator hiện hành.
- Meeting URL/location/contact/deadline phải theo schema; event queued không chứng minh email delivered.
- application_events.decision_snapshot.interview ở PostgreSQL là snapshot lời mời; calendar latest-invitation là một MVP proposal, chưa có multi-round/cancel/RSVP persistence được chứng minh.
- confirmBy phải > now và ≤ interview start; bằng giờ bắt đầu hợp lệ. Duration tùy chọn 15–480 phút; timezone Asia/Ho_Chi_Minh/+07:00, logistics theo onsite/online/phone.
- Company/employer calendar cần frontend candidate-manage và API application:manage với S1/CS1/tenant. Candidate không dùng recruiter API: my-applications chỉ có stage/times, không interview snapshot; candidate read view cần plan mới.
- Invitation write hiện không có idempotency contract; khóa UI không bảo đảm exactly-once. Giữ timeout uncertain/no-auto-replay, plan idempotency khi cần. emailQueued không chứng minh delivered.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
