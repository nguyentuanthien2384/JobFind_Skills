# Playbook · Đánh giá component tùy chọn

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
1. Đọc UI stack hiện tại Ant Design/Reactstrap/CSS-SCSS và target component; xác định yêu cầu thực sự cần shadcn.
2. Ưu tiên reuse hiện có; đề xuất adapter/migration hẹp nếu user yêu cầu shadcn, không cài Tailwind/TypeScript hàng loạt do reference HTML.
3. Kiểm tra công cụ/docs chính thức hiện hành khi implementation cần package/version/API mới; ghi tác động build/style.
4. Map component props/states/tokens/keyboard để giữ screen contract.
5. Thực hiện patch đúng scope đã giao và giữ source compatibility; không tự chuyển cả app.
6. Kiểm tra interaction, CSS leakage, CRA build và mobile.

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
- Compatibility decision hoặc component patch theo phạm vi được yêu cầu.

- Dependency mới có lý do gắn với yêu cầu cụ thể.
- Component hiện hành không bị phá hoặc đổi theme toàn cục.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: workflow, system-planner, code-ui, save-context, test-release, init-techstack, archive-memory, design-system, enhance-prompt, stitch-design, stitch-loop, figma-handoff, react-components, responsive-accessibility, coding-standards, frontend-design, frontend-build, frontend-slides, motion-demo. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
