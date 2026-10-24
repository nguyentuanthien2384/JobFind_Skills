# QA matrix · Báo cáo và audit

Feature ID: `admin-reports-audit` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| no data range | Range không data: totals/count/empty state nhất quán, không dùng fixture. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| report source unavailable | Report dependency thiếu: readiness/error/skipped rõ, không live claim. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| range timezone | Timezone/date bounds: đúng inclusive/exclusive contract và thống nhất chart/table. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| forbidden company | Company actor không lấy platform revenue/audit bằng đổi companyId. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| large pagination | Large pagination: bounded limit, count đúng, không dump toàn bộ audit. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| audit redaction | Audit redaction: không ghi/hiển thị credential/CV/PII vượt phạm vi; actor/resource đủ trace. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-029 | Revenue & Analytics Dashboard | 1280 × 1613 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Tenant platform reports chỉ ADMIN và permissions đúng.
- Thời gian, totals và filters lấy server/derived dữ liệu thật; chart fixture chỉ design.
- Audit redacts PII/secrets, query có pagination/bounds.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
