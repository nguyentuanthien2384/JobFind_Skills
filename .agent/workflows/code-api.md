---
description: JobFind /code-api — API patch + updated endpoint doc
---

# /code-api

## Đầu vào
Yêu cầu hiện tại, source root, feature/screen/variant nếu có; đọc AGENTS.md, .docs/CONTEXT.md và registry. Skills: code-api, api-design (xem mapping trong registry).

## Thực hiện
1. Read caller, exact path and current contract.
2. Implement validation/actor/tenant/service/errors and stable write behavior.
3. Verify success/failure/duplicate and update endpoint contract.

## Đầu ra và acceptance
API patch + updated endpoint doc. Dùng source hiện hành và contract thật; giữ các thay đổi người dùng. Tách design/code/test status và ghi evidence/lỗi/gap/next task. Khi user giao toàn bộ tính năng, tiếp tục các bước cần thiết đến kết quả đó; không buộc xác nhận từng bước thường lệ.

## Khi bị chặn
Hoàn thành phần độc lập; giữ draft/spec/checkpoint. Nêu đúng công cụ, source hay điều kiện thiếu; không bịa link, endpoint hoặc kết quả kiểm thử.
