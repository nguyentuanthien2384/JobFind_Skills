# Playbook · Danh mục nghề nghiệp

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
Slice ví dụ: `recruitment-catalogs` · Danh mục nghề nghiệp và kỹ năng. Actor: ADMIN. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/system/JobSkill/ManageJobSkill.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/container/system/JobType/ManageJobType.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/container/system/useCatalogList.js | Đọc nội dung và các caller/guard/contract liên quan |
| microservices/shared/recruitmentCatalog.cjs | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/recruitment-catalogs-idea.md, design-briefs/recruitment-catalogs-brief.md, frontend-plans/recruitment-catalogs-plan.md, backend-plans/recruitment-catalogs-plan.md, endpoint-apis/recruitment-catalogs-endpoints.md, qa/recruitment-catalogs-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc Allcode/Skill models, recruitmentCatalog, admin catalog routes và consumer forms/search.
2. Giữ code type/code value chính xác và permission admin; label tiếng Việt không thay ID/code nghiệp vụ.
3. Validate add/update/delete, referenced data và uniqueness theo model/service; không xóa catalog đang dùng vô điều kiện.
4. Cập nhật dropdown/search facets tương thích, giữ options inactive state nếu source có.
5. Giữ list pagination/cache và field naming của các route legacy; không gộp mọi taxonomy thành một enum mới.
6. Kiểm tra duplicate code, referenced delete, role khác, stale options và frontend forms đang dùng.

## Quy tắc riêng của feature
- Codes/type/job skill relations theo source; labels không thay key.
- Xóa/update phải giữ referenced jobs/profiles và unique constraints hiện hành.
- Catalog consumer dropdowns/search facets cần tương thích cả legacy/modern.

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
- Catalog CRUD/UI patch và compatibility checks với consumer forms.

- Catalog code thay đổi không làm mất quan hệ job/user/skill.
- Dropdown của màn Stitch lấy dữ liệu thật, không hardcode một ngành mẫu.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: Chọn từ registry theo scope, không nạp toàn bộ suite vào context.. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
