---
name: workflow
description: Điều phối JobFind từ ý tưởng, vẽ thêm màn Stitch/Figma đến code và nghiệm thu; thiết lập bộ .agent/.docs/.stitch theo mẫu vibe-coding. Dùng
  cho yêu cầu làm trọn tính năng, bootstrap bộ dự án, /plans, /execute-ui, /execute-backend hoặc tiếp tục dự án.
---


# JobFind · Điều phối dự án

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Xác định phạm vi người dùng giao: ý tưởng, thiết kế, UI tĩnh, tích hợp hay full-stack. Chọn đúng các bước cần làm và tiếp tục đến kết quả đã giao; lưu checkpoint khi ngữ cảnh dài.
2. Nạp .docs/ARCHITECTURE.md, FEATURES_DONE.md, CONTEXT.md và .agent/skill-registry.md nếu đã có. Xác minh source bằng inventory; giữ các thay đổi đang có.
3. Khi thiết lập bộ dự án, dùng scripts/export_vibe_bundle.py để xuất bộ đầy đủ; xem kế hoạch ghi của tools/install.py trước --apply. Xung đột phải được hợp nhất theo nội dung hiện có.
4. Lấy feature ID và screen ID từ catalog, nối role → route → component → adapter → API → datastore. Dùng system-planner cho thay đổi nhiều lớp.
5. Vẽ tiếp theo stitch-design + design-system; dịch thiết kế theo code-ui + react-components; sửa DB/API/integration theo skills tương ứng.
6. Chọn kiểm tra theo rủi ro bằng test-release; sửa lỗi có căn cứ, cập nhật trạng thái và bàn giao phần đã hoàn thành cùng phần còn thiếu.

## Điều kiện nghiệm thu
- Registry giải quyết được mọi skill và mọi tài liệu liên quan.
- Bản thiết kế, patch và test có bằng chứng riêng; checkpoint không đánh dấu code hoàn thành chỉ từ một bản vẽ.

## Đầu ra
- Bộ điều phối trong project hoặc patch tính năng đã giao.
- Chuỗi tài liệu ý tưởng → thiết kế → frontend → backend → API → QA, cập nhật context.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [architecture](references/architecture.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.

- [Route ownership audit](references/route-audit.md) — shared views, billing/catalog, submitted CV IDs và parent guards đã đối chiếu source.


## Bộ trong source
Đọc .agent/skill-registry.md, .docs/INDEX.md và .stitch/backlog.json ở root. Tài liệu đã bootstrap; không cần nạp seed lặp. Exporter có thể xuất resources project sang thư mục mới, không xuất application code. Công cụ kiểm tra ở .agent/scripts.
