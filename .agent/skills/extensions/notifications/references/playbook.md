# Playbook · Thông báo và push

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
Slice ví dụ: `notifications` · Trung tâm thông báo. Actor: CANDIDATE, COMPANY, EMPLOYER, ADMIN. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/Candidate/CandidateNotifications.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/service/notificationJobsService.js | Đọc nội dung và các caller/guard/contract liên quan |
| backend/src/routes/web.js | Đọc nội dung và các caller/guard/contract liên quan |
| microservices/notification-service/package.json | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/notifications-idea.md, design-briefs/notifications-brief.md, frontend-plans/notifications-plan.md, backend-plans/notifications-plan.md, endpoint-apis/notifications-endpoints.md, qa/notifications-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc notificationJobsService/notificationService, candidate notifications và notification owner/consumer.
2. Map loại event với actor/role/destination route thật; kiểm tra quyền ở đích và không dẫn recruiter vào candidate-only page.
3. Dedupe event/id, tính unread đúng, mark-read có ownership và không cộng lặp từ socket/poll.
4. Push permission và subscription chỉ khi user thực hiện thao tác phù hợp; sessions đổi phải quản lý subscription theo source.
5. Phân biệt queued/sent/delivered, không báo email gửi thành công chỉ từ event accepted; preference theo field hiện có.
6. Kiểm tra pagination, zero unread, deleted target, role đổi, event replay và provider failure.

## Quy tắc riêng của feature
- Destination phải theo quyền của actor và route thật.
- Unread dedupe theo notification ID; mark-read kiểm tra owner.
- Preferences trong thiết kế cần đối chiếu fields source; queued không là delivered.

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
- Notification/push UI/API/event patch và destination map.

- Notification không lộ job/application private của tenant khác.
- UI thông báo phản ánh delivery/state thật hoặc label fixture.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: Chọn từ registry theo scope, không nạp toàn bộ suite vào context.. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
