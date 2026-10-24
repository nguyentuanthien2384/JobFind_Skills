---
name: brainstorm
description: Phân tích tính năng và phương án JobFind từ source, screens và nhu cầu người dùng. Dùng cho /brainstorm, ý tưởng kỹ thuật, lựa chọn giải pháp,
  đánh giá tác động hoặc đề xuất tính năng mới trước khi code.
---


# JobFind · Phân tích ý tưởng

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc feature brief gần nhất, screen catalog và source được dẫn; phân biệt chức năng hiện hữu, thiết kế hiện hữu và đề xuất mới.
2. Mô tả actor, vấn đề, kết quả người dùng cần, trigger và điều kiện hoàn thành bằng một luồng cụ thể.
3. So sánh 2–3 phương án trên độ tương thích source, quyền, API, dữ liệu, UX và chi phí thay đổi; đề nghị một phương án với lý do.
4. Giữ việc ứng tuyển và chat tuyển dụng khác luồng AI support; giữ phạm vi tenant khi mô tả tìm ứng viên, gói và pipeline.
5. Viết .docs/ideas/<feature>-idea.md; đưa giả định, quyết định, màn liên quan, route và rủi ro chưa xác minh.
6. Nếu người dùng giao triển khai, chuyển sang plan và thực hiện trong cùng phạm vi đã giao.

## Điều kiện nghiệm thu
- Lập luận chỉ ra file source cụ thể hoặc nhãn giả định.
- Phương án dùng đúng stack và không phát sinh chức năng ngoài yêu cầu.

## Đầu ra
- Idea brief có phương án được chọn, điều kiện nghiệm thu và việc cần khảo sát.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [architecture](references/architecture.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
- [planning](references/planning.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
