---
name: system-planner
description: Lập kế hoạch UI, backend, database, endpoint và QA JobFind bám router, quyền và Stitch. Dùng cho /plans, /plan-backend, phân rã tính năng,
  dự toán ảnh hưởng hoặc mở rộng màn chưa có route.
---


# JobFind · Lập kế hoạch nhiều lớp

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc idea, screen contract và các router/adapter/service/model liên quan; ghi evidence trước khi chia task.
2. Tạo cùng feature ID cho design brief, frontend plan, backend plan, endpoint contract và QA. Mỗi task nêu file, dependency và nghiệm thu.
3. Quyết định rõ reuse route, biến thể cùng route, modal hay route mới. Đối với calendar/settings/recurring billing, ghi PROPOSAL cho phần chưa có.
4. Chỉ thay schema khi cần; xác định service sở hữu dữ liệu, ID namespace, tenant, migration và rollback.
5. Liệt kê trạng thái UI, request/response thật, cờ hiện hành và rủi ro tích hợp. Không đổi mode để làm UI khớp mockup.
6. Ưu tiên lát triển khai có thể nghiệm thu; nếu user yêu cầu làm cả tính năng thì tiếp tục code theo các task đã lập.

## Điều kiện nghiệm thu
- Không có task API thiếu chủ thể xác thực/tenant hoặc schema chỉ dựa vào ảnh.
- Các task thiết kế và code có tiêu chí hoàn thành khác nhau.

## Đầu ra
- Bộ 6 tài liệu theo một feature ID, thứ tự task và acceptance matrix.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [architecture](references/architecture.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
- [planning](references/planning.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
