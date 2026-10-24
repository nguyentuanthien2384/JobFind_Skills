# Frontend plan · Đăng nhập và social SSO

Feature ID: `auth-login` · Actor: PUBLIC

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/login/Login.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/auth/authClient.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/auth/SocialButtons.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/controllers/authController.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `auth-login`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Premium hoặc regular reference variant
2. Brand/visual panel theo đúng ảnh
3. Email/password với labels/errors
4. Forgot password
5. Provider buttons có unavailable state
6. Signup link và apply-intent redirect

## State/data ownership
- Session/actor lấy từ auth context/source guards; tenant từ server authorization.
- Server lists/tasks qua adapter/hook, UI controls/drafts ở component/hook phù hợp; URL state khi feature có filters/history.
- Dữ liệu schema và DTO đọc endpoint contract; interceptor đã trả response.data và có thể resolve error object.

## Task triển khai
1. Đối chiếu reference và source, chọn variant/mode; ghi khoảng cách cần sửa.
2. Reuse shell/components và tách blocks có props/event callbacks; scoped CSS/SCSS theo tokens reference.
3. Nối actions qua service/hook hiện có, giữ flags và ID namespace.
4. Bổ sung đầy đủ states và validation; khóa submit lặp, giữ draft và rollback optimistic update.
5. Giải quyết responsive/keyboard/PDF/media phù hợp với feature.
6. Chạy focused test/lint/build phù hợp; so screenshot/interaction và cập nhật QA/context.

## Quy tắc không thể bỏ qua
- Google/GitHub/Auth0 hiển thị theo providers readiness; LinkedIn trong mẫu chỉ là fixture.
- Giữ token_user marker, access token memory, refresh cookie HttpOnly.
- SSO direct và Auth0 connections là luồng riêng; giữ state/nonce/PKCE.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/auth/login | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/auth/providers | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/auth/sso/:provider/start | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/auth/refresh | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Kiểm tra behavior
- invalid credentials
- provider unavailable
- pending SSO signup
- callback lỗi/state mismatch
- session refresh
- mobile form

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
