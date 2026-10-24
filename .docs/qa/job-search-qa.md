# QA matrix · Kết quả tìm việc và bộ lọc

Feature ID: `job-search` · Actor: PUBLIC, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| zero results | Không kết quả: hiện count 0, empty state và clear filters; không còn cards của query cũ. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| network timeout/object error | Timeout/object errCode lỗi: hiện error/retry read có chủ đích, giữ keyword/filters. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| đổi query nhanh | Request A về sau B: chỉ B cập nhật danh sách/count/pagination; cancel/unmount không set state. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| page ngoài range | Page vượt bounds: điều chỉnh/reset theo contract, không tạo vòng fetch vô hạn. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| back/forward | Back/forward: phục hồi query/filter/sort/page từ URL và đúng kết quả. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| mode legacy/search | Legacy/search mode: đúng endpoint/DTO/codes theo cờ đang có, không bật cờ chỉ để hợp ảnh. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-036 | Tuyển Dụng VN - Search Results | 1280 × 1944 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Filters dùng codes/schemas source và pagination có bounds.
- URL lưu filter, back/forward phải hồi phục kết quả.
- Response trễ không ghi đè query mới; debounce theo hook/lodash đã có.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
