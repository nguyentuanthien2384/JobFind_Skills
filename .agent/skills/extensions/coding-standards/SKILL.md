---
name: coding-standards
description: Review/viết code JobFind theo conventions JavaScript, React, Express và ESM/Babel hiện có. Dùng khi refactor, naming, lỗi lint, ràng buộc module
  hoặc cần coding standards.
---


# JobFind · Quy chuẩn JavaScript

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc file gần thay đổi, lint config và package boundary để chọn đúng JS/JSX, Babel hay ESM.
2. Giữ patch nhỏ theo nhiệm vụ, names/conventions của source; tách logic lớn bằng ranh giới nghiệp vụ rõ.
3. Dùng input validation, pure helpers khi có lợi, stable keys và effect cleanup; dùng JSDoc cho shape public nếu hữu ích.
4. Không đổi response/contracts, role/stage keys hoặc spelling endpoint trong một refactor.
5. Kiểm tra secrets/log và lỗi async; tránh catch nuốt lỗi rồi báo thành công.
6. Chạy lint/focused behavior test phù hợp; ghi tradeoff thay vì tạo abstraction chưa cần.

## Điều kiện nghiệm thu
- Refactor giữ behavior bằng evidence/test phù hợp.
- Không trộn require/import ngoài conventions của package hoặc tạo dependency không cần.

## Đầu ra
- Patch dễ review và kiểm tra ngắn theo phần đổi.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
