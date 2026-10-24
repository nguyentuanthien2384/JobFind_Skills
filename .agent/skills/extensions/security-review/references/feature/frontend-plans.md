# Frontend plan · Khôi phục và bảo mật tài khoản

Feature ID: `auth-recovery-security` · Actor: PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/auth/SecuritySettings.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/auth/authClient.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/controllers/authController.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/authSessionService.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `auth-recovery-security`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Recovery phone/OTP/password steps theo source
2. Security summary
3. Session list với revoke action
4. Linked provider list
5. Security event history

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
- OTP/secret không lưu vào docs/logs.
- Recovery không tiết lộ account không cần thiết; giữ rate limits/server validation.
- Session revoke/link/unlink thuộc actor hiện tại và cookie-origin checks.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/request-reset-password-otp | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/changepasswordbyPhone | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/auth/security | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/auth/security/events | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| DELETE /api/auth/sessions/:familyId | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/auth/identities/:identityId/unlink | legacy | ACCOUNT_SELF | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Kiểm tra behavior
- OTP sai/hết hạn/thử nhiều
- session khác owner
- provider cuối cùng
- many tabs
- temporary IdP failure

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
