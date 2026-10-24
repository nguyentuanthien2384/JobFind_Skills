# Playbook · Xác thực và quyền

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
Slice ví dụ: `auth-login` · Đăng nhập và social SSO. Actor: PUBLIC. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/login/Login.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/auth/authClient.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/auth/SocialButtons.js | Đọc nội dung và các caller/guard/contract liên quan |
| backend/src/controllers/authController.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/auth-login-idea.md, design-briefs/auth-login-brief.md, frontend-plans/auth-login-plan.md, backend-plans/auth-login-plan.md, endpoint-apis/auth-login-endpoints.md, qa/auth-login-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc authClient, SessionContext, RouteGuard, authController/auth services và /api/auth/providers. Provider trong thiết kế chỉ hiển thị hoạt động khi server readiness cho phép.
2. Giữ access token trong memory và refresh HttpOnly cookie; token_user là marker. Xử lý login/logout/refresh đồng bộ và session invalidation.
3. Với SSO, kiểm tra state/nonce/PKCE, redirect allowlist, cookie origin, pending signup và intentional account linking; không tự gộp theo email.
4. Phân biệt Google/GitHub trực tiếp với connections qua Auth0 Universal Login; đọc readiness và yêu cầu connection hiện tại, không đoán cấu hình IdP.
5. Ánh xạ 4 role ADMIN/COMPANY/EMPLOYER/CANDIDATE theo permissions thực tế; signup chỉ dùng lựa chọn hợp lệ CANDIDATE/EMPLOYER.
6. Kiểm tra password/SSO/signup/link/unlink/revoke, reload, nhiều tab và 401/403; giữ mật khẩu/OTP/secrets ngoài nhật ký và tài liệu.

## Quy tắc riêng của feature
- Google/GitHub/Auth0 hiển thị theo providers readiness; LinkedIn trong mẫu chỉ là fixture.
- Giữ token_user marker, access token memory, refresh cookie HttpOnly.
- SSO direct và Auth0 connections là luồng riêng; giữ state/nonce/PKCE.

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
- Patch auth/UI theo đúng provider, ma trận lỗi và kiểm tra phù hợp.

- Nút provider không hứa live login khi IdP chưa sẵn sàng.
- Backend chặn privilege escalation và access chéo tenant dù UI bị sửa.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: Chọn từ registry theo scope, không nạp toàn bộ suite vào context.. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
