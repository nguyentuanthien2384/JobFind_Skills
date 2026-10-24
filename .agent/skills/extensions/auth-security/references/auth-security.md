# Xác thực và phân quyền JobFind

## File phải đọc theo yêu cầu
Frontend: `frontend/src/auth/authClient.js`, `SocialButtons.js`, `SecuritySettings.js`, `RouteGuard.js`, `accessControl.js`; `frontend/src/axios.js`, `service/apiError.js`.
Backend: `backend/src/controllers/authController.js`, `services/authSessionService.js`, `oidcService.js`, `socialProviders.js`, `socialRegistrationService.js`, `accountSecurityService.js`, `authAuditService.js`; `middlewares/jwtVerify.js`, `authorize.js`; `utils/authorization.js`.
Gateway: `microservices/api-gateway/src/app.js`, tìm `authProxy`, `optionalAuth`, `requireTrustedGateway` trong gateway/shared. Tài liệu: `docs/AUTHENTICATION_SSO_INTEGRATION.md`, `docs/AUTHORIZATION.md`.

## Các bất biến
1. Access JWT ở memory; `token_user` trong localStorage là marker phiên mới; refresh token trong HttpOnly cookie, DB chỉ lưu hash. Không ghi token/secret vào log, URL, localStorage.
2. Refresh rotation/reuse detection và thu hồi session family. Giữ xử lý đồng thời refresh/logout/password change, hạn tuyệt đối rememberMe 14 ngày hoặc 8 giờ theo code; kiểm tra lại defaults nếu source đổi.
3. Không tự phát lại POST/PUT/PATCH/DELETE sau gia hạn. Không dùng lỗi mạng làm bằng chứng logout. Chặn stale response của tài khoản cũ ghi đè tài khoản mới.
4. Identity OIDC `(issuer, sub)`; không auto-link qua email. Xác minh state, nonce, PKCE, issuer/audience/signature/expiry; callback binding cookie + phiên bắt đầu liên kết. GitHub dùng OAuth và numeric user ID, không giả làm OIDC ID token.
5. Đăng ký công khai chỉ CANDIDATE/EMPLOYER; không tin role/companyId từ payload hay IdP. Password 8 ký tự Unicode và tối đa 72 byte UTF-8 theo policy; không siết khiến tài khoản cũ mất login ngoài yêu cầu.
6. Backend reload user/company. Frontend guard chỉ là UX. Gateway xóa header định danh giả, chặn internal paths, mỗi service kiểm tra trusted gateway + permission + ownership.

## Ma trận vai trò (đọc source cho quyền endpoint)
| Vai trò/trạng thái | Chức năng chính | Ràng buộc |
|---|---|---|
| CANDIDATE | Hồ sơ, ứng tuyển, lưu tin, theo dõi, chat tuyển dụng, CV/AI theo flag | Dữ liệu của chính mình; không notes nội bộ |
| COMPANY đã duyệt/hoạt động | Tin, ứng viên, team, hồ sơ công ty, mua gói/lịch sử | Tenant mình; `S1` + `CS1` |
| EMPLOYER có công ty đã duyệt | Tin, ứng viên, chat | Không tự nhận quyền team/mua gói của COMPANY |
| EMPLOYER chưa có công ty | Tạo công ty, self profile/support | Không làm nghiệp vụ công ty trước khi đủ điều kiện |
| COMPANY/EMPLOYER pending/banned | Quyền hạn chế theo `getUserPermissions` | Không suy ra mọi role company đều có quyền |
| ADMIN | Quản trị toàn nền tảng theo ma trận | Không ứng tuyển bằng tài khoản admin; các bypass phải có trong source |

## Google/GitHub/Auth0
`providerSettings` có google/github/auth0. Prefix lần lượt `OIDC_GOOGLE`, `OAUTH_GITHUB`, `OIDC_AUTH0`. Tên env: `_ENABLED`, `_CLIENT_ID`, `_CLIENT_SECRET`, `_REDIRECT_URI`; OIDC thêm `_ISSUER`. Chỉ đọc `.env.example` để xác định tên; không hiển thị giá trị `.env`.
Callback chính xác `/api/auth/sso/<provider>/callback` qua gateway origin. Auth0 issuer HTTPS với dấu `/` cuối. Không đưa secret `REACT_APP_*`. UI chỉ bật provider khi `/api/auth/providers` cho phép.
Đăng nhập Google/GitHub trực tiếp khác với social connections trong Auth0 Universal Login. Khi cấu hình qua Auth0, kiểm tra tài liệu Auth0 chính thức hiện hành và tenant/application được chọn; đừng khẳng định source có tham số `connection` nếu chưa đọc `oidcService`.
Chuẩn bị cấu hình và test account trước thay đổi IdP; xác thực thật cần cấu hình hợp lệ. Mock/OIDC local pass không chứng minh provider production hoạt động.

## Ca nghiệm thu bắt buộc khi sửa auth
Login email/phone; registration concurrent/rollback; provider disabled/cancel/error; state/code replay; wrong issuer/audience/nonce; same email không tự link; account swap/link binding; refresh concurrency; logout và revoked socket; tenant pending/banned; role injection; no token leakage. Đọc script integration vì tạo database test riêng; không dùng dữ liệu thật làm fixture.
