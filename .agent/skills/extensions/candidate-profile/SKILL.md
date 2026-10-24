---
name: candidate-profile
description: Phát triển hồ sơ, CV đã chuẩn bị, PDF preview và tài khoản ứng viên JobFind. Dùng khi sửa CandidateInfo, profile/CVs, thông tin cá nhân hoặc
  luồng chọn CV trước ứng tuyển.
---


# JobFind · Hồ sơ và CV ứng viên

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc CandidateInfo, aiSearchService, identity store và legacy user adapter; giữ quyền profile self và namespace CV.
2. Map fields thực tế, profile completion, validation và optional fields theo source; không biến placeholder Stitch thành field backend tự động.
3. Prepared CV ở identity MongoDB và submitted CV legacy khác nhau; lưu snapshot đúng khi ứng tuyển.
4. Upload/preview PDF theo source limits, MIME/size/ownership; sanitize links và giữ private media.
5. Triển khai states edit/dirty/saving/error/empty và giữ dữ liệu khi save thất bại; settings riêng theo quyền.
6. Kiểm tra actor khác, dữ liệu dài, không CV, nhiều CV, PDF lỗi và đổi phiên.

## Điều kiện nghiệm thu
- Ứng viên chỉ sửa/đọc hồ sơ và CV thuộc phạm vi mình.
- Thay CV chuẩn bị không làm sai snapshot đơn đã nộp.

## Đầu ra
- Profile/CV patch và handoff với fields/ownership/state matrix.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

## Ảnh tham chiếu gốc
Đọc references/reference-images.json để chọn PNG ở assets/stitch-reference theo local screen ID. Khi đã bootstrap project, ảnh nằm ở .stitch/designs theo screen catalog. Dùng canvas metadata để đối chiếu ảnh; image evidence không chứng minh code/test hoàn thành.
