---
name: init-techstack
description: Khảo sát và thiết lập môi trường dự án JobFind hiện có theo package/lockfile/scripts. Dùng cho init-techstack, init-teckstack, cài bộ điều
  phối, setup dev hoặc kiểm tra cấu hình trước code.
---


# JobFind · Thiết lập môi trường

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Xác nhận root có frontend/backend/microservices; đọc engines, lockfiles và scripts hiện hành.
2. Giữ React CRA JavaScript, Express/Babel, Sequelize và ESM microservices. Lập ghi chú cho yêu cầu đổi stack thay vì khởi tạo app mẫu đè source.
3. Kiểm tra Node/npm/Python và dependency sẵn có; chọn install tương ứng lockfile, không ghi credential/env values vào tài liệu.
4. Đối chiếu docs dev và tên env key cần có; cung cấp template chỉ tên/placeholder được ghi rõ.
5. Chạy kiểm tra read-only trước; khởi chạy local services chỉ trong scope user giao, giữ cổng/flags theo script.
6. Ghi môi trường đã xác minh và blocker; bootstrap bộ tài liệu bằng workflow nếu được yêu cầu.

## Điều kiện nghiệm thu
- Không chuyển JobFind sang Next.js/Vite/Nest/Prisma do mẫu dùng stack khác.
- Mọi port/script/dependency được đọc từ source hiện hành.

## Đầu ra
- Environment checklist, setup plan và thay đổi cấu hình local cần thiết.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
