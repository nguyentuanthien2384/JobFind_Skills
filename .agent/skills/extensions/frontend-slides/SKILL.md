---
name: frontend-slides
description: Tạo demo/slide HTML về JobFind bám source và Stitch. Dùng cho frontend-slides, demo giao diện, pitch dự án hoặc kịch bản thuyết trình; hỗ trợ
  gọi skill presentations khi cần PPTX.
---


# JobFind · Trình bày và demo dự án

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc source inventory, FEATURES_DONE và screen map; chọn nội dung đã có bằng chứng và label proposal.
2. Lập storyboard: vấn đề, actor, luồng, kiến trúc, demo và kết quả kiểm tra; không claim production chưa xác minh.
3. Dùng screenshot thực và dữ liệu mẫu có nhãn; giữ tokens/layout theo Stitch cho demo.
4. Nếu user yêu cầu PPTX/PDF, đọc skill tài liệu đúng định dạng trước tạo; HTML demo dùng assets local và keyboard navigation.
5. Giữ readable typography, fit viewport, reduced-motion và không nhúng source secrets.
6. Render/preview, kiểm tra nội dung/source mapping và bàn giao artifact được lưu phù hợp.

## Điều kiện nghiệm thu
- Mọi số màn/route/test có nguồn, không cộng duplicate prototype.
- Slide giải thích rõ designed/implemented/verified.

## Đầu ra
- Storyboard và demo/slide theo định dạng được giao.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
