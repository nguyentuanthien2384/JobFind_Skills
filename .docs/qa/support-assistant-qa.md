# QA matrix · Trợ lý hỗ trợ và handoff

Feature ID: `support-assistant` · Actor: PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| tool private unauthenticated | Private tool anonymous: deny trước đọc dữ liệu; public knowledge vẫn theo contract được phép. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| provider unavailable | Provider unavailable: error/readiness thật, không bịa câu trả lời hoặc completed task. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| stream interrupted | Stream đứt: trạng thái partial/error rõ; không nhân conversation/side effects khi retry. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| handoff forbidden | Handoff actor không SUPPORT_MANAGE: không mở/resolve staff queue. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| prompt injection | Retrieved prompt injection: coi là data, không cấp quyền/gửi thư/quyết định tuyển dụng. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| conversation ownership | Conversation khác owner: từ chối private context/media, không chỉ lọc bằng UI. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Public/private tools có boundary, ownership và session scope riêng.
- Handoff management chỉ role được SUPPORT_MANAGE.
- Retrieved content không có quyền yêu cầu agent gửi thư hoặc quyết định tuyển dụng.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
