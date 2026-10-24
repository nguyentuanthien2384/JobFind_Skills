---
name: figma-handoff
description: Tạo/sửa màn JobFind trong Figma và bàn giao thiết kế tới code, giữ mapping Stitch/Figma/route. Dùng khi push page vào Figma, component library,
  node mapping hoặc handoff cho phát triển.
---


# JobFind · Figma và bàn giao code

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Chọn nguồn chính: Stitch exact 37 hoặc Figma V2 192 mục tiêu; đọc mapping và label. Không cộng 2 bộ như các route khác nhau.
2. Read skills Figma bắt buộc trước từng use_figma/create_new_file/get_design_context theo công cụ thực sự đang có.
3. Kiểm tra page/frame/node hiện tại trước sửa; giữ old variants và tạo layers editable, auto-layout, components/variables khi khả năng công cụ cho phép.
4. Đặt names/roles/viewports/states nhất quán; lấy node IDs và URLs từ kết quả thực, không tái tạo ID bằng suy đoán.
5. So khớp hình, clipping, overflow, typography, responsive và prototype path; phân biệt duplicate prototype frames với screen catalog.
6. Cập nhật screen-node map, source files, API, props/states và acceptance; khi code dùng design-to-code skill + code-ui của JobFind.

## Điều kiện nghiệm thu
- Link đúng node và file còn tồn tại; mỗi catalog key có mapping duy nhất.
- Bản Figma mục tiêu không bị mô tả là source đã implement.

## Đầu ra
- Frames/components hoặc handoff được xác minh với node map và QA.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
