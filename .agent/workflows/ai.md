---
description: JobFind /ai — AI patch + task contract and checks
---

# /ai

## Đầu vào
Yêu cầu hiện tại, source root, feature/screen/variant nếu có; đọc AGENTS.md, .docs/CONTEXT.md và registry. Skills: ai-services (xem mapping trong registry).

## Thực hiện
1. Trace task/ID/owner/provider/readiness and actual schemas.
2. Implement polling/outbox/idempotency and safe failure handling.
3. Verify terminal/error/cancel/duplicate states without live provider use unless requested.

## Đầu ra và acceptance
AI patch + task contract and checks. Dùng source hiện hành và contract thật; giữ các thay đổi người dùng. Tách design/code/test status và ghi evidence/lỗi/gap/next task. Khi user giao toàn bộ tính năng, tiếp tục các bước cần thiết đến kết quả đó; không buộc xác nhận từng bước thường lệ.

## Khi bị chặn
Hoàn thành phần độc lập; giữ draft/spec/checkpoint. Nêu đúng công cụ, source hay điều kiện thiếu; không bịa link, endpoint hoặc kết quả kiểm thử.
