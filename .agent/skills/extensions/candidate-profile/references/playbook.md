# Playbook · Hồ sơ và CV ứng viên

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
Slice ví dụ: `candidate-profile` · Hồ sơ cá nhân ứng viên. Actor: CANDIDATE. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/Candidate/CandidateInfo.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/service/aiSearchService.js | Đọc nội dung và các caller/guard/contract liên quan |
| backend/src/controllers/userController.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/service/userService.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/candidate-profile-idea.md, design-briefs/candidate-profile-brief.md, frontend-plans/candidate-profile-plan.md, backend-plans/candidate-profile-plan.md, endpoint-apis/candidate-profile-endpoints.md, qa/candidate-profile-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc CandidateInfo, aiSearchService, identity store và legacy user adapter; giữ quyền profile self và namespace CV.
2. Map fields thực tế, profile completion, validation và optional fields theo source; không biến placeholder Stitch thành field backend tự động.
3. Prepared CV ở identity MongoDB và submitted CV legacy khác nhau; lưu snapshot đúng khi ứng tuyển.
4. Upload/preview PDF theo source limits, MIME/size/ownership; sanitize links và giữ private media.
5. Triển khai states edit/dirty/saving/error/empty và giữ dữ liệu khi save thất bại; settings riêng theo quyền.
6. Kiểm tra actor khác, dữ liệu dài, không CV, nhiều CV, PDF lỗi và đổi phiên.

## Quy tắc riêng của feature
- Legacy user profile và identity profile cần adapter đúng mode.
- Completion score nếu chưa có backend phải được ghi là derived UI/fixture.
- Chỉ cập nhật fields whitelist và ownership từ session.

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
- Profile/CV patch và handoff với fields/ownership/state matrix.

- Ứng viên chỉ sửa/đọc hồ sơ và CV thuộc phạm vi mình.
- Thay CV chuẩn bị không làm sai snapshot đơn đã nộp.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: Chọn từ registry theo scope, không nạp toàn bộ suite vào context.. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
