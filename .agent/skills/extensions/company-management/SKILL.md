---
name: company-management
description: Phát triển trang công ty công khai, hồ sơ doanh nghiệp, company team và employer onboarding JobFind. Dùng khi sửa company profile/list, AddCompany,
  tuyển dụng team hoặc trạng thái xác minh.
---


# JobFind · Công ty và nhân sự

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc ListCompany/DetailCompany, AddCompany/ManageEmployer và companyService; phân biệt public profile với dữ liệu verification private.
2. Kiểm tra COMPANY/EMPLOYER company membership và permission; công ty hoạt động/đã duyệt theo S1/CS1.
3. Map logo/cover/info/locations/jobs/benefits theo field hiện có; public response không lộ giấy tờ xác minh.
4. Với team, server xác định company/actor và ràng buộc add/quit/member; không sửa role từ body thiếu quyền.
5. Giữ modes edit/preview/pending/rejected/verified, save failure và empty jobs; chọn variant JF-005/006/007/008/037 phù hợp.
6. Kiểm tra public/private, member khác công ty và company state làm thay đổi navigation đúng.

## Điều kiện nghiệm thu
- Page công khai không truy cập giấy tờ doanh nghiệp private.
- Company/Employer không xem report quản trị nền tảng.

## Đầu ra
- Company/team UI/API patch và ownership/visibility checks.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

## Ảnh tham chiếu gốc
Đọc references/reference-images.json để chọn PNG ở assets/stitch-reference theo local screen ID. Khi đã bootstrap project, ảnh nằm ở .stitch/designs theo screen catalog. Dùng canvas metadata để đối chiếu ảnh; image evidence không chứng minh code/test hoàn thành.
