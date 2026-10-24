# QA matrix · Chọn vai trò và đăng ký

Feature ID: `auth-register` · Actor: PUBLIC

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| duplicate identity/contact | Duplicate identity/contact: server lỗi hợp lệ, không tạo account/identity trùng. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| password policy | Password thiếu policy: field errors theo passwordPolicy/server, không log password. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| invalid role payload | Payload role ADMIN/COMPANY: server reject; UI chỉ CANDIDATE/EMPLOYER. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| input giữ khi lỗi | API lỗi: giữ draft không chứa secret trong docs, submit có thể chủ đích thử lại. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| SSO pending | SSO pending: hoàn tất profile bằng contract hiện có; không nhập lại identity tùy ý. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| mobile signup | 390px signup: role/form/CTA đọc được, focus và validation có label. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-019 | Đăng ký - Chọn vai trò | 1280 × 1267 | source-mapped |
| JF-020 | Đăng Ký - Tuyển Dụng VN | 390 × 1348 | source-mapped |
| JF-028 | Registration - Premium Desktop | 1280 × 1409 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Signup chọn CANDIDATE hoặc EMPLOYER; không cho user tự đăng ký ADMIN/COMPANY.
- Giữ form 2 bước hiện có và validation server.
- SSO profile chưa hoàn tất phải vào onboarding đúng, không tự gộp account theo email.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
