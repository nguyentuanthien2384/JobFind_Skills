---
name: job-management
description: Phát triển tạo/sửa/repost/quản lý tin JobFind theo AddPost và jobs contracts, quota và xét duyệt. Dùng khi sửa JF-021, wizard đăng tin, job
  state hoặc core/legacy write mode.
---


# JobFind · Quản lý tin tuyển dụng

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc AddPost, jobs adapters, job-core contract và legacy postService; giữ write mode đang bật.
2. Map fields và catalog codes thật; wizard chỉ là trình bày form, không tự tạo endpoint riêng cho từng bước.
3. Check company state S1/CS1, permission, owner và package/quota tại server.
4. Giữ validation, draft/preview/submitting/error, stable idempotency key cho create/repost nếu contract yêu cầu.
5. Ghi revision/outbox để projection search cập nhật; không chép trạng thái approved từ client.
6. Kiểm tra create/update/repost, quota hết, duplicate, race và job ngoài tenant.

## Điều kiện nghiệm thu
- Repost không tạo nhiều tin/tiêu quota nhiều lần từ cùng thao tác.
- Tin chưa được phép public không xuất hiện trong search vì UI filter.

## Đầu ra
- Job CRUD/repost/UI patch và contract/quota checks.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

## Ảnh tham chiếu gốc
Đọc references/reference-images.json để chọn PNG ở assets/stitch-reference theo local screen ID. Khi đã bootstrap project, ảnh nằm ở .stitch/designs theo screen catalog. Dùng canvas metadata để đối chiếu ảnh; image evidence không chứng minh code/test hoàn thành.
