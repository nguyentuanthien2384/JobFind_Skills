# Endpoint contract · Báo cáo và audit

Feature ID: `admin-reports-audit` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/admin/reports/overview | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/admin/reports/timeseries | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/admin/reports/funnel | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/admin/audit | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/get-sum-by-year-post | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-sum-by-year-cv | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Body/schema từ source modern
Legacy DTO hoặc query-only: đọc controller/service và schema được dẫn trước tạo payload. Không có payload được bịa từ mockup.

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- Tenant platform reports chỉ ADMIN và permissions đúng.
- Thời gian, totals và filters lấy server/derived dữ liệu thật; chart fixture chỉ design.
- Audit redacts PII/secrets, query có pagination/bounds.

## Acceptance API
- no data range
- report source unavailable
- range timezone
- forbidden company
- large pagination
- audit redaction

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
