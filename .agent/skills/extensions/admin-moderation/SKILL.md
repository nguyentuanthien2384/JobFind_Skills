---
name: admin-moderation
description: Phát triển admin dashboard, users, kiểm duyệt jobs/company và audit JobFind theo Stitch. Dùng khi sửa duyệt/từ chối/ban, platform reports hoặc
  quyền admin.
---


# JobFind · Quản trị và duyệt nội dung

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc admin routes/permissions, ManagePost/ManageCompany/ManageUser và admin services; xác định ADMIN quyền thực tế.
2. Giữ danh sách, filters/paging, state và actions theo source. Duyệt công ty dùng endpoint accecpt-company hiện hành.
3. Validate target/status/permission ở server; cần lý do theo contract nghiệp vụ, tránh UI-only approval.
4. Giữ docs/verification/media private, review panel hiển thị đúng target và không reuse dữ liệu hàng cũ khi đổi row.
5. Audit thao tác theo cơ chế hiện có; phân biệt user/company/job state, allowlist actions và concurrency.
6. Kiểm tra role khác, pending/active/ban/reject, submit lặp, lỗi API và refresh danh sách sau mutation.

## Điều kiện nghiệm thu
- EMPLOYER/COMPANY không được sử dụng endpoint admin dù có UI tương tự.
- Thao tác duyệt/từ chối cập nhật thật và có evidence, không chỉ đổi badge.

## Đầu ra
- Admin UI/API patch cùng role/target/action matrix.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

## Ảnh tham chiếu gốc
Đọc references/reference-images.json để chọn PNG ở assets/stitch-reference theo local screen ID. Khi đã bootstrap project, ảnh nằm ở .stitch/designs theo screen catalog. Dùng canvas metadata để đối chiếu ảnh; image evidence không chứng minh code/test hoàn thành.
