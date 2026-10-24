# Playbook · Chat tuyển dụng

## Mục lục
1. Input/evidence
2. Feature/source
3. Quy trình
4. Decision và failure
5. Output/acceptance
6. Handoff

## Input và evidence
- Yêu cầu hiện tại, actor, feature/screen/variant và source root có 3 package frontend/backend/microservices.
- Kiểm tra AGENTS, changed files, .docs/CONTEXT, FEATURES_DONE và source mới trước thay đổi.
- Khi thiếu source có thể lập spec với assumptions; không tạo patch vào một cấu trúc tự đoán.

## Feature và source
Slice ví dụ: `chat` · Tin nhắn tuyển dụng. Actor: CANDIDATE, COMPANY, EMPLOYER, ADMIN. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/Chat/ChatPage.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/service/chatMediaService.js | Đọc nội dung và các caller/guard/contract liên quan |
| backend/src/routes/web.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/chat-idea.md, design-briefs/chat-brief.md, frontend-plans/chat-plan.md, backend-plans/chat-plan.md, endpoint-apis/chat-endpoints.md, qa/chat-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc ChatPage, socket client, chatService/mediaService và server auth/rooms. Phân biệt chat tuyển dụng và support assistant.
2. Kiểm tra participant/role/tenant ở server trước vào room, gửi hoặc đọc attachments. Đổi phiên phải rời room và xóa dữ liệu phiên cũ.
3. Dùng clientMessageId ổn định cho một tin; merge optimistic/ack/REST/socket bằng ID, xử lý thứ tự và delivery state.
4. Sau reconnect, lấy khoảng tin còn thiếu, không chỉ tăng unread từ mọi event. Hủy listeners đúng và kiểm tra hai tab.
5. PDF attachment dùng endpoint có quyền, MIME/size validation và preview đúng; không dùng URL public để đọc CV riêng.
6. Kiểm tra gửi, failure/retry, reconnect, đổi hội thoại/phiên, duplicate events và unread; cập nhật screen handoff JF-030/JF-031.

## Quy tắc riêng của feature
- Giữ chat tuyển dụng khác support assistant.
- REST/Socket/optimistic merge theo ID và clientMessageId.
- Attachments private chỉ participant có quyền tải; request/trust/session được kiểm tra server.

## Decision và failure handling
| Tình huống | Xử lý |
| --- | --- |
| source khác snapshot | Đọc file hiện hành, ghi drift, cập nhật plan/catalog; không giữ route/DTO cũ bằng suy đoán |
| ảnh có control chưa có API | Ghi partial/proposal; implement phần đã có và lập owner/contract plan cho phần thiếu |
| 401/403 hoặc company chưa ready | Xử lý session/permission/readiness thật và giữ draft; server vẫn cần enforce |
| write timeout hoặc refresh | Không tự replay; giữ idempotency theo contract và cung cấp retry có chủ đích |
| tool Stitch/Figma không có hoặc bị chặn | Giữ prompt/spec/assets local; nêu phần chưa đưa lên dịch vụ và không bịa link |
| giao diện giống mẫu nhưng mock data | Ghi designed/UI-mock; nối dữ liệu và kiểm tra thật trước implemented/verified |
| test cần DB/IdP/provider chưa có | Chạy kiểm tra độc lập được phép; ghi skipped với điều kiện thiếu |

## Output và acceptance
- Chat/socket/media patch, state mapping và kiểm tra race/reconnect.

- Một tin hiển thị một lần dù ack và event về khác thứ tự.
- Người không tham gia không tải attachment bằng URL đoán được.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: Chọn từ registry theo scope, không nạp toàn bộ suite vào context.. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
