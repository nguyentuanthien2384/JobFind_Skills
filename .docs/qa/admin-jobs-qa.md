# QA matrix · Kiểm duyệt tin tuyển dụng

Feature ID: `admin-jobs` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| company actor forbidden | COMPANY/EMPLOYER không platform moderator: tenant job-manage không cấp moderation admin. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| stale job state | Job state đã đổi: refresh/feedback, không báo approved từ optimistic row. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate review | Review submit lặp: khóa submit, state/outbox ổn định theo source. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| search projection lag | Projection lag: source truth/result rõ, search chưa sync không báo immediate visibility giả. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| validation/error | Validation/5xx: giữ selection/form khi phù hợp, action không success khi errCode lỗi. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-011 | Job Moderation - Admin Panel | 1280 × 1024 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Quyền MODERATE_POSTS ở UI và ADMINISTRATION/backend equivalent cần đối chiếu.
- Approved/ban/public state cập nhật server và projection đúng owner.
- Lý do moderation theo source contract, không bịa field ghi được.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
