---
name: microservices
description: 'Sửa kiến trúc microservices JobFind: gateway, contracts, RabbitMQ outbox/inbox, CQRS và feature flags. Dùng khi proxy/event lệch, sync database,
  container hoặc rollout/rollback.'
---


# JobFind · Gateway và sự kiện

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc package workspaces và app của service owner; phân biệt legacy backend với 9 workspace ứng dụng và shared.
2. Đọc operations/schemas/responses/eventCatalog và route registration. Giữ contracts đồng bộ transport và gateway.
3. Đi theo luồng write → DB + outbox → confirmed publish → consumer inbox → projection; retry phải idempotent.
4. Kiểm tra tenant và actor truyền xuyên gateway, header/trust boundary, service identity và internal endpoints.
5. Giữ flags đang có; lập rollout/observe/rollback khi user yêu cầu đổi mode, không bật cờ chỉ để screenshot giống mẫu.
6. Kiểm tra contract generation/check, focused service tests và sync lag/failure; ghi trạng thái runtime chỉ khi đã quan sát.

## Điều kiện nghiệm thu
- Hợp đồng HTTP/event giữ cùng phiên bản giữa owner và consumer.
- Không ghi trực tiếp dữ liệu service khác để bỏ qua consistency.

## Đầu ra
- Patch owner/gateway/consumer cùng contract và kiểm tra tương thích.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [microservices](references/microservices.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
