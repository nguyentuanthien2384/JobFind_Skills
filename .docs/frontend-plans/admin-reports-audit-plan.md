# Frontend plan · Báo cáo và audit

Feature ID: `admin-reports-audit` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Report/ReportDashboard.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/adminReportService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `admin-reports-audit`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Financial header/date range
2. Revenue metrics/chart
3. Package distribution
4. Transactions table
5. Audit/activity drilldown
6. Export control theo source

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
- Tenant platform reports chỉ ADMIN và permissions đúng.
- Thời gian, totals và filters lấy server/derived dữ liệu thật; chart fixture chỉ design.
- Audit redacts PII/secrets, query có pagination/bounds.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/admin/reports/overview | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/admin/reports/timeseries | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/admin/reports/funnel | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/admin/audit | modern/admin | admin:read | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/get-sum-by-year-post | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-sum-by-year-cv | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Kiểm tra behavior
- no data range
- report source unavailable
- range timezone
- forbidden company
- large pagination
- audit redaction

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
