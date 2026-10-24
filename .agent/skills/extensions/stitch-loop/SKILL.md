---
name: stitch-loop
description: Tiếp tục thiết kế và code JobFind theo backlog, baton và screen ledger của Stitch. Dùng cho stitch-loop, vẽ thêm toàn bộ nhóm màn, tiếp tục
  screen còn thiếu hoặc design-to-code nhiều bước.
---


# JobFind · Vẽ và code theo backlog

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc .stitch/SITE.md, next-prompt.md và backlog.json; xác minh trạng thái và source/design drift trước chọn việc.
2. Chọn task ready trong phạm vi user giao: dependency, actor, screen key và mode. Dùng step DESIGN/IMPLEMENT/INTEGRATE/VERIFY rõ ràng.
3. Nâng prompt bằng enhance-prompt, vẽ bằng stitch-design hoặc figma-handoff; không tạo màn đã tồn tại vì ledger cũ.
4. Code qua react-components/code-ui và integrate-api khi có nhiệm vụ code; giữ kế hoạch backend với proposal cần route/API mới.
5. Nghiệm thu task theo acceptance riêng, ghi evidence và cập nhật backlog/baton nguyên tử. Không chuyển task thành done vì tool đã được gọi.
6. Tiếp tục task tiếp theo đã được user giao; lưu checkpoint khi cần hoặc nêu blocker thực tế. Không tự mở rộng thêm screens vô hạn.

## Điều kiện nghiệm thu
- Baton có feature/screen/task/next action và dependency rõ.
- Trạng thái designed, implemented và verified được lưu riêng.

## Đầu ra
- Screens/patch theo backlog, ledger cập nhật và next-prompt có thể tiếp tục.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

Project component mapping ở .docs/ui-mockups/component-map.json/md; xem handoffs cho apply/calendar. Khi chưa bootstrap, nạp component-contracts của code-ui và source để lấy props/state/actions thật; không mặc định source candidates đã khớp reference.
