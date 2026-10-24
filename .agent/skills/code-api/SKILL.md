---
name: code-api
description: Viết/sửa endpoint JobFind theo Express controllers/services và shared contracts. Dùng cho /code-api, validation, lỗi API, gateway, pagination,
  quyền, tenant hoặc idempotency.
---


# JobFind · Code REST API

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc endpoint catalog, adapter gọi API và controller/service hiện hành. Kiểm tra contract modern ở shared/contracts trước thêm route.
2. Dùng publicPath thực tế: /api + path, riêng admin /api/admin + path. Giữ endpoint legacy và spelling đã được client dùng.
3. Xác thực actor từ token/cookie phía server; kiểm tra permission, company state và ownership; không lấy user/role đáng tin từ body.
4. Validate params/query/body theo schema; giữ response legacy và modern ở adapter phù hợp, bounded pagination và lỗi có ngữ nghĩa.
5. Để controller điều phối transport, service xử lý nghiệp vụ/transaction/outbox. Với ghi có contract idempotency, giữ key và kết quả ổn định cho cùng thao tác.
6. Kiểm tra success, validation, 401/403, tenant chéo, duplicate write và dependency failure; cập nhật endpoint doc, contracts và tests liên quan.

## Điều kiện nghiệm thu
- Endpoint xuất hiện trong router/gateway/contract cần thiết và client gọi đúng.
- Không phát lại thao tác ghi tự động sau refresh hoặc khi timeout không rõ kết quả.

## Đầu ra
- Patch endpoint đầy đủ, contract, error handling và kiểm tra phù hợp.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [api-contract](references/api-contract.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
- [modern-api-index](references/modern-api-index.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
