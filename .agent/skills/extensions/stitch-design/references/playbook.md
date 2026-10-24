# Playbook · Vẽ và sửa màn Stitch

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
1. Đọc .stitch/metadata.json, DESIGN.md, catalog và prompt của screen. Dùng đúng project JobFind đã có và kiểm tra live title/URL nếu truy cập được.
2. Discover connector/WebMCP/browser thật; chỉ gọi công cụ được quảng bá. Không giả định có StitchMCP hay dùng schema từ mẫu như tool đang cài.
3. Nếu cần xác thực, dùng cơ chế auth an toàn của công cụ. Nếu site bị chặn, giữ prompt/spec và ghi blocker; không bịa project/screen ID hoặc link.
4. Giữ screen đã có và ưu tiên edit/variant. Với màn mới, xác định source/proposal, viewport và primary CTA trước tạo.
5. Kiểm tra hình/HTML sau tạo, title, dimensions, content, states và tokens. Cập nhật catalog, metadata, assets và prompt log chỉ từ kết quả có thật.
6. Bàn giao URL trực tiếp đã mở xác minh và hình kết quả khi có thay đổi website; dùng code-ui để thực hiện code nếu user yêu cầu.

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
- Màn Stitch thật hoặc prompt/spec offline có blocker rõ ràng, metadata và handoff.

- 37 màn gốc vẫn được giữ; màn bổ sung không trùng screen key.
- URL/screen ID do dịch vụ trả về; offline proposal được ghi rõ là chưa xuất lên Stitch.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: workflow, system-planner, code-ui, save-context, test-release, init-techstack, archive-memory, design-system, enhance-prompt, stitch-loop, figma-handoff, react-components, responsive-accessibility, coding-standards, frontend-design, frontend-build, frontend-slides, shadcn-ui, motion-demo. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
