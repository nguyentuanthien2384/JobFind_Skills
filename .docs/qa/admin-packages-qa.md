# QA matrix · Quản lý gói đăng tin và CV

Feature ID: `admin-packages` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| invalid amount/quota | Amount/quota sai: schema/server reject, không lưu giá/giới hạn không hợp lệ. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| wrong type | Post/CV type: đúng model/endpoint/catalog, không áp quota của loại khác. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| forbidden company actor | Company actor: chỉ purchase theo quyền, không create/update catalog admin. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| existing entitlement compatibility | Đổi catalog: entitlement/history đã mua giữ đúng semantics source; migration nếu đổi field được plan. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate submit | Double submit: một catalog mutation intent; lỗi giữ form, không success giả. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-026 | Quản lý Gói dịch vụ | 1280 × 1580 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Hai catalogs post/CV, model/type/quota/price distinct.
- Không biến UI combined table thành một backend package model duy nhất.
- Admin changes không viết lại entitlement đã mua ngoài policy source.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
