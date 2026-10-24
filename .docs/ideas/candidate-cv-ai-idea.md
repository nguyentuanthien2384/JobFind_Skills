# Ý tưởng · CV đã chuẩn bị và AI CV

Feature ID: `candidate-cv-ai` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện cv đã chuẩn bị và ai cv theo nhu cầu actor CANDIDATE, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Tạo/import/edit/delete CV thuộc mình
2. Bắt đầu task AI
3. Preview/select CV
4. Retry có chủ đích

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/service/aiSearchService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/identity-service/package.json | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/candidateWorkspace.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/preparedCvPdf.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/components/modal/PreparedCvPicker.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

## Quy tắc nghiệp vụ
- Prepared CV MongoDB khác snapshot CV nộp legacy.
- 202 nghĩa là accepted task, không phải đã có kết quả AI.
- Xử lý provider unavailable/error và output validation; giữ private files.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra empty CVs với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra invalid/oversize PDF với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra task pending/failed với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra stale polling với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra owner mismatch với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate task key với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/candidate-cv-ai-idea.md → design-briefs/candidate-cv-ai-brief.md → frontend-plans/candidate-cv-ai-plan.md → backend-plans/candidate-cv-ai-plan.md → endpoint-apis/candidate-cv-ai-endpoints.md → qa/candidate-cv-ai-qa.md
