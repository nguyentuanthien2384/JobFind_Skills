# Playbook · Quản trị và duyệt nội dung

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
Slice ví dụ: `admin-jobs` · Kiểm duyệt tin tuyển dụng. Actor: ADMIN. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/system/Post/ManagePost.js | Đọc nội dung và các caller/guard/contract liên quan |
| backend/src/routes/web.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/admin-jobs-idea.md, design-briefs/admin-jobs-brief.md, frontend-plans/admin-jobs-plan.md, backend-plans/admin-jobs-plan.md, endpoint-apis/admin-jobs-endpoints.md, qa/admin-jobs-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc admin routes/permissions, ManagePost/ManageCompany/ManageUser và admin services; xác định ADMIN quyền thực tế.
2. Giữ danh sách, filters/paging, state và actions theo source. Duyệt công ty dùng endpoint accecpt-company hiện hành.
3. Validate target/status/permission ở server; cần lý do theo contract nghiệp vụ, tránh UI-only approval.
4. Giữ docs/verification/media private, review panel hiển thị đúng target và không reuse dữ liệu hàng cũ khi đổi row.
5. Audit thao tác theo cơ chế hiện có; phân biệt user/company/job state, allowlist actions và concurrency.
6. Kiểm tra role khác, pending/active/ban/reject, submit lặp, lỗi API và refresh danh sách sau mutation.

## Quy tắc riêng của feature
- Quyền MODERATE_POSTS ở UI và ADMINISTRATION/backend equivalent cần đối chiếu.
- Approved/ban/public state cập nhật server và projection đúng owner.
- Lý do moderation theo source contract, không bịa field ghi được.

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
- Admin UI/API patch cùng role/target/action matrix.

- EMPLOYER/COMPANY không được sử dụng endpoint admin dù có UI tương tự.
- Thao tác duyệt/từ chối cập nhật thật và có evidence, không chỉ đổi badge.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: Chọn từ registry theo scope, không nạp toàn bộ suite vào context.. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
