---
name: backend-patterns
description: Áp dụng controller/service/store, transaction, pagination, queue và error boundary JobFind. Dùng khi sửa service lớn, N+1, outbox, backend
  architecture hoặc query performance.
---


# JobFind · Mẫu backend JobFind

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Trace route → controller → service/store → database và event, xác định owner thực tế.
2. Giữ controller mỏng nhưng không tạo repository layer mới cho mọi file nếu source chưa cần.
3. Giới hạn query/list, tránh N+1 và thêm index theo truy vấn/plan; giữ parameter binding và tenant predicates.
4. Ghi state change cùng outbox trong transaction, consumer dedupe/inbox và retry có bounds.
5. Đặt log/error tại ranh giới có actor/request ID đã redact; giữ response semantics cho frontend.
6. Kiểm tra failure/rollback/duplicate/tenant ngoài success path và viết evidence vào backend plan.

## Điều kiện nghiệm thu
- Timeout không được mặc định là write chưa xảy ra.
- Cache/projection không làm lộ dữ liệu private hoặc chéo tenant.

## Đầu ra
- Backend refactor/patch với owner, consistency và focused tests.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
