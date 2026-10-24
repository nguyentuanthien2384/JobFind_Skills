---
name: responsive-accessibility
description: Kiểm tra/sửa responsive, keyboard, forms, modals, bảng và motion JobFind theo màn Stitch. Dùng khi giao diện mobile tràn/cắt, accessibility,
  focus, labels hoặc trạng thái khó dùng.
---


# JobFind · Responsive và khả năng truy cập

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Chọn screen/viewport reference thật và widths kiểm tra 1280/1440, 768, 390, 360; phân biệt 3 mobile reference với mobile proposal mới.
2. Thiết kế sidebar/filter thành drawer hoặc panel, bảng cuộn trong container hoặc row cards, tránh horizontal overflow toàn trang.
3. Kiểm tra tab order, focus visible, label/errors, icon names, modal focus trap/Escape/restore và live status đúng mức.
4. Giữ touch targets, text zoom, long labels tiếng Việt, empty/error/loading và read order; trạng thái không chỉ dựa vào màu.
5. Tôn trọng reduced-motion, tránh animation gây mất focus hoặc cản submit; giữ drag Kanban có cách thao tác thay thế.
6. Sửa có scope và kiểm tra lại viewport/interaction bị ảnh hưởng; ghi điểm đã thử và điểm chưa có môi trường kiểm tra.

## Điều kiện nghiệm thu
- Không mất CTA/thông tin bắt buộc trên mobile hoặc keyboard.
- Màn đọc được khi zoom text và không tràn do tên công ty/dữ liệu dài.

## Đầu ra
- Patch responsive/a11y và ma trận kiểm tra theo viewport/control.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

Project component mapping ở .docs/ui-mockups/component-map.json/md; xem handoffs cho apply/calendar. Khi chưa bootstrap, nạp component-contracts của code-ui và source để lấy props/state/actions thật; không mặc định source candidates đã khớp reference.
