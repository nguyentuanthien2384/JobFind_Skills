---
description: JobFind /init-stack — .agent/.docs/.stitch setup and source inventory
---

# /init-stack

## Đầu vào
Yêu cầu hiện tại, source root, feature/screen/variant nếu có; đọc AGENTS.md, .docs/CONTEXT.md và registry. Skills: workflow, init-techstack (xem mapping trong registry).

## Thực hiện
1. Read source package scripts/workspaces and existing AGENTS.
2. Dry-run exporter/install; preserve conflicts, merge requested docs.
3. Refresh static inventory; record actual stack and proposal boundaries.

## Đầu ra và acceptance
.agent/.docs/.stitch setup and source inventory. Dùng source hiện hành và contract thật; giữ các thay đổi người dùng. Tách design/code/test status và ghi evidence/lỗi/gap/next task. Khi user giao toàn bộ tính năng, tiếp tục các bước cần thiết đến kết quả đó; không buộc xác nhận từng bước thường lệ.

## Khi bị chặn
Hoàn thành phần độc lập; giữ draft/spec/checkpoint. Nêu đúng công cụ, source hay điều kiện thiếu; không bịa link, endpoint hoặc kết quả kiểm thử.
