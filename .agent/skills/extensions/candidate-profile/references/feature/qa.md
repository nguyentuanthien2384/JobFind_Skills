# QA matrix · Hồ sơ cá nhân ứng viên

Feature ID: `candidate-profile` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| missing optional fields | Optional null/absent: hiển thị placeholder an toàn, không overwrite bằng giá trị fixture. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| invalid phone/link | Phone/link sai: validation whitelist/source; feedback theo field, giữ draft. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| save error preserves draft | Save lỗi: dữ liệu nhập giữ nguyên, không hiển thị saved/completion giả. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| actor khác | Actor khác: server enforce ownership, không sửa profile bằng userId body. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| long Vietnamese name | Tên tiếng Việt dài: wrap đúng, Unicode không cắt sai và không overflow. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| mobile | Mobile: sections/labels/save/focus đọc và sử dụng được. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-009 | Hồ Sơ Của Tôi - Tuyển Dụng VN | 1280 × 1749 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Legacy user profile và identity profile cần adapter đúng mode.
- Completion score nếu chưa có backend phải được ghi là derived UI/fixture.
- Chỉ cập nhật fields whitelist và ownership từ session.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
