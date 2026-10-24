# QA matrix · Tổng quan quản trị

Feature ID: `admin-overview` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| non-admin forbidden | Non-admin: platform overview/API 403, không thay tenant để xem report. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| empty range | Range rỗng: totals 0/empty chart theo source, không fallback số mẫu. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| partial report error | Một endpoint lỗi: feedback riêng phần dữ liệu, không báo dashboard toàn bộ ready. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| time zone bounds | Date bounds/timezone: request window hợp lệ, labels và tổng cùng kỳ. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| fixture/live separation | Fixture chỉ design; live render phải dùng report response và ghi rõ thiếu dữ liệu. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-002 | Admin Dashboard Overview | 1280 × 1434 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- ADMIN platform data khác company dashboard cùng route /admin/.
- Modern admin endpoints có /api/admin prefix.
- Stats/chart không dùng fixture khi user yêu cầu tích hợp thật.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
