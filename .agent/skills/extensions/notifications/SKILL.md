---
name: notifications
description: Phát triển notification center, job alerts, unread, email/push delivery JobFind. Dùng khi sửa JF-033, đích thông báo, mark-read, push subscription
  hoặc delivery state.
---


# JobFind · Thông báo và push

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc notificationJobsService/notificationService, candidate notifications và notification owner/consumer.
2. Map loại event với actor/role/destination route thật; kiểm tra quyền ở đích và không dẫn recruiter vào candidate-only page.
3. Dedupe event/id, tính unread đúng, mark-read có ownership và không cộng lặp từ socket/poll.
4. Push permission và subscription chỉ khi user thực hiện thao tác phù hợp; sessions đổi phải quản lý subscription theo source.
5. Phân biệt queued/sent/delivered, không báo email gửi thành công chỉ từ event accepted; preference theo field hiện có.
6. Kiểm tra pagination, zero unread, deleted target, role đổi, event replay và provider failure.

## Điều kiện nghiệm thu
- Notification không lộ job/application private của tenant khác.
- UI thông báo phản ánh delivery/state thật hoặc label fixture.

## Đầu ra
- Notification/push UI/API/event patch và destination map.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

## Ảnh tham chiếu gốc
Đọc references/reference-images.json để chọn PNG ở assets/stitch-reference theo local screen ID. Khi đã bootstrap project, ảnh nằm ở .stitch/designs theo screen catalog. Dùng canvas metadata để đối chiếu ảnh; image evidence không chứng minh code/test hoàn thành.
