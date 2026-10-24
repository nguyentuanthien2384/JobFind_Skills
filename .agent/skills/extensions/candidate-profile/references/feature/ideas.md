# Ý tưởng · Hồ sơ cá nhân ứng viên

Feature ID: `candidate-profile` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện hồ sơ cá nhân ứng viên theo nhu cầu actor CANDIDATE, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Edit/save profile
2. Đổi avatar/CV theo cơ chế source
3. Mở CV workspace
4. Cập nhật preferences

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/Candidate/CandidateInfo.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/aiSearchService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/controllers/userController.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/userService.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-009 | Hồ Sơ Của Tôi - Tuyển Dụng VN | 1280 × 1749 | source-mapped |

## Quy tắc nghiệp vụ
- Legacy user profile và identity profile cần adapter đúng mode.
- Completion score nếu chưa có backend phải được ghi là derived UI/fixture.
- Chỉ cập nhật fields whitelist và ownership từ session.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra missing optional fields với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra invalid phone/link với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra save error preserves draft với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra actor khác với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra long Vietnamese name với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra mobile với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/candidate-profile-idea.md → design-briefs/candidate-profile-brief.md → frontend-plans/candidate-profile-plan.md → backend-plans/candidate-profile-plan.md → endpoint-apis/candidate-profile-endpoints.md → qa/candidate-profile-qa.md
