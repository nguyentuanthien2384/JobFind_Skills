---
name: frontend-design
description: 'Review và hoàn thiện chất lượng giao diện JobFind theo Stitch: hierarchy, density, typography, spacing, images và consistency. Dùng cho frontend-design,
  taste-design, UI polish hoặc chỉnh thiết kế.'
---


# JobFind · Chất lượng thị giác

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc screen/variant và mode; dùng ảnh gốc làm chuẩn khi cần giống mẫu.
2. Đối chiếu hierarchy, section order, card/table density, alignments, typography và whitespace với ảnh/HTML.
3. Giữ assets/aspect ratio, icon system và palette của variant; mọi đổi sáng tạo phải nằm trong phạm vi yêu cầu.
4. Gắn CTA và trạng thái với nhu cầu actor; không dùng số liệu mẫu như kết quả live.
5. Kiểm tra labels tiếng Việt, dài/ngắn, responsive và empty/error; giữ style CSS scope.
6. Ghi before/after bằng hình khi có preview và handoff các tokens/component đã đổi.

## Điều kiện nghiệm thu
- Polish không loại bỏ section/form/state để làm trang đẹp hơn.
- Đúng tỷ lệ/layout của screen được chọn.

## Đầu ra
- Design/polish patch và visual QA theo screen.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
