---
name: ai-services
description: Phát triển AI CV/matching/screening, soạn nội dung và support assistant JobFind. Dùng cho /ai, provider failure, task polling, outbox/idempotency,
  CV parsing hoặc tool/handoff.
---


# JobFind · AI CV và trợ lý

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc shared AI contracts, job-core task store, worker, ai adapters và readiness; chọn candidate/recruiter/support đúng quyền.
2. Submit task bằng idempotency key ổn định; xử lý 202 accepted và poll task thực tế, cancellation/unmount, timeout và kết quả không hợp lệ.
3. Đọc CV theo quyền, validation file và giới hạn; không đưa secrets hoặc dữ liệu riêng ngoài phạm vi provider đã được phép.
4. Validate structured output theo schema; biểu diễn score và limitations phù hợp, giữ quyết định tuyển dụng thuộc người dùng.
5. Với support, dùng public/private tools đã cho phép, chống lệnh trong retrieved content, giữ citations/handoff và không thay assistant thành chat tuyển dụng.
6. Kiểm tra provider unavailable, task pending/failure/replay, ownership và tool boundary; không tuyên bố AI đã xong từ spinner hoặc fixture.

## Điều kiện nghiệm thu
- Task của người/tenant khác không thể được đọc theo task ID.
- Đầu ra AI không tự gửi thư, đổi stage hay quyết định tuyển dụng.

## Đầu ra
- Task/worker/adapter/UI patch và kiểm tra failure/privacy/readiness.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [ai-services](references/ai-services.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
