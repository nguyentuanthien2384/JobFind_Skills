---
name: security-review
description: 'Review security JobFind: session, authorization/tenant, private CV/media, input, logs, SSO và webhook/payment. Dùng cho security-review, audit
  patch hoặc kiểm tra trước release.'
---


# JobFind · Review bảo mật code

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Xác định data flow và attack surface của phần đổi, đọc guards/service/schema thực tế.
2. Kiểm tra actor, role permission và owner tenant ở server; thử ID khác hợp lệ trong môi trường kiểm thử.
3. Kiểm tra cookie origin, token storage, SSO state/nonce/PKCE/linking và refresh replay đúng source.
4. Validate file/type/size, escape rendered content và parameterize SQL; kiểm tra URL/media/path authorization.
5. Với payment/event, xác minh server response, idempotency và event authenticity; secrets/PII được redact.
6. Báo cáo finding có file/trigger/impact/evidence và fix cụ thể; kiểm tra lại phần đã sửa.

## Điều kiện nghiệm thu
- Tách finding đã chứng minh và giả thuyết cần kiểm tra.
- Không đưa token/password/CV thật vào report.

## Đầu ra
- Review report và patch được giao, có severity và evidence cụ thể.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
