---
description: JobFind /stitch-loop — completed requested design set + updated backlog
---

# /stitch-loop

## Đầu vào
Yêu cầu hiện tại, source root, feature/screen/variant nếu có; đọc AGENTS.md, .docs/CONTEXT.md và registry. Skills: stitch-loop, save-context (xem mapping trong registry).

## Thực hiện
1. Read backlog, next-prompt and context.
2. Choose the next unfulfilled screen/state within requested scope.
3. Generate/inspect/correct using exact related reference.
4. Update evidence, baton and next task; persist until requested set is complete.

## Đầu ra và acceptance
completed requested design set + updated backlog. Dùng source hiện hành và contract thật; giữ các thay đổi người dùng. Tách design/code/test status và ghi evidence/lỗi/gap/next task. Khi user giao toàn bộ tính năng, tiếp tục các bước cần thiết đến kết quả đó; không buộc xác nhận từng bước thường lệ.

## Khi bị chặn
Hoàn thành phần độc lập; giữ draft/spec/checkpoint. Nêu đúng công cụ, source hay điều kiện thiếu; không bịa link, endpoint hoặc kết quả kiểm thử.
