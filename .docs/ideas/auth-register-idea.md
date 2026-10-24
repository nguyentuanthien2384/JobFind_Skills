# Ý tưởng · Chọn vai trò và đăng ký

Feature ID: `auth-register` · Actor: PUBLIC

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện chọn vai trò và đăng ký theo nhu cầu actor PUBLIC, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Chọn role
2. Tiếp tục/back bước
3. Submit signup
4. Hoàn tất SSO onboarding

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/login/Register.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/auth/passwordPolicy.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/controllers/userController.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-019 | Đăng ký - Chọn vai trò | 1280 × 1267 | source-mapped |
| JF-020 | Đăng Ký - Tuyển Dụng VN | 390 × 1348 | source-mapped |
| JF-028 | Registration - Premium Desktop | 1280 × 1409 | source-mapped |

## Quy tắc nghiệp vụ
- Signup chọn CANDIDATE hoặc EMPLOYER; không cho user tự đăng ký ADMIN/COMPANY.
- Giữ form 2 bước hiện có và validation server.
- SSO profile chưa hoàn tất phải vào onboarding đúng, không tự gộp account theo email.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra duplicate identity/contact với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra password policy với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra invalid role payload với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra input giữ khi lỗi với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra SSO pending với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra mobile signup với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/auth-register-idea.md → design-briefs/auth-register-brief.md → frontend-plans/auth-register-plan.md → backend-plans/auth-register-plan.md → endpoint-apis/auth-register-endpoints.md → qa/auth-register-qa.md
