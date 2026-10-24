# Playbook · Phân tích ý tưởng

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
Slice ví dụ: `home` · Trang chủ và khám phá việc làm. Actor: PUBLIC. Chọn feature ID theo yêu cầu thực tế trong .docs/INDEX.md/feature-catalog; không mặc định dùng slice này cho mọi task. Ví dụ lịch JF-013/014 dùng interviews-offers, apply JF-022/023/024 dùng applications.

| Source path | Kiểm tra |
| --- | --- |
| frontend/src/container/home/home.js | Đọc nội dung và các caller/guard/contract liên quan |
| frontend/src/service/userService.js | Đọc nội dung và các caller/guard/contract liên quan |

Tài liệu full feature: .docs/ideas/home-idea.md, design-briefs/home-brief.md, frontend-plans/home-plan.md, backend-plans/home-plan.md, endpoint-apis/home-endpoints.md, qa/home-qa.md. Bộ đầy đủ nằm trong asset project của workflow và được bootstrap vào repo theo phạm vi user giao.

## Quy trình chi tiết
1. Đọc feature brief gần nhất, screen catalog và source được dẫn; phân biệt chức năng hiện hữu, thiết kế hiện hữu và đề xuất mới.
2. Mô tả actor, vấn đề, kết quả người dùng cần, trigger và điều kiện hoàn thành bằng một luồng cụ thể.
3. So sánh 2–3 phương án trên độ tương thích source, quyền, API, dữ liệu, UX và chi phí thay đổi; đề nghị một phương án với lý do.
4. Giữ việc ứng tuyển và chat tuyển dụng khác luồng AI support; giữ phạm vi tenant khi mô tả tìm ứng viên, gói và pipeline.
5. Viết .docs/ideas/<feature>-idea.md; đưa giả định, quyết định, màn liên quan, route và rủi ro chưa xác minh.
6. Nếu người dùng giao triển khai, chuyển sang plan và thực hiện trong cùng phạm vi đã giao.

## Quy tắc riêng của feature
- Homepage dùng dữ liệu công khai, stats trong Stitch là fixture.
- Search điều hướng /job với query được adapter hỗ trợ.
- Không đổi legacy/search mode để khớp bản mẫu.

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
- Idea brief có phương án được chọn, điều kiện nghiệm thu và việc cần khảo sát.

- Lập luận chỉ ra file source cụ thể hoặc nhãn giả định.
- Phương án dùng đúng stack và không phát sinh chức năng ngoài yêu cầu.

## Handoff để tiếp tục
Feature/screen/task, actor/permission/tenant, selected source/mode, files changed, API/schema/ID mapping, design/code/test statuses, command/results, blocker, next action. Cập nhật context bằng save-context và archive khi cần.

Skills cùng slice: Chọn từ registry theo scope, không nạp toàn bộ suite vào context.. Slash aliases là workflow cho IDE có hỗ trợ, không mặc định là công cụ ChatGPT; dùng tên skill hoặc yêu cầu đọc workflow file.
