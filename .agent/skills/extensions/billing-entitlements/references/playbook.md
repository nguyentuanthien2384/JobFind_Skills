# Playbook · Gói dịch vụ và quota

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
Slice ví dụ: `billing-packages` · Mua gói và lịch sử giao dịch. Actor: COMPANY, ADMIN. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/system/Post/BuyPost.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/container/system/PackageCv/BuyCv.js | Đọc nội dung và các caller/guard/contract liên quan |
| backend/src/services/packageCvService.js | Đọc nội dung và các caller/guard/contract liên quan |
| backend/src/routes/web.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/billing-packages-idea.md, design-briefs/billing-packages-brief.md, frontend-plans/billing-packages-plan.md, backend-plans/billing-packages-plan.md, endpoint-apis/billing-packages-endpoints.md, qa/billing-packages-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc packageService/packageCvService, BuyPost/BuyCv, entitlement và callbacks; tách post packages và CV packages.
2. Kiểm tra user/company/permission và package active state; server quyết định giá/quota/entitlement.
3. Luồng payment pending/success/cancel/failure dùng xác minh server và idempotency; return URL không là bằng chứng thanh toán.
4. Quota đăng/reup và unlock CV chống double consume khi request/event lặp; kiểm tra transaction và event.
5. UI JF-003/026 dùng khả năng source; recurring subscription/auto-renew/card-on-file là proposal chưa có đầy đủ.
6. Kiểm tra quota 0/hết hạn, payment callback lặp, canceled và cross-tenant; không thực hiện giao dịch thật chỉ để QA.

## Quy tắc riêng của feature
- Post/CV packages và histories là dữ liệu tách biệt.
- Payment success cần xác minh server và idempotency callback; return URL chưa đủ.
- Recurring/auto-renew trong JF-003 chưa có đầy đủ route/contract; ghi proposal.

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
- Package/quota/payment patch hoặc plan proposal có dependency rõ.

- Không cấp entitlement từ thông tin amount/status trên client.
- Mua gói có sẵn không được gọi là recurring billing đã implement.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: Chọn từ registry theo scope, không nạp toàn bộ suite vào context.. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
