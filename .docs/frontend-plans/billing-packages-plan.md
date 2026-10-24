# Frontend plan · Mua gói và lịch sử giao dịch

Feature ID: `billing-packages` · Actor: COMPANY, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Post/BuyPost.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/PackageCv/BuyCv.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/packageCvService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `billing-packages`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Package catalog và active entitlement
2. Post/CV quota summaries
3. Payment pending/success/cancel/failure
4. Transaction histories
5. Recurring section chỉ nếu triển khai proposal

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
- Post/CV packages và histories là dữ liệu tách biệt.
- Payment success cần xác minh server và idempotency callback; return URL chưa đủ.
- Recurring/auto-renew trong JF-003 chưa có đầy đủ route/contract; ghi proposal.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/get-payment-link | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/payment-success | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-payment-cv-link | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/payment-cv-success | legacy | PACKAGE_PURCHASE | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-history-trade-post | legacy | PACKAGE_HISTORY_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-history-trade-cv | legacy | PACKAGE_HISTORY_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Kiểm tra behavior
- duplicate payment callback
- cancel/error
- inactive package
- price tampering
- quota expired
- recurring unsupported

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
