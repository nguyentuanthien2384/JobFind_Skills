---
description: JobFind /archive — .docs/archive/<timestamp>/ + index
---

# /archive

## Đầu vào
Yêu cầu hiện tại, source root, feature/screen/variant nếu có; đọc AGENTS.md, .docs/CONTEXT.md và registry. Skills: archive-memory (xem mapping trong registry).

## Thực hiện
1. Read existing context/history and choose only needed files.
2. Create archive first and verify checksum; preserve original history.
3. If reducing context, link archive and keep active next steps.

## Đầu ra và acceptance
.docs/archive/<timestamp>/ + index. Dùng source hiện hành và contract thật; giữ các thay đổi người dùng. Tách design/code/test status và ghi evidence/lỗi/gap/next task. Khi user giao toàn bộ tính năng, tiếp tục các bước cần thiết đến kết quả đó; không buộc xác nhận từng bước thường lệ.

## Khi bị chặn
Hoàn thành phần độc lập; giữ draft/spec/checkpoint. Nêu đúng công cụ, source hay điều kiện thiếu; không bịa link, endpoint hoặc kết quả kiểm thử.
