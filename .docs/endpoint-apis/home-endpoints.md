# Endpoint contract · Trang chủ và khám phá việc làm

Feature ID: `home` · Actor: PUBLIC

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/get-filter-post | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-list-company | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/search/jobs | modern/search | None | body none; response Record | 200 | companyRequired=False; idempotency=False |

## Body/schema từ source modern
Legacy DTO hoặc query-only: đọc controller/service và schema được dẫn trước tạo payload. Không có payload được bịa từ mockup.

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Homepage dùng dữ liệu công khai, stats trong Stitch là fixture.
- Search điều hướng /job với query được adapter hỗ trợ.
- Không đổi legacy/search mode để khớp bản mẫu.

## Acceptance API
- API danh sách rỗng
- ảnh/logo lỗi
- search input dài
- guest CTA ứng tuyển
- mobile hero/search stacking

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
