# Frontend plan · Kết quả tìm việc và bộ lọc

Feature ID: `job-search` · Actor: PUBLIC, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/JobPage/JobPage.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/aiSearchService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `job-search`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Header
2. Title/result count và sort
3. Sidebar filter hoặc mobile filter drawer
4. Job cards/list với salary/company/location
5. Pagination và empty/error state

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
- Filters dùng codes/schemas source và pagination có bounds.
- URL lưu filter, back/forward phải hồi phục kết quả.
- Response trễ không ghi đè query mới; debounce theo hook/lodash đã có.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/get-filter-post | legacy | Read declaration and parent middleware | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/search/jobs | modern/search | None | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/search/facets | modern/search | None | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/search/suggest | modern/search | None | body none; response Record | 200 | companyRequired=False; idempotency=False |

## Kiểm tra behavior
- zero results
- network timeout/object error
- đổi query nhanh
- page ngoài range
- back/forward
- mode legacy/search

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
