---
name: job-search
description: Phát triển homepage, tìm việc, filters, facets, gợi ý và job detail JobFind theo Stitch. Dùng khi sửa /job, search results, URL filter, external
  jobs hoặc đề xuất việc làm.
---


# JobFind · Tìm việc và khám phá

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc JobPage/aiSearchService và flags; chọn legacy get-filter-post hay modern search theo mode đang có.
2. Map keyword, location, job/work type, salary, experience và sort bằng schema/catalog thật; query có bounds.
3. Giữ URL filters/back-forward, debounce và stale response cancellation, reset pagination khi đổi filter.
4. Public results chỉ hiển thị jobs/company công khai hợp lệ; external job giữ provenance và route khác.
5. Giữ JobCard/list/detail tương thích CTA lưu/ứng tuyển/login intent theo quyền.
6. Kiểm tra zero results, partial network, stale request, pagination, data dài và source-mode variants.

## Điều kiện nghiệm thu
- Mỗi JobCard dẫn đúng job ID và detail route.
- Search đổi nhanh không flash kết quả sai hoặc gửi mỗi keystroke.

## Đầu ra
- Search/home/detail patch, query-state mapping và focused checks.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

## Ảnh tham chiếu gốc
Đọc references/reference-images.json để chọn PNG ở assets/stitch-reference theo local screen ID. Khi đã bootstrap project, ảnh nằm ở .stitch/designs theo screen catalog. Dùng canvas metadata để đối chiếu ảnh; image evidence không chứng minh code/test hoàn thành.
