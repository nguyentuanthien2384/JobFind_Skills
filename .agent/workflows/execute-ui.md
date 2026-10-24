---
description: JobFind /execute-ui — UI patch + screen handoff + QA evidence
---

# /execute-ui

## Đầu vào
Yêu cầu hiện tại, source root, feature/screen/variant nếu có; đọc AGENTS.md, .docs/CONTEXT.md và registry. Skills: code-ui, react-components, integrate-api (xem mapping trong registry).

## Thực hiện
1. Read frontend plan and exact screen/variant/mode.
2. Reuse CRA shell/components; implement UI states and scoped CSS.
3. Connect the actual adapter when functional UI is requested.
4. Compare rendering and interactions; run focused tests/lint/build needed.

## Đầu ra và acceptance
UI patch + screen handoff + QA evidence. Dùng source hiện hành và contract thật; giữ các thay đổi người dùng. Tách design/code/test status và ghi evidence/lỗi/gap/next task. Khi user giao toàn bộ tính năng, tiếp tục các bước cần thiết đến kết quả đó; không buộc xác nhận từng bước thường lệ.

## Khi bị chặn
Hoàn thành phần độc lập; giữ draft/spec/checkpoint. Nêu đúng công cụ, source hay điều kiện thiếu; không bịa link, endpoint hoặc kết quả kiểm thử.
