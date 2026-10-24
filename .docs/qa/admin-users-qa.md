# QA matrix · Quản lý người dùng

Feature ID: `admin-users` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| forbidden actor | Actor không administration: server deny list/ban/unban. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate mutation | Mutation lặp: state cuối đúng, UI chặn double-submit; không tạo log/side effect ngoài contract. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| wrong target | Target sai/đã đổi: server validation, không mutate user từ row stale. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| paging after update | Update/filter đổi: refetch/reset page hợp lý, count/rows không lệch. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| password in response | Payload phản hồi/log không có password/hash/token/session secrets. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| long name/email | Tên/email dài: wrap/truncate với nhãn đọc được, table không phá layout. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-027 | Quản Lý Người Dùng - Admin Panel | 1280 × 1138 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Server kiểm tra administration permission; không tin role/userId client cho actor.
- Status/action dùng source, không duyệt users chỉ bằng checkbox local.
- Giữ payload không có password/secrets.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
