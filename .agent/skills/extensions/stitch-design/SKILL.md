---
name: stitch-design
description: Vẽ tiếp hoặc sửa giao diện JobFind trong dự án Stitch đã tạo, theo 37 màn và design contract. Dùng cho tạo screen, edit screen, xuất HTML/ảnh,
  Stitch handoff hoặc bản thiết kế giống mẫu.
---


# JobFind · Vẽ và sửa màn Stitch

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc .stitch/metadata.json, DESIGN.md, catalog và prompt của screen. Dùng đúng project JobFind đã có và kiểm tra live title/URL nếu truy cập được.
2. Discover connector/WebMCP/browser thật; chỉ gọi công cụ được quảng bá. Không giả định có StitchMCP hay dùng schema từ mẫu như tool đang cài.
3. Nếu cần xác thực, dùng cơ chế auth an toàn của công cụ. Nếu site bị chặn, giữ prompt/spec và ghi blocker; không bịa project/screen ID hoặc link.
4. Giữ screen đã có và ưu tiên edit/variant. Với màn mới, xác định source/proposal, viewport và primary CTA trước tạo.
5. Kiểm tra hình/HTML sau tạo, title, dimensions, content, states và tokens. Cập nhật catalog, metadata, assets và prompt log chỉ từ kết quả có thật.
6. Bàn giao URL trực tiếp đã mở xác minh và hình kết quả khi có thay đổi website; dùng code-ui để thực hiện code nếu user yêu cầu.

## Điều kiện nghiệm thu
- 37 màn gốc vẫn được giữ; màn bổ sung không trùng screen key.
- URL/screen ID do dịch vụ trả về; offline proposal được ghi rõ là chưa xuất lên Stitch.

## Đầu ra
- Màn Stitch thật hoặc prompt/spec offline có blocker rõ ràng, metadata và handoff.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

Project component mapping ở .docs/ui-mockups/component-map.json/md; xem handoffs cho apply/calendar. Khi chưa bootstrap, nạp component-contracts của code-ui và source để lấy props/state/actions thật; không mặc định source candidates đã khớp reference.
