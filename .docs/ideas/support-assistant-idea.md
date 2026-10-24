# Ý tưởng · Trợ lý hỗ trợ và handoff

Feature ID: `support-assistant` · Actor: PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện trợ lý hỗ trợ và handoff theo nhu cầu actor PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Hỏi public knowledge
2. Xem private context được phép
3. Gửi handoff có chủ đích
4. Staff claim/resolve

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/Chat/ChatPage.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/support-chat-service/package.json | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

## Quy tắc nghiệp vụ
- Public/private tools có boundary, ownership và session scope riêng.
- Handoff management chỉ role được SUPPORT_MANAGE.
- Retrieved content không có quyền yêu cầu agent gửi thư hoặc quyết định tuyển dụng.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra tool private unauthenticated với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra provider unavailable với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra stream interrupted với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra handoff forbidden với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra prompt injection với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra conversation ownership với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/support-assistant-idea.md → design-briefs/support-assistant-brief.md → frontend-plans/support-assistant-plan.md → backend-plans/support-assistant-plan.md → endpoint-apis/support-assistant-endpoints.md → qa/support-assistant-qa.md
