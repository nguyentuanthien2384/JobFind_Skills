---
name: candidate-search
description: Phát triển kho ứng viên, filters, pagination, unlock CV và talent pool JobFind. Dùng khi sửa JF-012, /admin/list-candiate, candidate search
  hoặc entitlement khi xem CV.
---


# JobFind · Tìm và mở hồ sơ ứng viên

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc FilterCv, candidateSearchService/cv adapters, permissions và package CV ownership.
2. Giữ spelling list-candiate/fillter legacy route và source filters; map job selection, catalogs và pagination theo contract.
3. Hiển thị giới hạn thông tin trước unlock theo server response, không gửi PII rồi ẩn bằng CSS.
4. Unlock/seen/entitlement dùng transaction và idempotency cần thiết; UI cập nhật sau server xác nhận.
5. Map candidate/legacy CV/application/prepared CV IDs đúng khi mở detail hoặc đưa talent pool.
6. Kiểm tra zero/quota expired, cross-tenant, stale paging, CV unavailable và duplicate unlock.

## Điều kiện nghiệm thu
- CV/PDF private không thể mở bằng sửa query hoặc đoán ID.
- Search không reset filter khi page đổi hoặc giữ page ngoài range.

## Đầu ra
- Candidate search/unlock/talent patch và privacy/quota/state checks.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

## Ảnh tham chiếu gốc
Đọc references/reference-images.json để chọn PNG ở assets/stitch-reference theo local screen ID. Khi đã bootstrap project, ảnh nằm ở .stitch/designs theo screen catalog. Dùng canvas metadata để đối chiếu ảnh; image evidence không chứng minh code/test hoàn thành.
