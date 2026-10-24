# QA matrix · Dashboard doanh nghiệp

Feature ID: `employer-dashboard` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| company unverified/no membership | No membership/unverified: onboarding/readiness đúng, không gọi platform reports. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| zero activity | Zero activity: metrics 0 và empty tables/chart, không dùng fixture stats. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| report API error | Một report fail: block/error phần liên quan, không làm metric giả. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| employer permission subset | Employer permissions subset: nav/CTA/server guard đúng, không lấy role COMPANY làm mặc định. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| mobile cards | Mobile metrics/cards/table reflow, target và text không tràn. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-034 | Tuyển Dụng VN - Dashboard Doanh Nghiệp | 1280 × 1455 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Cùng /admin/ với platform admin nhưng component/data theo actor.
- Stats giới hạn company scope; không gọi platform revenue reports từ doanh nghiệp.
- Số fixture không được hiển thị như data thật.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
