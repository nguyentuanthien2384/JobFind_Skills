# Ý tưởng · Đăng nhập và social SSO

Feature ID: `auth-login` · Actor: PUBLIC

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện đăng nhập và social sso theo nhu cầu actor PUBLIC, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Đăng nhập password
2. Bắt đầu SSO
3. Mở recovery/signup
4. Quay lại job đã định ứng tuyển

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/login/Login.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/auth/authClient.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/auth/SocialButtons.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/controllers/authController.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-015 | Login - Premium Desktop | 1280 × 1252 | source-mapped |
| JF-016 | Login - Tuyển Dụng VN | 1280 × 1024 | source-mapped |
| JF-017 | Login - Tuyển Dụng VN | 390 × 1045 | source-mapped |

## Quy tắc nghiệp vụ
- Google/GitHub/Auth0 hiển thị theo providers readiness; LinkedIn trong mẫu chỉ là fixture.
- Giữ token_user marker, access token memory, refresh cookie HttpOnly.
- SSO direct và Auth0 connections là luồng riêng; giữ state/nonce/PKCE.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra invalid credentials với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra provider unavailable với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra pending SSO signup với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra callback lỗi/state mismatch với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra session refresh với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra mobile form với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/auth-login-idea.md → design-briefs/auth-login-brief.md → frontend-plans/auth-login-plan.md → backend-plans/auth-login-plan.md → endpoint-apis/auth-login-endpoints.md → qa/auth-login-qa.md
