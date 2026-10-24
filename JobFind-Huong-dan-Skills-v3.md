# JobFind — Bộ skills đầy đủ theo source vibe-coding

Phiên bản 3 · 05/10/2026. Bộ đã được cập nhật và cài đặt: **42 skills**, gồm 14 skills trước đây được bổ sung và 28 skills mới.

Nội dung đối chiếu trực tiếp `skills.zip`, source JobFind, mẫu vibe-coding và bộ Stitch. Giữ cách tổ chức `.agent/skills`, extensions, workflows, templates và tài liệu theo từng feature; thay nghiệp vụ bán hàng và công nghệ không phù hợp bằng nghiệp vụ/stack thực tế của JobFind.

## Thành phần đã hoàn thiện

| Thành phần | Số lượng | Nội dung |
|---|---:|---|
| Skills | 42 | 9 core, 7 thiết kế, 14 nghiệp vụ, 12 điều phối/kỹ thuật/QA |
| Feature slices | 31 | Public, ứng viên, doanh nghiệp/nhà tuyển dụng, quản trị và phần mở rộng |
| Tài liệu feature | 186 | Mỗi feature: idea, design brief, frontend plan, backend plan, endpoint contract, QA |
| Workflows | 25 | Từ ý tưởng, vẽ, code và tích hợp đến kiểm tra, lưu và tiếp tục phiên |
| Templates | 18 | Quy tắc dự án, kiến trúc, thiết kế, plans, contracts, QA, handoff và checkpoint |
| Native Stitch references | 37 | 34 desktop, 3 mobile; giữ ảnh PNG và HTML gốc |
| Screen contracts/prompts | 37 + 37 | Layout, tokens, actor, route, source, API, trạng thái, gap và acceptance |
| Route declarations | 94 | 92 route patterns riêng; đọc cả guards ở router cha |
| API catalog | 124 legacy + 71 modern | Modern contracts có 42 schemas; giữ endpoint spelling và envelopes |

## Liên kết thiết kế

