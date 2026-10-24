# QA matrix · Mua gói và lịch sử giao dịch

Feature ID: `billing-packages` · Actor: COMPANY, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| duplicate payment callback | Callback trùng: một purchase/entitlement theo xác minh/idempotency server, không cộng quota hai lần. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| cancel/error | Cancel/failure/pending: không cấp quota hoặc báo paid trước xác minh thật. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| inactive package | Gói inactive: server reject purchase theo catalog hiện tại. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| price tampering | Client sửa giá/quota: server dùng price/package trusted, không cấp quyền từ body. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| quota expired | Quota hết/hết hạn: server enforce sử dụng; UI phản ánh đúng post/CV entitlement. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| recurring unsupported | Recurring control chưa contract: ghi proposal/disabled; không bịa saved card/auto-renew/trial. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-003 | Billing & Subscriptions | 1280 × 1160 | partial |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Post/CV packages và histories là dữ liệu tách biệt.
- Payment success cần xác minh server và idempotency callback; return URL chưa đủ.
- Recurring/auto-renew trong JF-003 chưa có đầy đủ route/contract; ghi proposal.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
