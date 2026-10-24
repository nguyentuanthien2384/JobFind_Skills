# JobFind — 42 skills

9 core skills và 33 extensions. Chỉ nạp skills và references cần cho task.

| Skill ChatGPT | Skill trong source | Nhóm | Khi dùng |
| --- | --- | --- | --- |
| jobfind-workflow | [workflow](skills/extensions/workflow/SKILL.md) | extension | Điều phối dự án |
| jobfind-brainstorm | [brainstorm](skills/brainstorm/SKILL.md) | core | Phân tích ý tưởng |
| jobfind-plan | [system-planner](skills/system-planner/SKILL.md) | core | Lập kế hoạch nhiều lớp |
| jobfind-code-db | [code-db](skills/code-db/SKILL.md) | core | Database và migration |
| jobfind-code-api | [code-api](skills/code-api/SKILL.md) | core | Code REST API |
| jobfind-code-ui | [code-ui](skills/code-ui/SKILL.md) | core | Code giao diện |
| jobfind-integrate-api | [integrate-api](skills/integrate-api/SKILL.md) | core | Nối UI với API |
| jobfind-save-context | [save-context](skills/save-context/SKILL.md) | core | Lưu và tiếp tục phiên |
| jobfind-auth-security | [auth-security](skills/extensions/auth-security/SKILL.md) | domain | Xác thực và quyền |
| jobfind-recruitment | [recruitment](skills/extensions/recruitment/SKILL.md) | domain | Luồng tuyển dụng |
| jobfind-realtime | [realtime](skills/extensions/realtime/SKILL.md) | domain | Chat tuyển dụng |
| jobfind-ai-services | [ai-services](skills/extensions/ai-services/SKILL.md) | domain | AI CV và trợ lý |
| jobfind-microservices | [microservices](skills/extensions/microservices/SKILL.md) | domain | Gateway và sự kiện |
| jobfind-test-release | [test-release](skills/extensions/test-release/SKILL.md) | extension | Kiểm thử và nghiệm thu |
| jobfind-init-techstack | [init-techstack](skills/init-teckstack/SKILL.md) | core | Thiết lập môi trường |
| jobfind-archive-memory | [archive-memory](skills/archive-memory/SKILL.md) | core | Lưu trữ lịch sử |
| jobfind-design-system | [design-system](skills/extensions/design-system/SKILL.md) | design | Design system từ mẫu |
| jobfind-enhance-prompt | [enhance-prompt](skills/extensions/enhance-prompt/SKILL.md) | design | Viết prompt thiết kế |
| jobfind-stitch-design | [stitch-design](skills/extensions/stitch-design/SKILL.md) | design | Vẽ và sửa màn Stitch |
| jobfind-stitch-loop | [stitch-loop](skills/extensions/stitch-loop/SKILL.md) | design | Vẽ và code theo backlog |
| jobfind-figma-handoff | [figma-handoff](skills/extensions/figma-handoff/SKILL.md) | design | Figma và bàn giao code |
| jobfind-react-components | [react-components](skills/extensions/react-components/SKILL.md) | design | Stitch sang React components |
| jobfind-responsive-accessibility | [responsive-accessibility](skills/extensions/responsive-accessibility/SKILL.md) | design | Responsive và khả năng truy cập |
| jobfind-coding-standards | [coding-standards](skills/extensions/coding-standards/SKILL.md) | extension | Quy chuẩn JavaScript |
| jobfind-api-design | [api-design](skills/extensions/api-design/SKILL.md) | extension | Thiết kế hợp đồng API |
| jobfind-backend-patterns | [backend-patterns](skills/extensions/backend-patterns/SKILL.md) | extension | Mẫu backend JobFind |
| jobfind-frontend-patterns | [frontend-patterns](skills/extensions/frontend-patterns/SKILL.md) | extension | Mẫu React và state |
| jobfind-frontend-design | [frontend-design](skills/extensions/frontend-design/SKILL.md) | extension | Chất lượng thị giác |
| jobfind-security-review | [security-review](skills/extensions/security-review/SKILL.md) | extension | Review bảo mật code |
| jobfind-frontend-build | [frontend-build](skills/extensions/frontend-build/SKILL.md) | extension | CRA build và hiệu năng |
| jobfind-frontend-slides | [frontend-slides](skills/extensions/frontend-slides/SKILL.md) | extension | Trình bày và demo dự án |
| jobfind-shadcn-ui | [shadcn-ui](skills/extensions/shadcn-ui/SKILL.md) | extension | Đánh giá component tùy chọn |
| jobfind-motion-demo | [motion-demo](skills/extensions/motion-demo/SKILL.md) | extension | Motion và video demo |
| jobfind-candidate-profile | [candidate-profile](skills/extensions/candidate-profile/SKILL.md) | domain | Hồ sơ và CV ứng viên |
| jobfind-company-management | [company-management](skills/extensions/company-management/SKILL.md) | domain | Công ty và nhân sự |
| jobfind-job-search | [job-search](skills/extensions/job-search/SKILL.md) | domain | Tìm việc và khám phá |
| jobfind-admin-moderation | [admin-moderation](skills/extensions/admin-moderation/SKILL.md) | domain | Quản trị và duyệt nội dung |
| jobfind-billing-entitlements | [billing-entitlements](skills/extensions/billing-entitlements/SKILL.md) | domain | Gói dịch vụ và quota |
| jobfind-notifications | [notifications](skills/extensions/notifications/SKILL.md) | domain | Thông báo và push |
| jobfind-job-management | [job-management](skills/extensions/job-management/SKILL.md) | domain | Quản lý tin tuyển dụng |
| jobfind-candidate-search | [candidate-search](skills/extensions/candidate-search/SKILL.md) | domain | Tìm và mở hồ sơ ứng viên |
| jobfind-catalog-management | [catalog-management](skills/extensions/catalog-management/SKILL.md) | domain | Danh mục nghề nghiệp |

Slash aliases phụ thuộc IDE. Nếu không được nhận diện, yêu cầu đọc `.agent/workflows/<command>.md`.

`init-teckstack` là tên thư mục trong mẫu; frontmatter và lệnh dùng `init-techstack`. Next.js/Turbopack được thay bằng frontend-build cho CRA. Không ép user gõ Continue sau mỗi bước đã được giao.
