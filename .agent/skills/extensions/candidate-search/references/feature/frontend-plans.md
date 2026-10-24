# Frontend plan · Kho ứng viên và mở CV

Feature ID: `candidate-search` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Cv/FilterCv.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/cvService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/candidateSearchService.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `candidate-search`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Keyword/job selection và advanced filters
2. Quota/unlock status
3. Candidate cards/table
4. Detail/PDF drawer
5. Talent pool action
6. Paging/empty/error

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
- Giữ route /admin/list-candiate và endpoint spelling đang dùng.
- Không lộ private PII trước unlock; server kiểm tra entitlement.
- Candidate/profile/CV/application ID cần mapping đúng khi mở detail.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| GET /api/fillter-cv-by-selection | legacy | CANDIDATE_SEARCH | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/candidate-search-jobs | legacy | CANDIDATE_SEARCH | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/check-see-candiate | legacy | CANDIDATE_SEARCH | Read controller/service; do not infer DTO from screen | Read response source | Read service ownership/limits |
| GET /api/talent-pool | modern/applications | talent-pool:manage | body none; response Record | 200 | companyRequired=True; idempotency=False |
| POST /api/talent-pool | modern/applications | talent-pool:manage | body TalentSave; response Record | 201 | companyRequired=True; idempotency=False |

## Kiểm tra behavior
- no quota/expired package
- duplicate unlock
- cross-tenant
- stale filters
- no candidates
- private PDF forbidden

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
