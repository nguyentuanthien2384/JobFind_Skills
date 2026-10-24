---
name: catalog-management
description: 'Phát triển danh mục JobFind: job/work/salary/experience types, skills và all-code. Dùng khi sửa admin catalog CRUD, options/filter codes hoặc
  taxonomy đồng bộ frontend/backend.'
---


# JobFind · Danh mục nghề nghiệp

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc Allcode/Skill models, recruitmentCatalog, admin catalog routes và consumer forms/search.
2. Giữ code type/code value chính xác và permission admin; label tiếng Việt không thay ID/code nghiệp vụ.
3. Validate add/update/delete, referenced data và uniqueness theo model/service; không xóa catalog đang dùng vô điều kiện.
4. Cập nhật dropdown/search facets tương thích, giữ options inactive state nếu source có.
5. Giữ list pagination/cache và field naming của các route legacy; không gộp mọi taxonomy thành một enum mới.
6. Kiểm tra duplicate code, referenced delete, role khác, stale options và frontend forms đang dùng.

## Điều kiện nghiệm thu
- Catalog code thay đổi không làm mất quan hệ job/user/skill.
- Dropdown của màn Stitch lấy dữ liệu thật, không hardcode một ngành mẫu.

## Đầu ra
- Catalog CRUD/UI patch và compatibility checks với consumer forms.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
