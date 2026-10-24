# Ý tưởng · Kiểm duyệt tin tuyển dụng

Feature ID: `admin-jobs` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện kiểm duyệt tin tuyển dụng theo nhu cầu actor ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Xem nội dung
2. Duyệt/ban/active
3. Refresh table

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Post/ManagePost.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-011 | Job Moderation - Admin Panel | 1280 × 1024 | source-mapped |

## Quy tắc nghiệp vụ
- Quyền MODERATE_POSTS ở UI và ADMINISTRATION/backend equivalent cần đối chiếu.
- Approved/ban/public state cập nhật server và projection đúng owner.
- Lý do moderation theo source contract, không bịa field ghi được.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra company actor forbidden với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra stale job state với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate review với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra search projection lag với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra validation/error với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/admin-jobs-idea.md → design-briefs/admin-jobs-brief.md → frontend-plans/admin-jobs-plan.md → backend-plans/admin-jobs-plan.md → endpoint-apis/admin-jobs-endpoints.md → qa/admin-jobs-qa.md
