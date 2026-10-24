# Playbook · Thiết lập môi trường

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
1. Xác nhận root có frontend/backend/microservices; đọc engines, lockfiles và scripts hiện hành.
2. Giữ React CRA JavaScript, Express/Babel, Sequelize và ESM microservices. Lập ghi chú cho yêu cầu đổi stack thay vì khởi tạo app mẫu đè source.
3. Kiểm tra Node/npm/Python và dependency sẵn có; chọn install tương ứng lockfile, không ghi credential/env values vào tài liệu.
4. Đối chiếu docs dev và tên env key cần có; cung cấp template chỉ tên/placeholder được ghi rõ.
5. Chạy kiểm tra read-only trước; khởi chạy local services chỉ trong scope user giao, giữ cổng/flags theo script.
6. Ghi môi trường đã xác minh và blocker; bootstrap bộ tài liệu bằng workflow nếu được yêu cầu.

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
- Environment checklist, setup plan và thay đổi cấu hình local cần thiết.

- Không chuyển JobFind sang Next.js/Vite/Nest/Prisma do mẫu dùng stack khác.
- Mọi port/script/dependency được đọc từ source hiện hành.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: workflow, system-planner, code-ui, save-context, test-release, archive-memory, design-system, enhance-prompt, stitch-design, stitch-loop, figma-handoff, react-components, responsive-accessibility, coding-standards, frontend-design, frontend-build, frontend-slides, shadcn-ui, motion-demo. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
