# QA matrix · Nhân sự và tuyển dụng theo tenant

Feature ID: `company-team` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| cross-company target | Company A thêm/xóa member B: deny, tenant lấy từ actor đã xác thực. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate membership | Duplicate membership: lỗi/kết quả ổn định, không nhân member. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| invalid member | User/member sai: server validation, không sửa tenant tùy ý. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| self-exit consequences | Self-exit: xử lý session/nav/company state hậu thay đổi theo source, không giữ quyền cũ. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| company pending | Pending company: role/readiness guard giữ nguyên ở UI/server. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| role guard | EMPLOYER thiếu team-manage: không thấy/hit được mutation COMPANY team. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- COMPANY_TEAM_MANAGE và ownership ở server; actor/tenant không lấy theo body.
- EMPLOYER chỉ các quyền company membership đang cho phép.
- Tách quit/self-exit với loại member/team mutation.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
