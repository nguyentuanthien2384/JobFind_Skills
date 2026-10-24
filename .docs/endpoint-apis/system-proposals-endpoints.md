# Endpoint contract · Màn tổng hợp chưa có đầy đủ source

Feature ID: `system-proposals` · Actor: ADMIN, COMPANY

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
Chưa có endpoint được source chứng minh cho phần tổng hợp đề xuất. Không đặt tên endpoint mới rồi trình bày là đã có.

## Body/schema từ source modern
Legacy DTO hoặc query-only: đọc controller/service và schema được dẫn trước tạo payload. Không có payload được bịa từ mockup.

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- System settings tổng quát chưa có /admin/settings.
- Calendar tổng hợp không đồng nhất với interview-invitation endpoint.
- Recurring subscriptions không đồng nhất mua gói post/CV.
- Lập owner/schema/API/role/route plan trước implementation; UI offline vẫn có thể vẽ tiếp và ghi proposal.

## Acceptance API
- route/API absent
- permission design chưa quyết định
- prototype-only actions
- no live claims
- migration implications

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
