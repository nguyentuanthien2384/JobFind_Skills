---
description: JobFind /integrate — functional integration patch and focused checks
---

# /integrate

## Đầu vào
Yêu cầu hiện tại, source root, feature/screen/variant nếu có; đọc AGENTS.md, .docs/CONTEXT.md và registry. Skills: integrate-api (xem mapping trong registry).

## Thực hiện
1. Trace axios response.data/error behavior and active flags.
2. Normalize adapter output; wire fetching/form/error/cancel/pagination.
3. Verify stale response/session/object error/duplicate submit behavior.

## Đầu ra và acceptance
functional integration patch and focused checks. Dùng source hiện hành và contract thật; giữ các thay đổi người dùng. Tách design/code/test status và ghi evidence/lỗi/gap/next task. Khi user giao toàn bộ tính năng, tiếp tục các bước cần thiết đến kết quả đó; không buộc xác nhận từng bước thường lệ.

## Khi bị chặn
Hoàn thành phần độc lập; giữ draft/spec/checkpoint. Nêu đúng công cụ, source hay điều kiện thiếu; không bịa link, endpoint hoặc kết quả kiểm thử.
