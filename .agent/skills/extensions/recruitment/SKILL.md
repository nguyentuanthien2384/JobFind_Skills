---
name: recruitment
description: Phát triển ứng tuyển, pipeline, phỏng vấn, offer và nghiệp vụ tuyển dụng JobFind. Dùng khi nộp CV, đổi stage, gửi thư tuyển dụng hoặc nối workflow
  ứng viên với doanh nghiệp.
---


# JobFind · Luồng tuyển dụng

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc CV legacy, application service và frontend adapter; xác định company, job, application.id và legacy_cv_id trước hành động.
2. Giữ 6 stage keys: moi_ung_tuyen, dang_xem_xet, phong_van, de_nghi, nhan_viec, tu_choi; lấy labels/allowed actions từ source.
3. Kiểm tra ứng tuyển duplicate, prepared CV/PDF validity, quyền CANDIDATE_APPLY và job state; giữ khả năng tiếp tục sau login.
4. Đổi stage, rating, notes và quyết định theo contract; optimistic update phải rollback nếu lỗi và không lưu quyết định chỉ ở trình duyệt.
5. Phỏng vấn/offer dùng ngày giờ, Asia/Ho_Chi_Minh, địa điểm/meeting URL, người liên hệ, deadline và snapshot như validator hiện hành.
6. Tạo outbox cùng transaction; phân biệt requested/queued/delivered với email thực sự đã gửi. Kiểm tra owner và replay sự kiện.

## Điều kiện nghiệm thu
- Không dùng ID CV MySQL để gọi application endpoint PostgreSQL.
- Ứng tuyển hoặc gửi quyết định lặp không tạo tác động không mong muốn.

## Đầu ra
- Patch luồng tuyển dụng và bằng chứng kiểm tra theo các actor.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [recruitment](references/recruitment.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.

## Ảnh tham chiếu gốc
Đọc references/reference-images.json để chọn PNG ở assets/stitch-reference theo local screen ID. Khi đã bootstrap project, ảnh nằm ở .stitch/designs theo screen catalog. Dùng canvas metadata để đối chiếu ảnh; image evidence không chứng minh code/test hoàn thành.
