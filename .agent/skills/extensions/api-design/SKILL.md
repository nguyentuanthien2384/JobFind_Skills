---
name: api-design
description: Thiết kế request/response/error/pagination JobFind trên contract legacy/modern hiện hữu. Dùng cho REST API design, endpoint docs, HTTP statuses,
  schema hoặc API compatibility.
---


# JobFind · Thiết kế hợp đồng API

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Khảo sát client caller, legacy routes và modern operations/schemas/responses trước chọn contract.
2. Ghi method/public path, permission, actor/tenant, params/query/body/headers, response và status cho từng action.
3. Dùng naming và version boundary hiện hành; giữ backward compatibility của endpoint legacy.
4. Định nghĩa list pagination/sort/filter limits, validation và error semantics; đọc DTO/schema thật thay vì đoán từ form.
5. Với write, nêu duplicate/concurrency/idempotency và event side effect; với internal API nêu trust boundary.
6. Cập nhật contract docs và generated checks khi contract thay đổi; chuyển sang code-api nếu user giao implement.

## Điều kiện nghiệm thu
- Client phân biệt empty, permission, validation và transient error được.
- Đường API của admin có đúng /api/admin prefix.

## Đầu ra
- Endpoint contract và compatibility/test plan có bằng chứng.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
