# Frontend plan · Màn tổng hợp chưa có đầy đủ source

Feature ID: `system-proposals` · Actor: ADMIN, COMPANY

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/HomeAdmin.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `system-proposals`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. System settings sections theo JF-004
2. Calendar/agenda theo JF-013/014
3. Recurring plans theo JF-003
4. Unavailable/proposal UI state

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
- System settings tổng quát chưa có /admin/settings.
- Calendar tổng hợp không đồng nhất với interview-invitation endpoint.
- Recurring subscriptions không đồng nhất mua gói post/CV.
- Lập owner/schema/API/role/route plan trước implementation; UI offline vẫn có thể vẽ tiếp và ghi proposal.

## API mapping
API cho phần proposal chưa được định nghĩa đầy đủ; lập backend/endpoint plan trước nối dữ liệu.

## Kiểm tra behavior
- route/API absent
- permission design chưa quyết định
- prototype-only actions
- no live claims
- migration implications

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
