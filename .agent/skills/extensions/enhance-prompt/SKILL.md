---
name: enhance-prompt
description: Chuyển yêu cầu UI JobFind thành prompt Stitch/Figma chi tiết có screen, role, tokens, layout và states. Dùng cho enhance-prompt, prompt vẽ
  màn mới, sửa thiết kế hoặc thiếu mô tả UI.
---


# JobFind · Viết prompt thiết kế

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Xác định feature/screen ID, desktop/mobile, role, nhiệm vụ chính và mode thiết kế.
2. Đọc screen contract, exact token observations, references và source gaps; lấy nội dung thật của luồng trong phạm vi.
3. Viết prompt gồm context, DESIGN SYSTEM REQUIRED, PAGE STRUCTURE, interactions, states, responsive và guardrails nghiệp vụ.
4. Dùng label tiếng Việt nhất quán và fixture có nhãn; không lấy email, CV hoặc dữ liệu thật làm ví dụ.
5. Yêu cầu edit màn/variant cụ thể nếu đã có, không tạo duplicate không cần thiết; xác định điểm thay đổi và điểm giữ nguyên theo yêu cầu.
6. Lưu prompt và acceptance trước khi gọi công cụ; chuyển sang stitch-design nếu user đã giao vẽ.

## Điều kiện nghiệm thu
- Prompt đủ chi tiết cho từng section và control, liên hệ đúng route/API.
- Provider, số liệu, lịch và recurring billing không bị mô tả là đã live nếu source chưa có.

## Đầu ra
- Prompt có thể dùng trực tiếp và checklist đánh giá màn kết quả.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
