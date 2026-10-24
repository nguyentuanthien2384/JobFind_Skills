# Ý tưởng · Chi tiết và external job

Feature ID: `job-detail` · Actor: PUBLIC, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện chi tiết và external job theo nhu cầu actor PUBLIC, CANDIDATE, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Mở/nộp modal CV
2. Lưu job
3. Mở company
4. Trở lại kết quả tìm

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/JobDetail/JobDetail.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/components/modal/SendCvModal.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/auth/applicationIntent.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/cvService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/utils/legacyApplication.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-010 | Job Detail - Senior Frontend Developer | 1280 × 2070 | source-mapped |
| JF-022 | Ứng tuyển: Bước 1 - Thông tin cá nhân | 1280 × 1053 | partial |
| JF-023 | Ứng tuyển: Senior UI/UX Designer | 390 × 1817 | partial |
| JF-024 | Ứng tuyển: Senior UI/UX Designer (Desktop) | 1280 × 1249 | partial |

## Quy tắc nghiệp vụ
- Ứng tuyển là modal trên /detail-job/:id; /apply chưa là route hiện hữu.
- Giữ job state/public visibility và company validity.
- Guest lưu apply intent qua auth theo source.
- External job route/provenance không đồng nhất với job local.
- Apply validation/draft/session/PDF giới hạn theo applications feature; fixtures 10MB/DOCX/portfolio trong ảnh không là contract đang có.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra job không tồn tại/không public với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra guest login intent với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra đã ứng tuyển với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra PDF lỗi với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra expired job với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra external link với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/job-detail-idea.md → design-briefs/job-detail-brief.md → frontend-plans/job-detail-plan.md → backend-plans/job-detail-plan.md → endpoint-apis/job-detail-endpoints.md → qa/job-detail-qa.md
