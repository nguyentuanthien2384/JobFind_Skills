# Ý tưởng · Việc đã lưu và công ty theo dõi

Feature ID: `saved-jobs-follow` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện việc đã lưu và công ty theo dõi theo nhu cầu actor CANDIDATE, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Save/unsave
2. Follow/unfollow
3. Mở job/company

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/service/userService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/followCompanyService.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

## Quy tắc nghiệp vụ
- Social permissions từ session và ownership từ server.
- Toggle state cần rollback nếu API lỗi; không coi fixture favorite là trạng thái thật.
- Job/company không còn public phải xử lý có thông báo phù hợp.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra guest denied với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate click với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra API error rollback với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra deleted target với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra session change với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra empty lists với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/saved-jobs-follow-idea.md → design-briefs/saved-jobs-follow-brief.md → frontend-plans/saved-jobs-follow-plan.md → backend-plans/saved-jobs-follow-plan.md → endpoint-apis/saved-jobs-follow-endpoints.md → qa/saved-jobs-follow-qa.md
