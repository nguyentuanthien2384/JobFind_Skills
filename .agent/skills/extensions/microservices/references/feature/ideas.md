# Ý tưởng · Kanban, đánh giá và AI tuyển dụng

Feature ID: `pipeline` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện kanban, đánh giá và ai tuyển dụng theo nhu cầu actor COMPANY, EMPLOYER, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Move stage
2. Mở candidate detail
3. Rate/note
4. Yêu cầu screening
5. Mở interview/decision form

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Cv/KanbanBoard.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/applicationService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/application-service/src/libs/db.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/application-service/src/controllers/applicationController.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-025 | Phễu Tuyển Dụng - Senior Frontend Developer | 1280 × 1024 | source-mapped |

## Quy tắc nghiệp vụ
- Dùng 6 stage keys source thay vì labels tiếng Anh mẫu.
- application.id khác legacy_cv_id; mỗi action dùng đúng ID.
- Stage history/notes/rating/outbox cần tenant và transaction; AI chỉ hỗ trợ review.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra unauthorized job với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra stale optimistic update với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate move với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra AI failure với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra CV mapping mismatch với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra keyboard/mobile drag alternative với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/pipeline-idea.md → design-briefs/pipeline-brief.md → frontend-plans/pipeline-plan.md → backend-plans/pipeline-plan.md → endpoint-apis/pipeline-endpoints.md → qa/pipeline-qa.md
