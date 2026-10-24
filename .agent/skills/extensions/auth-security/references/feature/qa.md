# QA matrix · Đăng nhập và social SSO

Feature ID: `auth-login` · Actor: PUBLIC

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| invalid credentials | Credentials sai: lỗi rõ nhưng không tiết lộ secret, giữ input thích hợp và chặn submit lặp. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| provider unavailable | Provider not ready: nút unavailable/readiness; không khởi chạy SSO giả. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| pending SSO signup | Pending social signup: chuyển onboarding đúng pending session, không tự gộp identity theo email. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| callback lỗi/state mismatch | State/nonce/callback lỗi: reject liên kết/đăng nhập, có retry theo source không bỏ validation. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| session refresh | Refresh: access token memory/cookie đúng; GET retry một lần, writes không tự replay. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| mobile form | Mobile: labels/errors/focus/keyboard không bị che; đúng native login variant. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-015 | Login - Premium Desktop | 1280 × 1252 | source-mapped |
| JF-016 | Login - Tuyển Dụng VN | 1280 × 1024 | source-mapped |
| JF-017 | Login - Tuyển Dụng VN | 390 × 1045 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Google/GitHub/Auth0 hiển thị theo providers readiness; LinkedIn trong mẫu chỉ là fixture.
- Giữ token_user marker, access token memory, refresh cookie HttpOnly.
- SSO direct và Auth0 connections là luồng riêng; giữ state/nonce/PKCE.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
