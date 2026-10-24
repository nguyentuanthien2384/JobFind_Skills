---
name: react-components
description: Tách màn Stitch JobFind thành React JavaScript components, hooks và CSS/SCSS tương thích CRA. Dùng cho react-components, chuyển HTML thành
  JSX, refactor page hoặc tạo component tái sử dụng.
---


# JobFind · Stitch sang React components

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc component map và tìm component/hook hiện có; nhận diện shell, blocks, repeated rows và controls của màn.
2. Định nghĩa props/event callbacks/data states bằng JSDoc khi hữu ích; giữ conventions JavaScript và tên file của source.
3. Tách logic session/fetch/form vào hook/container phù hợp, dùng service adapter có sẵn. Component trình bày không tự biết tenant hay endpoint.
4. Chuyển class/for/style/event sang JSX hợp lệ; scoped CSS variables cho tokens của đúng screen. Không chèn Tailwind CDN hoặc generated inline scripts.
5. Giữ semantic form, keys ổn định, button types, focus/modal semantics và responsive; fixture chỉ trong mock/design path.
6. Wiring vào router/layout hiện hành, kiểm tra behavior và screenshot; tránh refactor toàn app nếu chỉ sửa một screen.

## Điều kiện nghiệm thu
- Component chạy trong CRA hiện có, không yêu cầu Vite/TypeScript mới.
- Style không làm thay đổi màn ngoài feature do selector toàn cục.

## Đầu ra
- Component/container/hook/CSS patch cùng props/state handoff.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

Project component mapping ở .docs/ui-mockups/component-map.json/md; xem handoffs cho apply/calendar. Khi chưa bootstrap, nạp component-contracts của code-ui và source để lấy props/state/actions thật; không mặc định source candidates đã khớp reference.
