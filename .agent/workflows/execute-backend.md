---
description: JobFind /execute-backend — backend patch + contract/migration + verification
---

# /execute-backend

## Đầu vào
Yêu cầu hiện tại, source root, feature/screen/variant nếu có; đọc AGENTS.md, .docs/CONTEXT.md và registry. Skills: code-db, code-api, backend-patterns (xem mapping trong registry).

## Thực hiện
1. Read backend plan, data owner, current endpoint and contracts.
2. Implement necessary schema/store/migration and transaction/outbox.
3. Add routes/controller/service/schema/gateway changes and enforce tenant.
4. Run focused DB/API/contracts checks and update docs.

## Đầu ra và acceptance
backend patch + contract/migration + verification. Dùng source hiện hành và contract thật; giữ các thay đổi người dùng. Tách design/code/test status và ghi evidence/lỗi/gap/next task. Khi user giao toàn bộ tính năng, tiếp tục các bước cần thiết đến kết quả đó; không buộc xác nhận từng bước thường lệ.

## Khi bị chặn
Hoàn thành phần độc lập; giữ draft/spec/checkpoint. Nêu đúng công cụ, source hay điều kiện thiếu; không bịa link, endpoint hoặc kết quả kiểm thử.
