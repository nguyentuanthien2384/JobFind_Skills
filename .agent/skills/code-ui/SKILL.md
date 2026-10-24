---
name: code-ui
description: Code UI JobFind từ Stitch/Figma và screen contract, giữ React JavaScript/CRA cùng component hiện hành. Dùng cho /code-ui, /execute-ui, screen-to-code,
  form, dashboard, trạng thái hoặc sửa bố cục.
---


# JobFind · Code giao diện

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Chọn screen ID và biến thể; đọc ảnh/code reference, screen contract, STYLEGUIDE và component map. Xác minh design live nếu được yêu cầu cập nhật theo live.
2. Dùng mode match-reference cho yêu cầu giống bản Stitch; dùng JobFind-normalized chỉ khi user yêu cầu chuẩn hóa thương hiệu. Giữ tokens của đúng variant.
3. Tái sử dụng shell, component, hook và service hiện hành. Dịch HTML Tailwind reference thành JSX và CSS/SCSS có scope trong CRA.
4. Tạo default/loading/empty/error/forbidden/submitting/success cần thiết, giữ giá trị form và có thông báo có thể truy cập bằng bàn phím.
5. Với UI hoạt động, nối adapter thật cùng integrate-api; mockup chỉ dùng fixture được ghi rõ và không coi button mock là hoàn thành nghiệp vụ.
6. Đối chiếu screenshot đúng viewport, responsive và interactions; ghi mapping frame → route → files → API → QA trong handoff.

## Điều kiện nghiệm thu
- Ảnh reference không bị thay bằng một màn tổng quát khác; nội dung không cắt/tràn.
- Dữ liệu và CTA ứng tuyển/duyệt/mua gói tuân thủ quyền thật của source.

## Đầu ra
- JSX/CSS patch, screen handoff, hình đã render nếu preview có sẵn và kết quả kiểm tra.

## Tài liệu và ví dụ
- [Component contracts](references/component-contracts.md) — apply native pair và calendar source/proposal boundaries.
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [api-contract](references/api-contract.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
- [design-system](references/design-system.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.

Project component mapping ở .docs/ui-mockups/component-map.json/md; xem handoffs cho apply/calendar. Khi chưa bootstrap, nạp component-contracts của code-ui và source để lấy props/state/actions thật; không mặc định source candidates đã khớp reference.
