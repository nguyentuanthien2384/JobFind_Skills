# Playbook · Luồng tuyển dụng

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
Slice ví dụ: `pipeline` · Kanban, đánh giá và AI tuyển dụng. Actor: COMPANY, EMPLOYER. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/system/Cv/KanbanBoard.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/service/applicationService.js | Đọc nội dung và các caller/guard/contract liên quan |
| microservices/application-service/src/libs/db.js | Đọc nội dung và các caller/guard/contract liên quan |
| microservices/application-service/src/controllers/applicationController.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/pipeline-idea.md, design-briefs/pipeline-brief.md, frontend-plans/pipeline-plan.md, backend-plans/pipeline-plan.md, endpoint-apis/pipeline-endpoints.md, qa/pipeline-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc CV legacy, application service và frontend adapter; xác định company, job, application.id và legacy_cv_id trước hành động.
2. Giữ 6 stage keys: moi_ung_tuyen, dang_xem_xet, phong_van, de_nghi, nhan_viec, tu_choi; lấy labels/allowed actions từ source.
3. Kiểm tra ứng tuyển duplicate, prepared CV/PDF validity, quyền CANDIDATE_APPLY và job state; giữ khả năng tiếp tục sau login.
4. Đổi stage, rating, notes và quyết định theo contract; optimistic update phải rollback nếu lỗi và không lưu quyết định chỉ ở trình duyệt.
5. Phỏng vấn/offer dùng ngày giờ, Asia/Ho_Chi_Minh, địa điểm/meeting URL, người liên hệ, deadline và snapshot như validator hiện hành.
6. Tạo outbox cùng transaction; phân biệt requested/queued/delivered với email thực sự đã gửi. Kiểm tra owner và replay sự kiện.

## Quy tắc riêng của feature
- Dùng 6 stage keys source thay vì labels tiếng Anh mẫu.
- application.id khác legacy_cv_id; mỗi action dùng đúng ID.
- Stage history/notes/rating/outbox cần tenant và transaction; AI chỉ hỗ trợ review.

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
- Patch luồng tuyển dụng và bằng chứng kiểm tra theo các actor.

- Không dùng ID CV MySQL để gọi application endpoint PostgreSQL.
- Ứng tuyển hoặc gửi quyết định lặp không tạo tác động không mong muốn.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: code-db, microservices, backend-patterns. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
