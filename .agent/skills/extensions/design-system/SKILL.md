---
name: design-system
description: Trích và duy trì DESIGN.md, tokens và component states JobFind từ bộ Stitch 37 màn. Dùng cho design-md, foundations, màu/font/layout, chuẩn
  hóa hoặc vẽ thêm màn đồng nhất.
---


# JobFind · Design system từ mẫu

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc .stitch/DESIGN.md và token observations của đúng screen; inspect ảnh + HTML reference. Canvas và kích thước PNG là hai số khác nhau.
2. Giữ mode match-reference khi user yêu cầu y hệt; trích palette/font/radius thật theo variant. Khi yêu cầu JobFind-normalized, ghi rõ quyết định chuyển brand.
3. Đặt semantic tokens cho surface/text/action/status, bảo toàn token source và đánh dấu các giá trị bổ sung là proposal.
4. Lập shell và component catalog với states, spacing, typography và responsive behavior; giữ tương thích CSS/SCSS hiện hành.
5. Cập nhật DESIGN.md, STYLEGUIDE, JSON/CSS tokens và component matrix, giữ trace screen → token.
6. Khi tạo variables/components trong Figma, đọc skills Figma tương ứng và dùng công cụ có thật; kiểm tra bindings/variants trực tiếp.

## Điều kiện nghiệm thu
- Token có nguồn hoặc nhãn proposal; không đổi mọi variant sang một palette khi cần khớp mẫu.
- Các states có nhãn và contrast có thể kiểm tra, không chỉ phân biệt bằng màu.

## Đầu ra
- DESIGN.md, token provenance, component/variant matrix và design handoff.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
