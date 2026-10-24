---
name: billing-entitlements
description: Phát triển gói đăng tin/CV, payment callbacks, entitlement, quota và lịch sử mua JobFind. Dùng khi mua gói, unlock CV, hết quota, billing hoặc
  tách recurring billing proposal.
---


# JobFind · Gói dịch vụ và quota

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc packageService/packageCvService, BuyPost/BuyCv, entitlement và callbacks; tách post packages và CV packages.
2. Kiểm tra user/company/permission và package active state; server quyết định giá/quota/entitlement.
3. Luồng payment pending/success/cancel/failure dùng xác minh server và idempotency; return URL không là bằng chứng thanh toán.
4. Quota đăng/reup và unlock CV chống double consume khi request/event lặp; kiểm tra transaction và event.
5. UI JF-003/026 dùng khả năng source; recurring subscription/auto-renew/card-on-file là proposal chưa có đầy đủ.
6. Kiểm tra quota 0/hết hạn, payment callback lặp, canceled và cross-tenant; không thực hiện giao dịch thật chỉ để QA.

## Điều kiện nghiệm thu
- Không cấp entitlement từ thông tin amount/status trên client.
- Mua gói có sẵn không được gọi là recurring billing đã implement.

## Đầu ra
- Package/quota/payment patch hoặc plan proposal có dependency rõ.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.

## Ảnh tham chiếu gốc
Đọc references/reference-images.json để chọn PNG ở assets/stitch-reference theo local screen ID. Khi đã bootstrap project, ảnh nằm ở .stitch/designs theo screen catalog. Dùng canvas metadata để đối chiếu ảnh; image evidence không chứng minh code/test hoàn thành.
