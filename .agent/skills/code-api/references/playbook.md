# Playbook · Code REST API

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
1. Đọc endpoint catalog, adapter gọi API và controller/service hiện hành. Kiểm tra contract modern ở shared/contracts trước thêm route.
2. Dùng publicPath thực tế: /api + path, riêng admin /api/admin + path. Giữ endpoint legacy và spelling đã được client dùng.
3. Xác thực actor từ token/cookie phía server; kiểm tra permission, company state và ownership; không lấy user/role đáng tin từ body.
4. Validate params/query/body theo schema; giữ response legacy và modern ở adapter phù hợp, bounded pagination và lỗi có ngữ nghĩa.
5. Để controller điều phối transport, service xử lý nghiệp vụ/transaction/outbox. Với ghi có contract idempotency, giữ key và kết quả ổn định cho cùng thao tác.
6. Kiểm tra success, validation, 401/403, tenant chéo, duplicate write và dependency failure; cập nhật endpoint doc, contracts và tests liên quan.

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
- Patch endpoint đầy đủ, contract, error handling và kiểm tra phù hợp.

- Endpoint xuất hiện trong router/gateway/contract cần thiết và client gọi đúng.
- Không phát lại thao tác ghi tự động sau refresh hoặc khi timeout không rõ kết quả.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: api-design, job-management. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
