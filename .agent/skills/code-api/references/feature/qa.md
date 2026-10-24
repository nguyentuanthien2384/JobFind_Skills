# QA matrix · Đăng và quản lý tin

Feature ID: `job-posting` · Actor: COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| invalid catalog code | Catalog code sai: server/schema reject, input code/label không đổi key. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| quota 0 | Quota 0: server reject write, UI entitlement feedback; không trừ quota âm. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate repost | Duplicate repost: giữ intent key khi contract hỗ trợ, một job/quota/event cho cùng intent. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| job outside tenant | Job tenant khác: deny edit/repost/manage, actor/tenant không tin payload. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| core vs legacy | Core/legacy flag: giữ adapter/contract/envelope tương ứng; không tự switch. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| write refresh failure | Write refresh failure: draft giữ, không tự replay create/repost; kiểm kết quả chưa rõ trước retry. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-021 | Đăng Tin Tuyển Dụng - Bước 1 | 1280 × 1377 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Giữ JOB_MANAGE/owner/company state và quota server.
- Wizard sử dụng một contract field set, không thêm endpoint từng bước.
- Create/repost idempotency giữ một key cho một thao tác; source flags quyết định mode.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
