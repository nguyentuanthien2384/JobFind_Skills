---
description: JobFind /save — .docs/CONTEXT.md + checkpoint/history
---

# /save

## Đầu vào
Yêu cầu hiện tại, source root, feature/screen/variant nếu có; đọc AGENTS.md, .docs/CONTEXT.md và registry. Skills: save-context (xem mapping trong registry).

## Thực hiện
1. Read diff, decisions, completed evidence and pending work.
2. Prepare sanitized notes and archive prior context before replacement.
3. Update feature status and next action without inventing results.

## Đầu ra và acceptance
.docs/CONTEXT.md + checkpoint/history. Dùng source hiện hành và contract thật; giữ các thay đổi người dùng. Tách design/code/test status và ghi evidence/lỗi/gap/next task. Khi user giao toàn bộ tính năng, tiếp tục các bước cần thiết đến kết quả đó; không buộc xác nhận từng bước thường lệ.

## Khi bị chặn
Hoàn thành phần độc lập; giữ draft/spec/checkpoint. Nêu đúng công cụ, source hay điều kiện thiếu; không bịa link, endpoint hoặc kết quả kiểm thử.
