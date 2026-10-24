# QA matrix · Kho ứng viên và mở CV

Feature ID: `candidate-search` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Trạng thái ban đầu
Các cases dưới là kế hoạch kiểm tra, **chưa chạy**. Không đổi thành pass khi chỉ tạo file QA. Tách visual/design, code và runtime evidence.

## Ma trận ca kiểm tra
| Case | Kết quả mong đợi | Status | Evidence |
| --- | --- | --- | --- |
| no quota/expired package | No quota/expired: server unlock enforce entitlement; không trả private CV trước quyền. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| duplicate unlock | Unlock lặp: không trừ quota hai lần khi source contract có idempotency/ownership. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| cross-tenant | Cross-tenant: không đọc/unlock pipeline/CV thuộc job khác trái quyền. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| stale filters | Filters đổi nhanh: response cũ không overwrite mới, page reset đúng. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| no candidates | No candidates: empty/filter feedback, không hiện fixtures như data thật. | NOT_RUN | Ghi lệnh/log/hình khi chạy |
| private PDF forbidden | PDF không được phép: 401/403/readiness thật, không tạo public media URL. | NOT_RUN | Ghi lệnh/log/hình khi chạy |

## Visual QA
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-012 | Kho Ứng Viên - Tuyển Dụng VN | 1280 × 1501 | source-mapped |

- So đúng variant/mode, section order, typography/colors/assets, clipping và density.
- Check desktop/reference và mobile 390/360, tablet 768; overflow whole-page phải được sửa.
- Form/modal/table có keyboard, labels/errors/focus đúng; long Vietnamese text/dữ liệu rỗng/lỗi phải đọc được.

## Integration QA
- Giữ route /admin/list-candiate và endpoint spelling đang dùng.
- Không lộ private PII trước unlock; server kiểm tra entitlement.
- Candidate/profile/CV/application ID cần mapping đúng khi mở detail.

## Lệnh lựa chọn từ source
Đọc package hiện hành trước chạy. Dùng focused tests gần file đã sửa, rồi `npm --prefix frontend run lint`, `npm --prefix frontend run build`, `npm --prefix microservices run contracts:check` theo phạm vi. Backend tests/Jest và microservices/Vitest chạy đúng module khi cần. Integration live cần môi trường/phạm vi thích hợp.

## Báo cáo sau chạy
Ghi case, command, started/finished, passed/failed/skipped, logs/screenshot, điều kiện môi trường và next action. Build pass không chứng minh UI khớp reference; kiểm tra skills pass không chứng minh app pass.
