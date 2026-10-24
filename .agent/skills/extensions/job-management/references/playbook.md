# Playbook · Quản lý tin tuyển dụng

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
Slice ví dụ: `job-posting` · Đăng và quản lý tin. Actor: COMPANY, EMPLOYER, ADMIN. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/system/Post/AddPost.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/service/jobPostingService.js | Đọc nội dung và các caller/guard/contract liên quan |
| backend/src/routes/web.js | Đọc nội dung và các caller/guard/contract liên quan |
| microservices/shared/contracts/operations.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/job-posting-idea.md, design-briefs/job-posting-brief.md, frontend-plans/job-posting-plan.md, backend-plans/job-posting-plan.md, endpoint-apis/job-posting-endpoints.md, qa/job-posting-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc AddPost, jobs adapters, job-core contract và legacy postService; giữ write mode đang bật.
2. Map fields và catalog codes thật; wizard chỉ là trình bày form, không tự tạo endpoint riêng cho từng bước.
3. Check company state S1/CS1, permission, owner và package/quota tại server.
4. Giữ validation, draft/preview/submitting/error, stable idempotency key cho create/repost nếu contract yêu cầu.
5. Ghi revision/outbox để projection search cập nhật; không chép trạng thái approved từ client.
6. Kiểm tra create/update/repost, quota hết, duplicate, race và job ngoài tenant.

## Quy tắc riêng của feature
- Giữ JOB_MANAGE/owner/company state và quota server.
- Wizard sử dụng một contract field set, không thêm endpoint từng bước.
- Create/repost idempotency giữ một key cho một thao tác; source flags quyết định mode.

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
- Job CRUD/repost/UI patch và contract/quota checks.

- Repost không tạo nhiều tin/tiêu quota nhiều lần từ cùng thao tác.
- Tin chưa được phép public không xuất hiện trong search vì UI filter.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: code-api, api-design. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
