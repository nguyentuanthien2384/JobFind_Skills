# QA matrix · Duyệt và xác thực doanh nghiệp

Feature ID: `admin-companies` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| private doc access | Verification doc: chỉ actor được phép, không public preview/cache link. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| stale row selected | Stale selection: xác minh target/current state trước action; refresh row sau response. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| pending/ban combinations | Pending/ban combinations: statusCode/censorCode xử lý riêng, không một boolean Approved. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| cross-role | Role không admin: company edit permission không cấp approve/ban platform. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate approval | Double approval: một intent/side effect theo contract; feedback/disabled submit đúng. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-008 | Duyệt Hồ Sơ Công Ty | 1280 × 1057 | source-mapped |
| JF-037 | Xác thực Doanh nghiệp - Admin | 1280 × 1024 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Giữ spelling accecpt-company từ source.
- Censor CS1 và status S1 không đồng nghĩa chỉ một boolean verified.
- Giấy phép/xác minh private: chỉ role/owner được phép.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
