---
description: JobFind /enhance-prompt — .stitch/prompts/<screen>-<variant>.md
---

# /enhance-prompt

## Đầu vào
Yêu cầu hiện tại, source root, feature/screen/variant nếu có; đọc AGENTS.md, .docs/CONTEXT.md và registry. Skills: enhance-prompt (xem mapping trong registry).

## Thực hiện
1. Read screen contract, actor and source API readiness.
2. Turn request into detailed reference-preserving prompt.
3. Include layout/tokens/interactions/states/mobile and proposal labels.

## Đầu ra và acceptance
.stitch/prompts/<screen>-<variant>.md. Dùng source hiện hành và contract thật; giữ các thay đổi người dùng. Tách design/code/test status và ghi evidence/lỗi/gap/next task. Khi user giao toàn bộ tính năng, tiếp tục các bước cần thiết đến kết quả đó; không buộc xác nhận từng bước thường lệ.

## Khi bị chặn
Hoàn thành phần độc lập; giữ draft/spec/checkpoint. Nêu đúng công cụ, source hay điều kiện thiếu; không bịa link, endpoint hoặc kết quả kiểm thử.
