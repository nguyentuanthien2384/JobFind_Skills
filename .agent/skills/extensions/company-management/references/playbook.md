# Playbook · Công ty và nhân sự

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
Slice ví dụ: `company-profile` · Chỉnh sửa hồ sơ doanh nghiệp. Actor: COMPANY, EMPLOYER. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/system/Company/AddCompany.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/service/userService.js | Đọc nội dung và các caller/guard/contract liên quan |
| backend/src/services/companyService.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/company-profile-idea.md, design-briefs/company-profile-brief.md, frontend-plans/company-profile-plan.md, backend-plans/company-profile-plan.md, endpoint-apis/company-profile-endpoints.md, qa/company-profile-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc ListCompany/DetailCompany, AddCompany/ManageEmployer và companyService; phân biệt public profile với dữ liệu verification private.
2. Kiểm tra COMPANY/EMPLOYER company membership và permission; công ty hoạt động/đã duyệt theo S1/CS1.
3. Map logo/cover/info/locations/jobs/benefits theo field hiện có; public response không lộ giấy tờ xác minh.
4. Với team, server xác định company/actor và ràng buộc add/quit/member; không sửa role từ body thiếu quyền.
5. Giữ modes edit/preview/pending/rejected/verified, save failure và empty jobs; chọn variant JF-005/006/007/008/037 phù hợp.
6. Kiểm tra public/private, member khác công ty và company state làm thay đổi navigation đúng.

## Quy tắc riêng của feature
- EMPLOYER không có company chỉ vào onboarding theo CREATE_COMPANY.
- Pending company navigation khác active S1/CS1.
- Verification/license documents không public theo preview.

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
- Company/team UI/API patch và ownership/visibility checks.

- Page công khai không truy cập giấy tờ doanh nghiệp private.
- Company/Employer không xem report quản trị nền tảng.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: Chọn từ registry theo scope, không nạp toàn bộ suite vào context.. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
