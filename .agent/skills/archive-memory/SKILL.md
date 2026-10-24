---
name: archive-memory
description: Archive lịch sử thiết kế/code JobFind và làm gọn context có thể truy hồi. Dùng cho /archive, context quá dài, đóng một mốc hoặc bàn giao lịch
  sử quyết định.
---


# JobFind · Lưu trữ lịch sử

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc context/log/FEATURES_DONE và bằng chứng diff; chọn phần đã đóng cần archive.
2. Lưu nội dung gốc vào .docs/archive/<timestamp>-<feature>.md với metadata source, feature và screen IDs.
3. Tạo index archive, checksum và liên kết từ CONTEXT; giữ quyết định, failure, test, next action đủ truy hồi.
4. Làm gọn context hiện tại sau khi kiểm tra archive còn nguyên và links tồn tại; giữ lịch sử cũ ngoài archive nguyên vẹn.
5. Loại secrets/PII khỏi bản mới và ghi loại thông tin được bỏ; không thay đổi hồ sơ nguồn.
6. Xác minh resume tìm được nguồn thiết kế, route, file, test và bước tiếp theo.

## Điều kiện nghiệm thu
- Archive append-only, không xóa lịch sử để giảm token.
- Context mới có đường truy hồi đến evidence gốc.

## Đầu ra
- Archive, index và context hiện tại gọn nhưng đủ tiếp tục.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
