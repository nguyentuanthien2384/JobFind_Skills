# Endpoint contract · Chỉnh sửa hồ sơ doanh nghiệp

Feature ID: `company-profile` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Catalog đang có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/get-detail-company-by-userId | legacy | COMPANY_PRIVATE_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/create-new-company | legacy | COMPANY_CREATE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| PUT /api/update-company | legacy | COMPANY_MANAGE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Body/schema từ source modern
Legacy DTO hoặc query-only: đọc controller/service và schema được dẫn trước tạo payload. Không có payload được bịa từ mockup.

## Các nguyên tắc transport
- Modern publicPath = /api + path; riêng admin thêm /admin. Source of truth operations/schemas/responses; xem api-catalog.json cho DTO đầy đủ.
- Legacy giữ spelling và envelope từng endpoint; đọc handler/service response. Không giả định mọi response đều `.data.data`.
- List/filter/query có bounds; client normalize lỗi validation/auth/permission/transient đúng schema và errCode.
- Permission null trong catalog chưa chứng minh unauthenticated access; internal trust và middleware có ưu tiên.
- Write idempotency/key/transaction/event theo contract thực tế; key giữ nguyên cho cùng thao tác, không retry tự động sau refresh.

## Quy tắc riêng
- EMPLOYER không có company chỉ vào onboarding theo CREATE_COMPANY.
- Pending company navigation khác active S1/CS1.
- Verification/license documents không public theo preview.

## Acceptance API
- owner mismatch
- pending/rejected/ban state
- invalid media/link
- save failure
- missing company
- private document preview

## Nếu thêm contract
Ghi method/path/owner, actor/permission/tenant, params/query/body/headers/schema, status/response/error, pagination/limits, duplicate/concurrency/event, compatibility và tests. Phần mới ghi PROPOSED cho tới khi router/contract/code và kiểm tra có bằng chứng.
