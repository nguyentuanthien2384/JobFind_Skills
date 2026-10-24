# Playbook · Tìm và mở hồ sơ ứng viên

## Mục lục
1. Input/evidence
2. Feature/source
3. Quy trình
4. Decision và failure
5. Output/acceptance
6. Handoff

## Input và evidence
- Yêu cầu hiện tại, actor, feature/screen/variant và source root có 3 package frontend/backend/microservices.
- Kiểm tra AGENTS, changed files, .docs/CONTEXT, FEATURES_DONE và source mới trước thay đổi.
- Khi thiếu source có thể lập spec với assumptions; không tạo patch vào một cấu trúc tự đoán.

## Feature và source
Slice ví dụ: `candidate-search` · Kho ứng viên và mở CV. Actor: COMPANY, EMPLOYER. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/system/Cv/FilterCv.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/service/cvService.js | Đọc nội dung và các caller/guard/contract liên quan |
| backend/src/services/candidateSearchService.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/candidate-search-idea.md, design-briefs/candidate-search-brief.md, frontend-plans/candidate-search-plan.md, backend-plans/candidate-search-plan.md, endpoint-apis/candidate-search-endpoints.md, qa/candidate-search-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc FilterCv, candidateSearchService/cv adapters, permissions và package CV ownership.
2. Giữ spelling list-candiate/fillter legacy route và source filters; map job selection, catalogs và pagination theo contract.
3. Hiển thị giới hạn thông tin trước unlock theo server response, không gửi PII rồi ẩn bằng CSS.
4. Unlock/seen/entitlement dùng transaction và idempotency cần thiết; UI cập nhật sau server xác nhận.
5. Map candidate/legacy CV/application/prepared CV IDs đúng khi mở detail hoặc đưa talent pool.
6. Kiểm tra zero/quota expired, cross-tenant, stale paging, CV unavailable và duplicate unlock.

## Quy tắc riêng của feature
- Giữ route /admin/list-candiate và endpoint spelling đang dùng.
- Không lộ private PII trước unlock; server kiểm tra entitlement.
- Candidate/profile/CV/application ID cần mapping đúng khi mở detail.

## Decision và failure handling
| Tình huống | Xử lý |
| --- | --- |
| source khác snapshot | Đọc file hiện hành, ghi drift, cập nhật plan/catalog; không giữ route/DTO cũ bằng suy đoán |
| ảnh có control chưa có API | Ghi partial/proposal; implement phần đã có và lập owner/contract plan cho phần thiếu |
| 401/403 hoặc company chưa ready | Xử lý session/permission/readiness thật và giữ draft; server vẫn cần enforce |
| write timeout hoặc refresh | Không tự replay; giữ idempotency theo contract và cung cấp retry có chủ đích |
| tool Stitch/Figma không có hoặc bị chặn | Giữ prompt/spec/assets local; nêu phần chưa đưa lên dịch vụ và không bịa link |
| giao diện giống mẫu nhưng mock data | Ghi designed/UI-mock; nối dữ liệu và kiểm tra thật trước implemented/verified |
| test cần DB/IdP/provider chưa có | Chạy kiểm tra độc lập được phép; ghi skipped với điều kiện thiếu |

## Output và acceptance
- Candidate search/unlock/talent patch và privacy/quota/state checks.

- CV/PDF private không thể mở bằng sửa query hoặc đoán ID.
- Search không reset filter khi page đổi hoặc giữ page ngoài range.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: Chọn từ registry theo scope, không nạp toàn bộ suite vào context.. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
