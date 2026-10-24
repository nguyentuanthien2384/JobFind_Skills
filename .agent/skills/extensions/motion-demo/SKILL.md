---
name: motion-demo
description: Thiết kế motion và video/demo giao diện JobFind theo Stitch, dùng Remotion khi được yêu cầu và có môi trường phù hợp. Dùng cho remotion, animation,
  video walkthrough hoặc chuyển cảnh demo.
---


# JobFind · Motion và video demo

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Xác định output là motion production, prototype hay video; chọn screens thật và actor flow.
2. Đọc screen contract/tokens và storyboard; dùng fixture/screenshot đã có quyền và label.
3. Giữ motion giúp hiểu state transition, loading và navigation; tôn trọng reduced-motion cho app.
4. Nếu cần Remotion, kiểm tra dependency/docs hiện hành và dùng workspace demo tách khỏi app CRA; không coi package đã cài.
5. Đặt duration/fps/assets/caption rõ, giữ tiếng Việt và che PII/secrets.
6. Render/preview output cần thiết, đối chiếu flow và bàn giao theo đúng định dạng đã tạo.

## Điều kiện nghiệm thu
- Video mock không được trình bày là runtime nghiệp vụ đã chạy.
- Motion không cản keyboard/focus hoặc CTA quan trọng.

## Đầu ra
- Motion spec, storyboard hoặc demo/video được giao và được kiểm tra.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
