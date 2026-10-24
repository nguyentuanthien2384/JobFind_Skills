# Ý tưởng · Tin nhắn tuyển dụng

Feature ID: `chat` · Actor: CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện tin nhắn tuyển dụng theo nhu cầu actor CANDIDATE, COMPANY, EMPLOYER, ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Chọn hội thoại
2. Gửi text/PDF/job card
3. Retry failed message
4. Reconnect/load missing messages

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/Chat/ChatPage.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/chatMediaService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-030 | Tin nhắn tuyển dụng | 1280 × 1024 | source-mapped |
| JF-031 | Trò chuyện & Tin nhắn | 1280 × 1024 | source-mapped |

## Quy tắc nghiệp vụ
- Giữ chat tuyển dụng khác support assistant.
- REST/Socket/optimistic merge theo ID và clientMessageId.
- Attachments private chỉ participant có quyền tải; request/trust/session được kiểm tra server.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra out-of-order ack với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate socket event với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra reconnect với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra wrong participant với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra expired session với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra file preview error với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/chat-idea.md → design-briefs/chat-brief.md → frontend-plans/chat-plan.md → backend-plans/chat-plan.md → endpoint-apis/chat-endpoints.md → qa/chat-qa.md
