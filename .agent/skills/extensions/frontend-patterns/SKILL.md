---
name: frontend-patterns
description: Áp dụng patterns React/hook/router/form state đúng JobFind CRA. Dùng khi effect race, fetch, composition, debounce, pagination hoặc frontend
  architecture.
---


# JobFind · Mẫu React và state

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc container/hook/service gần feature; xác định state thuộc URL, server, session hay form.
2. Tách hook khi logic thực sự lặp, giữ component composition và props/event boundary rõ.
3. Search debounce theo hook/lodash hiện có, cancel stale responses và reset page đúng; giữ back/forward.
4. Effect có dependency/cleanup, session change làm sạch dữ liệu private; không request từ render.
5. Form dùng controlled values, submitting lock và giữ input khi lỗi; optimistic update có rollback.
6. Kiểm tra race, unmount, rerender, paging và API error object thực tế.

## Điều kiện nghiệm thu
- Không set state từ request stale sau đổi filter/role.
- UI không báo thành công chỉ vì promise resolve.

## Đầu ra
- Hook/container patch và state ownership map.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
