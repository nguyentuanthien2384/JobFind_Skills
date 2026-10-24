# QA matrix · Trang chủ và khám phá việc làm

Feature ID: `home` · Actor: PUBLIC

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| API danh sách rỗng | API trả []: hiện empty/khám phá thay thế, không tạo số việc/công ty từ fixture. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| ảnh/logo lỗi | Ảnh/logo fail: fallback giữ kích thước card, alt/label còn đọc được. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| search input dài | Keyword dài: trim/validate theo adapter, giữ query và không phá layout/search CTA. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| guest CTA ứng tuyển | Guest muốn apply: auth/application intent theo source, không nộp CV anonymous. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| mobile hero/search stacking | 390/360px: hero/search/nav reflow, input và CTA còn dùng được, không crop text. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-035 | Tuyển Dụng VN - Homepage | 1280 × 3456 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Homepage dùng dữ liệu công khai, stats trong Stitch là fixture.
- Search điều hướng /job với query được adapter hỗ trợ.
- Không đổi legacy/search mode để khớp bản mẫu.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
