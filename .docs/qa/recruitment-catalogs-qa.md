# QA matrix · Danh mục nghề nghiệp và kỹ năng

Feature ID: `recruitment-catalogs` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| duplicate code | Code trùng: unique/validation đúng, label không là key thay thế. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| referenced delete | Delete referenced: xử lý integrity theo source; nếu thiếu protection ghi gap, không coi hard-delete an toàn. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| role forbidden | Non-admin: CRUD catalog forbidden dù có quyền job-manage. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| stale dropdown | Dropdown stale: refresh/source codes hợp lệ, field invalid có feedback. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| pagination reset | Filter/type đổi: reset page, count/rows cùng query. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| invalid type | Type không hỗ trợ: server validation, không trộn jobType/skill/location keys. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Codes/type/job skill relations theo source; labels không thay key.
- Xóa/update phải giữ referenced jobs/profiles và unique constraints hiện hành.
- Catalog consumer dropdowns/search facets cần tương thích cả legacy/modern.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