- [Stitch JobFind — đầy đủ 37 màn](https://stitch.withgoogle.com/projects/4225480897019041322)
- [Figma V2 — 192 screen/state bổ sung](https://www.figma.com/design/aASrpnjI0sgztK3QB3fxtd?node-id=46-647)

Hai catalog được theo dõi riêng. Figma V2 có 145 desktop và 47 mobile. Số màn thiết kế không đồng nghĩa số route hoặc số tính năng đã code xong. Local ID `JF-001…JF-037` không phải Stitch screen ID.

`match-reference` là mặc định khi cần giống bộ Stitch: giữ đúng biến thể, màu, font và section order. `jobfind-normalized` dùng khi yêu cầu thống nhất thương hiệu. Canvas native desktop 1280/mobile 390 khác kích thước raster PNG; Figma V2 desktop 1440 là mục tiêu thiết kế bổ sung.

## Bắt đầu sử dụng trong ChatGPT

Mở skill điều phối và giao phạm vi cụ thể:

> Dùng $jobfind-workflow thiết lập bộ .agent, .docs và .stitch đầy đủ vào source JobFind của tôi theo bộ skills v3. Đối chiếu source hiện tại, hợp nhất tài liệu đang có và kiểm tra bộ sau khi cài.

Vẽ thêm màn:

> Dùng $jobfind-stitch-loop cùng $jobfind-design-system vẽ các màn còn thiếu của nhóm ứng viên, bám bộ Stitch hiện có. Lập danh sách route/screen/state trước, giữ match-reference, ghi rõ màn nào cần API mới và cập nhật backlog sau mỗi màn đã kiểm tra.

Code từ thiết kế:

> Dùng $jobfind-code-ui và $jobfind-integrate-api code JF-036 trên /job giống Stitch, dùng source/API hiện tại, có loading/empty/error, responsive và kiểm tra phù hợp.

Triển khai tính năng nhiều lớp:

> Dùng $jobfind-workflow hoàn thiện tính năng ứng tuyển từ JF-024 desktop và JF-023 mobile. Lập kế hoạch theo contract hiện có, hoàn thiện UI, tích hợp và nghiệm thu; ghi rõ mọi thay đổi backend cần thiết.

Tiếp tục phiên:

> Dùng $jobfind-save-context đọc CONTEXT và backlog, đối chiếu source mới rồi tiếp tục task chưa hoàn thành trong phạm vi đã giao.

Các skills có chỉ dẫn, tài liệu chuyên môn, ví dụ và sáu trang feature mẫu để dùng trước khi bootstrap. Chỉ nạp phần liên quan; không cần nạp 42 skills cùng lúc. Nếu danh sách skills chưa cập nhật, làm mới trang Skills.

## Dùng cấu trúc giống ZIP trong source

| Vị trí | Vai trò |
|---|---|
| `.agent/skills/` | 9 core entrypoints như mẫu |
| `.agent/skills/extensions/` | Thiết kế, nghiệp vụ, kiến trúc, tiêu chuẩn và QA |
| `.agent/workflows/` | 25 workflow files; không ép dừng chờ Continue sau mỗi bước đã giao |
| `.agent/templates/` | 18 mẫu để phát triển feature mới |
| `.agent/scripts/` | Quét source, kiểm tra mapping, chuẩn bị prompt, cập nhật backlog và lưu checkpoint |
| `.docs/` | Kiến trúc, styleguide, context, status ledger và 186 tài liệu feature |
| `.docs/ui-mockups/` | Screen/route/component mapping, tokens, Figma catalog và handoffs |
| `.stitch/` | DESIGN, SITE, metadata, ảnh/HTML, prompts, backlog và next-prompt |

Core folders: `brainstorm`, `system-planner`, `code-db`, `code-api`, `code-ui`, `integrate-api`, `save-context`, `init-teckstack`, `archive-memory`. Giữ spelling folder `init-teckstack` như mẫu; tên skill/lệnh là `init-techstack`.

Tất cả 17 entrypoints trong `skills.zip` đã có vai trò tương ứng. Chín core giữ cách tổ chức của mẫu; tám extensions được đối chiếu như sau:

| Extension trong ZIP | Skill JobFind tương ứng | Điều chỉnh cho dự án |
|---|---|---|
| `api-design` | `jobfind-api-design` | Legacy REST và modern shared contracts, actor/tenant/error/idempotency |
| `backend-patterns` | `jobfind-backend-patterns` | Express/Babel, Sequelize và service/store boundaries |
| `coding-standards` | `jobfind-coding-standards` | JavaScript/JSX, convention và scripts thật |
| `frontend-design` | `jobfind-frontend-design` | Native Stitch variants, tokens, shells và state matrix |
| `frontend-patterns` | `jobfind-frontend-patterns` | CRA, axios adapters, URL state, session và stale requests |
| `frontend-slides` | `jobfind-frontend-slides` | Deck/demo cho JobFind khi được giao, dùng fixtures có nhãn |
| `nextjs-turbopack` | `jobfind-frontend-build` | Thay hướng dẫn build bằng CRA hiện có; không chuyển app sang Next.js |
| `security-review` | `jobfind-security-review` | Auth/session/RBAC/tenant/media và upload của JobFind |

Skill điều phối có công cụ ghép 42 skills đã cài, tài liệu nền và 37 ảnh gốc theo nghiệp vụ để xuất bộ project đầy đủ sang thư mục mới. Xuất trước khi kiểm tra/cài bộ. Export/cài mặc định xem trước, không ghi đè force. File có nội dung khác cần được hợp nhất theo source thực tế; file giống nhau cài lại không tạo bản trùng. Các scripts đã được chạy thử trên thư mục độc lập.

Sau khi xuất bộ, kiểm tra và cài vào repo:

```bash
python tools/verify_bundle.py --project /path/to/JobFind
python tools/install.py --project /path/to/JobFind
python tools/install.py --project /path/to/JobFind --apply
```

Sau khi cài, chạy từ root dự án:

```bash
python .agent/scripts/check_screen_coverage.py --project .
python .agent/scripts/prepare_screen_prompt.py --screen JF-036 --device MOBILE
python .agent/scripts/save_checkpoint.py
```

Prompt script chuẩn bị yêu cầu vẽ, chưa gọi Stitch. Checkpoint mặc định dry-run; thêm `--apply` để lưu archive và checksum. `update_baton.py` cập nhật từng trường design/code/test; trạng thái hoàn thành phải có evidence. Xem `--help` của script trước dùng.

Slash aliases tùy IDE. Nếu IDE không nhận `/plans`, yêu cầu đọc `.agent/workflows/plans.md` và thực hiện; trong ChatGPT dùng tên `$jobfind-*`.

## Danh mục 42 skills

### 9 core

| Skill | Nhiệm vụ |
| --- | --- |
| [jobfind-brainstorm](https://chatgpt.com/skills?skill_id=6ac1efa7c2c88191b29a9a91477ad7d8) | Phân tích ý tưởng |
| [jobfind-plan](https://chatgpt.com/skills?skill_id=6ac1efc08c7c8191bfa69e45d3f9e114) | Lập kế hoạch nhiều lớp |
| [jobfind-code-db](https://chatgpt.com/skills?skill_id=6ac1efe395d48191b13e3e1118a37a0c) | Database và migration |
| [jobfind-code-api](https://chatgpt.com/skills?skill_id=6ac1efff52348191b399d8a3678e6e3a) | Code REST API |
| [jobfind-code-ui](https://chatgpt.com/skills?skill_id=6ac1f01afc7881919e219c60c61aa5e9) | Code giao diện |
| [jobfind-integrate-api](https://chatgpt.com/skills?skill_id=6ac1f035b8d08191ae58d76d017b53ab) | Nối UI với API |
| [jobfind-save-context](https://chatgpt.com/skills?skill_id=6ac1f350ee4c8191a3ebb372f3a4cb28) | Lưu và tiếp tục phiên |
| [jobfind-init-techstack](https://chatgpt.com/skills?skill_id=6ac3548237548191aaedcfaccf32eead) | Thiết lập môi trường |
| [jobfind-archive-memory](https://chatgpt.com/skills?skill_id=6ac354b6f2608191b71f01e6bf2e3f75) | Lưu trữ lịch sử |

### 7 skills thiết kế

| Skill | Nhiệm vụ |
| --- | --- |
| [jobfind-design-system](https://chatgpt.com/skills?skill_id=6ac354eb83b08191b1bd3fb6b87a7ab9) | Design system từ mẫu |
| [jobfind-enhance-prompt](https://chatgpt.com/skills?skill_id=6ac35522e5a4819187063923cf5e61ca) | Viết prompt thiết kế |
| [jobfind-stitch-design](https://chatgpt.com/skills?skill_id=6ac3555c75808191a5dd850ea5276051) | Vẽ và sửa màn Stitch |
| [jobfind-stitch-loop](https://chatgpt.com/skills?skill_id=6ac3559323688191a9642e141395a6fa) | Vẽ và code theo backlog |
| [jobfind-figma-handoff](https://chatgpt.com/skills?skill_id=6ac355d571108191ae2a43b00294b968) | Figma và bàn giao code |
| [jobfind-react-components](https://chatgpt.com/skills?skill_id=6ac35610a6c8819182578731e7958bf8) | Stitch sang React components |
| [jobfind-responsive-accessibility](https://chatgpt.com/skills?skill_id=6ac3564f0cdc8191a2d8367d596dc9dd) | Responsive và khả năng truy cập |

### 14 skills nghiệp vụ JobFind

| Skill | Nhiệm vụ |
| --- | --- |
| [jobfind-auth-security](https://chatgpt.com/skills?skill_id=6ac1f050c0008191b1d04b3548584351) | Xác thực và quyền |
| [jobfind-recruitment](https://chatgpt.com/skills?skill_id=6ac1f06c8ec481919c856314c25fc401) | Luồng tuyển dụng |
| [jobfind-realtime](https://chatgpt.com/skills?skill_id=6ac1f088738c8191a0d90582e314fb03) | Chat tuyển dụng |
| [jobfind-ai-services](https://chatgpt.com/skills?skill_id=6ac1f0a5004481919e81b7249c1af294) | AI CV và trợ lý |
| [jobfind-microservices](https://chatgpt.com/skills?skill_id=6ac1f0c2f9188191a2ba0e8c3574c003) | Gateway và sự kiện |
| [jobfind-candidate-profile](https://chatgpt.com/skills?skill_id=6ac35ae883a081918b4ab3a7993ed80b) | Hồ sơ và CV ứng viên |
| [jobfind-company-management](https://chatgpt.com/skills?skill_id=6ac35b45d9b08191be877cbc88d7353e) | Công ty và nhân sự |
| [jobfind-job-search](https://chatgpt.com/skills?skill_id=6ac35b9a7174819180412755e7bded17) | Tìm việc và khám phá |
| [jobfind-admin-moderation](https://chatgpt.com/skills?skill_id=6ac35bea0c9081918434508c06cc5483) | Quản trị và duyệt nội dung |
| [jobfind-billing-entitlements](https://chatgpt.com/skills?skill_id=6ac35c58a2d0819188749fc0c8780945) | Gói dịch vụ và quota |
| [jobfind-notifications](https://chatgpt.com/skills?skill_id=6ac35cbbb0688191bc694965eb9e664f) | Thông báo và push |
| [jobfind-job-management](https://chatgpt.com/skills?skill_id=6ac35d1cf9188191b2ea4ce0335559a5) | Quản lý tin tuyển dụng |
| [jobfind-candidate-search](https://chatgpt.com/skills?skill_id=6ac35dd7c8f48191954ad61616441ef8) | Tìm và mở hồ sơ ứng viên |
| [jobfind-catalog-management](https://chatgpt.com/skills?skill_id=6ac35e3d1e80819192f3135fbaeeca7d) | Danh mục nghề nghiệp |

### 12 skills điều phối, kỹ thuật và QA

| Skill | Nhiệm vụ |
| --- | --- |
| [jobfind-workflow](https://chatgpt.com/skills?skill_id=6ac1ef8f25048191811bba14af49a344) | Điều phối dự án |
| [jobfind-test-release](https://chatgpt.com/skills?skill_id=6ac1f0e2a3708191a70c75dd82e68ae4) | Kiểm thử và nghiệm thu |
| [jobfind-coding-standards](https://chatgpt.com/skills?skill_id=6ac3568b702c81919ccd2c1c6d23800e) | Quy chuẩn JavaScript |
| [jobfind-api-design](https://chatgpt.com/skills?skill_id=6ac356caf9308191a35c014151b546b0) | Thiết kế hợp đồng API |
| [jobfind-backend-patterns](https://chatgpt.com/skills?skill_id=6ac3570ea7a081919f6786e9844a2e9c) | Mẫu backend JobFind |
| [jobfind-frontend-patterns](https://chatgpt.com/skills?skill_id=6ac35758014c81919130ca41173cc5aa) | Mẫu React và state |
| [jobfind-frontend-design](https://chatgpt.com/skills?skill_id=6ac357a3e83c81918441cba42ee4631f) | Chất lượng thị giác |
| [jobfind-security-review](https://chatgpt.com/skills?skill_id=6ac357f26cf88191afe793fb00a3d580) | Review bảo mật code |
| [jobfind-frontend-build](https://chatgpt.com/skills?skill_id=6ac3583b2e2c8191a8d3ed0ebe5006fe) | CRA build và hiệu năng |
| [jobfind-frontend-slides](https://chatgpt.com/skills?skill_id=6ac3589559d08191b7620d911cf5afcd) | Trình bày và demo dự án |
| [jobfind-shadcn-ui](https://chatgpt.com/skills?skill_id=6ac358e94d8c81918ab406b8d5272795) | Đánh giá component tùy chọn |
| [jobfind-motion-demo](https://chatgpt.com/skills?skill_id=6ac35a167c008191af1f1fa8bdd65b5c) | Motion và video demo |

## 31 nhóm chức năng có đủ sáu tài liệu

| Feature ID | Chức năng | Actor | Native references |
| --- | --- | --- | --- |
| master-layout | Shell, navigation và layout chung | PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN | Figma/extension theo route |
| home | Trang chủ và khám phá việc làm | PUBLIC | JF-035 |
| job-search | Kết quả tìm việc và bộ lọc | PUBLIC, CANDIDATE | JF-036 |
| job-detail | Chi tiết và external job | PUBLIC, CANDIDATE | JF-010, JF-022, JF-023, JF-024 |
| companies | Danh sách và chi tiết công ty | PUBLIC, CANDIDATE | JF-006, JF-007 |
| auth-login | Đăng nhập và social SSO | PUBLIC | JF-015, JF-016, JF-017 |
| auth-register | Chọn vai trò và đăng ký | PUBLIC | JF-019, JF-020, JF-028 |
| auth-recovery-security | Khôi phục và bảo mật tài khoản | PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN | Figma/extension theo route |
| candidate-profile | Hồ sơ cá nhân ứng viên | CANDIDATE | JF-009 |
| candidate-cv-ai | CV đã chuẩn bị và AI CV | CANDIDATE | Figma/extension theo route |
| applications | Ứng tuyển và theo dõi đơn | CANDIDATE | JF-018, JF-022, JF-023, JF-024 |
| saved-jobs-follow | Việc đã lưu và công ty theo dõi | CANDIDATE | Figma/extension theo route |
| notifications | Trung tâm thông báo | CANDIDATE, COMPANY, EMPLOYER, ADMIN | JF-033 |
| chat | Tin nhắn tuyển dụng | CANDIDATE, COMPANY, EMPLOYER, ADMIN | JF-030, JF-031 |
| support-assistant | Trợ lý hỗ trợ và handoff | PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN | Figma/extension theo route |
| company-profile | Chỉnh sửa hồ sơ doanh nghiệp | COMPANY, EMPLOYER | JF-005 |
| company-team | Nhân sự và tuyển dụng theo tenant | COMPANY, EMPLOYER | Figma/extension theo route |
| employer-dashboard | Dashboard doanh nghiệp | COMPANY, EMPLOYER | JF-034 |
| job-posting | Đăng và quản lý tin | COMPANY, EMPLOYER, ADMIN | JF-021 |
| candidate-search | Kho ứng viên và mở CV | COMPANY, EMPLOYER | JF-012 |
| pipeline | Kanban, đánh giá và AI tuyển dụng | COMPANY, EMPLOYER | JF-025 |
| interviews-offers | Phỏng vấn và thư mời | COMPANY, EMPLOYER, CANDIDATE | JF-013, JF-014 |
| billing-packages | Mua gói và lịch sử giao dịch | COMPANY, ADMIN | JF-003 |
| admin-overview | Tổng quan quản trị | ADMIN | JF-002 |
| admin-users | Quản lý người dùng | ADMIN | JF-027 |
| admin-jobs | Kiểm duyệt tin tuyển dụng | ADMIN | JF-011 |
| admin-companies | Duyệt và xác thực doanh nghiệp | ADMIN | JF-008, JF-037 |
| admin-packages | Quản lý gói đăng tin và CV | ADMIN | JF-026 |
| admin-reports-audit | Báo cáo và audit | ADMIN | JF-029 |
| recruitment-catalogs | Danh mục nghề nghiệp và kỹ năng | ADMIN | Figma/extension theo route |
| system-proposals | Màn tổng hợp chưa có đầy đủ source | ADMIN, COMPANY | JF-004, JF-013, JF-014, JF-003 |

## Quy trình vẽ tiếp và code tiếp

1. Chọn feature/screen/variant từ catalog, đối chiếu source hiện tại và xác định actor/quyền/tenant.
2. Đọc idea/design/frontend/backend/API/QA liên quan; với sửa nhỏ chỉ dùng phần cần thiết.
3. Vẽ theo reference và tokens của đúng variant; kiểm tra kết quả, lưu URL/node/screenshot thật và cập nhật design status.
4. Code React JS/CRA bằng component hiện có; nối adapter/API thật, giữ flags và response conventions.
5. Kiểm tra layout, interactions và các ca chức năng/quyền theo patch; ghi commands/results thực.
6. Lưu context/backlog/handoff để tiếp tục phiên. Giữ độc lập `design_status`, `code_status`, `test_status`.

Stack bám source: React 18 JavaScript/JSX, CRA, CSS/SCSS, Ant Design/Reactstrap; Express/Babel/Sequelize/MySQL và microservices với contracts riêng. Frontend adapters ở `frontend/src/service`, axios ở `frontend/src/axios.js`. Các slots Next.js/Turbopack trong mẫu đã được thay bằng hướng dẫn build CRA phù hợp. Shadcn/motion/slides là skills bổ sung chỉ áp dụng theo yêu cầu, không tự chuyển stack.

## Các điểm đã bổ sung để thiết kế và code không lệch nhau

| Luồng | Chi tiết cần giữ |
|---|---|
| Apply desktop/mobile | JF-024 và JF-023 dùng cùng modal trên detail-job; submit dùng `cvService`, CV online dùng `userService`, prepared list dùng `aiSearchService` |
| CV upload | Reference 10 MB/DOCX khác UI PDF ≤2 MiB; backend chưa enforce cùng giới hạn ở submit. Docs ghi rõ gap và việc cần plan |
| Wizard/portfolio | Wizard là presentation mới, portfolio chưa payload/model; Mobile Continue chuyển bước, không gọi POST trực tiếp |
| Candidate progress | `/my-applications` chưa trả interview/offer snapshots; không nối candidate vào recruiter manage-detail API |
| Lịch phỏng vấn | Form gửi lời mời hiện có; global calendar cần read API. PostgreSQL invitation snapshots là nguồn, latest snapshot phải chọn trước date filter |
| Billing/settings | Mua gói post/CV hiện có; recurring auto-renew/card-on-file và general settings là proposal riêng |
| Auth | Google/GitHub/Auth0 theo providers readiness; marker không phải token, writes không tự replay sau refresh |
| ID/tenant/stages | Giữ application ID, legacy CV ID và Mongo CV ID riêng; quyền/tenant enforce ở server và sáu stage keys source |
| Route dùng chung | AddUser có cả platform/team scope; UserInfo sửa chính actor. History post/CV thuộc billing; saved/followed/recommended lists có source riêng; job-level thuộc recruitment catalogs |

## Kiểm tra đã thực hiện

- 42 skills đạt kiểm tra cấu trúc; kiểm tra liên kết references không có lỗi.
- 40 kiểm tra thực tế đạt cho xuất/cài bộ, source/document joins, giữ file xung đột, cài lại, prompt, backlog và checkpoint.
- Đối chiếu hashes cho 37 HTML/PNG và source paths của 31 features, 94 route declarations.
- Thử dùng skills trên hai nhiệm vụ lịch và ứng tuyển; bổ sung mapping/API/permissions/validation/CTA gaps tìm được.

Các kiểm tra trên xác minh bộ skills và tài liệu. Phiên này chưa sửa code ứng dụng hoặc chạy runtime tests JobFind; QA feature giữ NOT_RUN cho đến khi triển khai và kiểm tra thật.
