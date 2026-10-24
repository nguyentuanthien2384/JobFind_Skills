# Playbook · Figma và bàn giao code

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
Slice ví dụ: `master-layout` · Shell, navigation và layout chung. Actor: PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/App.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/container/system/HomeAdmin.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/container/Candidate/HomeCandidate.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/auth/RouteGuard.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/auth/accessControl.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/master-layout-idea.md, design-briefs/master-layout-brief.md, frontend-plans/master-layout-plan.md, backend-plans/master-layout-plan.md, endpoint-apis/master-layout-endpoints.md, qa/master-layout-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Chọn nguồn chính: Stitch exact 37 hoặc Figma V2 192 mục tiêu; đọc mapping và label. Không cộng 2 bộ như các route khác nhau.
2. Read skills Figma bắt buộc trước từng use_figma/create_new_file/get_design_context theo công cụ thực sự đang có.
3. Kiểm tra page/frame/node hiện tại trước sửa; giữ old variants và tạo layers editable, auto-layout, components/variables khi khả năng công cụ cho phép.
4. Đặt names/roles/viewports/states nhất quán; lấy node IDs và URLs từ kết quả thực, không tái tạo ID bằng suy đoán.
5. So khớp hình, clipping, overflow, typography, responsive và prototype path; phân biệt duplicate prototype frames với screen catalog.
6. Cập nhật screen-node map, source files, API, props/states và acceptance; khi code dùng design-to-code skill + code-ui của JobFind.

## Quy tắc riêng của feature
- Menu xuất hiện theo permission và company state, không chỉ role.
- Đọc guard ở router cha; permission list rỗng từ parser không chứng minh public.
- Giữ chat, support, candidate và admin shells theo router thật.

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
- Frames/components hoặc handoff được xác minh với node map và QA.

- Link đúng node và file còn tồn tại; mỗi catalog key có mapping duy nhất.
- Bản Figma mục tiêu không bị mô tả là source đã implement.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: workflow, system-planner, code-ui, save-context, test-release, init-techstack, archive-memory, design-system, enhance-prompt, stitch-design, stitch-loop, react-components, responsive-accessibility, coding-standards, frontend-design, frontend-build, frontend-slides, shadcn-ui, motion-demo. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
