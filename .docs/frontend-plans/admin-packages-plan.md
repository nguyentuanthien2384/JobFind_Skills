# Frontend plan · Quản lý gói đăng tin và CV

Feature ID: `admin-packages` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/PackagePost/ManagePackagePost.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/PackageCv/ManagePackageCv.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `admin-packages`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Type tabs
2. Package table/cards
3. Create/edit form
4. Active state controls
5. Validation/confirm

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
- Hai catalogs post/CV, model/type/quota/price distinct.
- Không biến UI combined table thành một backend package model duy nhất.
- Admin changes không viết lại entitlement đã mua ngoài policy source.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/get-all-package | legacy | PACKAGE_CATALOG_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/create-package-post | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| PUT /api/update-package-post | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| PUT /api/set-active-package-post | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/get-all-package-cv | legacy | PACKAGE_CATALOG_READ | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| POST /api/create-package-cv | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| PUT /api/update-package-cv | legacy | ADMINISTRATION | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |

## Kiểm tra behavior
- invalid amount/quota
- wrong type
- forbidden company actor
- existing entitlement compatibility
- duplicate submit

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
