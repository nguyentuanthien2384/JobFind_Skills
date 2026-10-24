# QA matrix · Chỉnh sửa hồ sơ doanh nghiệp

Feature ID: `company-profile` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| owner mismatch | Company owner/member sai: server deny update/read private docs. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| pending/rejected/ban state | Pending/rejected/banned: readiness/nav/CTA theo server, không tự set S1/CS1. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| invalid media/link | Media/link sai: validation source, form giữ draft; không render unsafe URL. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| save failure | Save lỗi: giữ field/preview state đúng, không báo published. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| missing company | Chưa company: onboarding CREATE_COMPANY đúng, không dùng companyId fixture. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| private document preview | Public preview không chứa private verification/license document. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-005 | Company Profile Editor - VNG Corporation | 1280 × 2210 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- EMPLOYER không có company chỉ vào onboarding theo CREATE_COMPANY.
- Pending company navigation khác active S1/CS1.
- Verification/license documents không public theo preview.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
