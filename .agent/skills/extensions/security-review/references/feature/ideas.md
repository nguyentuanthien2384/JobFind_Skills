# Ý tưởng · Khôi phục và bảo mật tài khoản

Feature ID: `auth-recovery-security` · Actor: PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện khôi phục và bảo mật tài khoản theo nhu cầu actor PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Yêu cầu/verify OTP
2. Đổi mật khẩu
3. Thu hồi phiên
4. Unlink identity có điều kiện

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/auth/SecuritySettings.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/auth/authClient.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/controllers/authController.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/authSessionService.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

## Quy tắc nghiệp vụ
- OTP/secret không lưu vào docs/logs.
- Recovery không tiết lộ account không cần thiết; giữ rate limits/server validation.
- Session revoke/link/unlink thuộc actor hiện tại và cookie-origin checks.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra OTP sai/hết hạn/thử nhiều với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra session khác owner với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra provider cuối cùng với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra many tabs với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra temporary IdP failure với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/auth-recovery-security-idea.md → design-briefs/auth-recovery-security-brief.md → frontend-plans/auth-recovery-security-plan.md → backend-plans/auth-recovery-security-plan.md → endpoint-apis/auth-recovery-security-endpoints.md → qa/auth-recovery-security-qa.md
