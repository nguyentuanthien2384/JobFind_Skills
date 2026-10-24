# Playbook · Điều phối dự án

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
1. Xác định phạm vi người dùng giao: ý tưởng, thiết kế, UI tĩnh, tích hợp hay full-stack. Chọn đúng các bước cần làm và tiếp tục đến kết quả đã giao; lưu checkpoint khi ngữ cảnh dài.
2. Nạp .docs/ARCHITECTURE.md, FEATURES_DONE.md, CONTEXT.md và .agent/skill-registry.md nếu đã có. Xác minh source bằng inventory; giữ các thay đổi đang có.
3. Khi thiết lập bộ dự án, dùng scripts/export_vibe_bundle.py để xuất bộ đầy đủ; xem kế hoạch ghi của tools/install.py trước --apply. Xung đột phải được hợp nhất theo nội dung hiện có.
4. Lấy feature ID và screen ID từ catalog, nối role → route → component → adapter → API → datastore. Dùng system-planner cho thay đổi nhiều lớp.
5. Vẽ tiếp theo stitch-design + design-system; dịch thiết kế theo code-ui + react-components; sửa DB/API/integration theo skills tương ứng.
6. Chọn kiểm tra theo rủi ro bằng test-release; sửa lỗi có căn cứ, cập nhật trạng thái và bàn giao phần đã hoàn thành cùng phần còn thiếu.

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
- Bộ điều phối trong project hoặc patch tính năng đã giao.
- Chuỗi tài liệu ý tưởng → thiết kế → frontend → backend → API → QA, cập nhật context.

- Registry giải quyết được mọi skill và mọi tài liệu liên quan.
- Bản thiết kế, patch và test có bằng chứng riêng; checkpoint không đánh dấu code hoàn thành chỉ từ một bản vẽ.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: system-planner, code-ui, save-context, test-release, init-techstack, archive-memory, design-system, enhance-prompt, stitch-design, stitch-loop, figma-handoff, react-components, responsive-accessibility, coding-standards, frontend-design, frontend-build, frontend-slides, shadcn-ui, motion-demo. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
