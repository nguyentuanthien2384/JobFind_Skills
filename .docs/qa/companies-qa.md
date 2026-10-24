# QA matrix · Danh sách và chi tiết công ty

Feature ID: `companies` · Actor: PUBLIC, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| public/private separation | Public company detail không trả/license documents/private PII trong dữ liệu hoặc preview. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| company banned/pending | Banned/pending company: public visibility và CTA theo server; không coi là active fixture. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| guest follow | Guest follow: yêu cầu quyền/auth, không cập nhật count như thao tác thành công. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| zero companies | Danh sách []: empty state, filters vẫn chỉnh được, count 0. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| logo lỗi | Logo lỗi: fallback/alt, card ổn định. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| paging | Paging/filter: reset page khi đổi filter và giữ source response shape/count. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-006 | Danh Mục Công Ty | 1280 × 2475 | source-mapped |
| JF-007 | Danh Sách Công Ty - Tuyển Dụng VN | 1280 × 1758 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- JF-006 và JF-007 là 2 biến thể cùng /company.
- Public company không lộ verification documents.
- Follow/review chỉ khi quyền social hợp lệ; giữ company state.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
