# Playbook · Tìm việc và khám phá

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
Slice ví dụ: `job-search` · Kết quả tìm việc và bộ lọc. Actor: PUBLIC, CANDIDATE. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/JobPage/JobPage.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/service/aiSearchService.js | Đọc nội dung và các caller/guard/contract liên quan |
| microservices/shared/contracts/operations.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/job-search-idea.md, design-briefs/job-search-brief.md, frontend-plans/job-search-plan.md, backend-plans/job-search-plan.md, endpoint-apis/job-search-endpoints.md, qa/job-search-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc JobPage/aiSearchService và flags; chọn legacy get-filter-post hay modern search theo mode đang có.
2. Map keyword, location, job/work type, salary, experience và sort bằng schema/catalog thật; query có bounds.
3. Giữ URL filters/back-forward, debounce và stale response cancellation, reset pagination khi đổi filter.
4. Public results chỉ hiển thị jobs/company công khai hợp lệ; external job giữ provenance và route khác.
5. Giữ JobCard/list/detail tương thích CTA lưu/ứng tuyển/login intent theo quyền.
6. Kiểm tra zero results, partial network, stale request, pagination, data dài và source-mode variants.

## Quy tắc riêng của feature
- Filters dùng codes/schemas source và pagination có bounds.
- URL lưu filter, back/forward phải hồi phục kết quả.
- Response trễ không ghi đè query mới; debounce theo hook/lodash đã có.

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
- Search/home/detail patch, query-state mapping và focused checks.

- Mỗi JobCard dẫn đúng job ID và detail route.
- Search đổi nhanh không flash kết quả sai hoặc gửi mỗi keystroke.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: integrate-api, frontend-patterns. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
