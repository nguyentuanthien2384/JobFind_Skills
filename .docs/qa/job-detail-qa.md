# QA matrix · Chi tiết và external job

Feature ID: `job-detail` · Actor: PUBLIC, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| job không tồn tại/không public | 404/không public: thông báo phù hợp, không lộ nội dung/CV và chặn apply. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| guest login intent | Guest: giữ job intent qua login/signup; quay về đúng job đang mở. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| đã ứng tuyển | Duplicate application: hiển thị đã ứng tuyển, không tạo CV/outbox thứ hai. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| PDF lỗi | File sai/giới hạn: chặn ở UI PDF≤2MiB theo source; ghi riêng server-validation gap. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| expired job | Job hết hạn: CTA unavailable, server từ chối; không báo success dù client state cũ. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| external link | External job: dùng provenance/link thật, không gửi application nội bộ cho ID external. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-010 | Job Detail - Senior Frontend Developer | 1280 × 2070 | source-mapped |
| JF-022 | Ứng tuyển: Bước 1 - Thông tin cá nhân | 1280 × 1053 | partial |
| JF-023 | Ứng tuyển: Senior UI/UX Designer | 390 × 1817 | partial |
| JF-024 | Ứng tuyển: Senior UI/UX Designer (Desktop) | 1280 × 1249 | partial |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Ứng tuyển là modal trên /detail-job/:id; /apply chưa là route hiện hữu.
- Giữ job state/public visibility và company validity.
- Guest lưu apply intent qua auth theo source.
- External job route/provenance không đồng nhất với job local.
- Apply validation/draft/session/PDF giới hạn theo applications feature; fixtures 10MB/DOCX/portfolio trong ảnh không là contract đang có.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
