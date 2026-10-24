---
name: shadcn-ui
description: Đánh giá/tích hợp shadcn UI có chủ đích cho JobFind khi được yêu cầu. Dùng cho shadcn-ui, chọn primitive, migration component hoặc so sánh
  với Ant Design/Reactstrap hiện có.
---


# JobFind · Đánh giá component tùy chọn

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc UI stack hiện tại Ant Design/Reactstrap/CSS-SCSS và target component; xác định yêu cầu thực sự cần shadcn.
2. Ưu tiên reuse hiện có; đề xuất adapter/migration hẹp nếu user yêu cầu shadcn, không cài Tailwind/TypeScript hàng loạt do reference HTML.
3. Kiểm tra công cụ/docs chính thức hiện hành khi implementation cần package/version/API mới; ghi tác động build/style.
4. Map component props/states/tokens/keyboard để giữ screen contract.
5. Thực hiện patch đúng scope đã giao và giữ source compatibility; không tự chuyển cả app.
6. Kiểm tra interaction, CSS leakage, CRA build và mobile.

## Điều kiện nghiệm thu
- Dependency mới có lý do gắn với yêu cầu cụ thể.
- Component hiện hành không bị phá hoặc đổi theme toàn cục.

## Đầu ra
- Compatibility decision hoặc component patch theo phạm vi được yêu cầu.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
