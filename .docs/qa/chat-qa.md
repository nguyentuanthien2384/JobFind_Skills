# QA matrix · Tin nhắn tuyển dụng

Feature ID: `chat` · Actor: CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| out-of-order ack | Ack/socket đến lệch thứ tự: merge ID/clientMessageId một message, delivery state không lùi sai. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate socket event | Socket event lặp: dedupe, unread đúng, không render duplicate. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| reconnect | Reconnect: fetch khoảng thiếu và merge, không mất/nhân message hoặc tự gửi lại nội dung. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| wrong participant | Wrong participant: REST/socket/PDF download đều enforce membership. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| expired session | Session hết: ngắt/reauth đúng, không gửi message dưới actor cũ. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| file preview error | Preview lỗi: fallback download được phép/lỗi rõ, private media không có URL public giả. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-030 | Tin nhắn tuyển dụng | 1280 × 1024 | source-mapped |
| JF-031 | Trò chuyện & Tin nhắn | 1280 × 1024 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Giữ chat tuyển dụng khác support assistant.
- REST/Socket/optimistic merge theo ID và clientMessageId.
- Attachments private chỉ participant có quyền tải; request/trust/session được kiểm tra server.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
