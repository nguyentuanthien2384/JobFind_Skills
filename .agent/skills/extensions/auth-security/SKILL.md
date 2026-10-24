---
name: auth-security
description: Hoàn thiện đăng nhập/đăng ký JobFind, Google/GitHub/Auth0, JWT/session cookies, SSO linking và role/tenant. Dùng cho /auth, 401/403, account
  security hoặc social login.
---


# JobFind · Xác thực và quyền

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc authClient, SessionContext, RouteGuard, authController/auth services và /api/auth/providers. Provider trong thiết kế chỉ hiển thị hoạt động khi server readiness cho phép.
2. Giữ access token trong memory và refresh HttpOnly cookie; token_user là marker. Xử lý login/logout/refresh đồng bộ và session invalidation.
3. Với SSO, kiểm tra state/nonce/PKCE, redirect allowlist, cookie origin, pending signup và intentional account linking; không tự gộp theo email.
4. Phân biệt Google/GitHub trực tiếp với connections qua Auth0 Universal Login; đọc readiness và yêu cầu connection hiện tại, không đoán cấu hình IdP.
5. Ánh xạ 4 role ADMIN/COMPANY/EMPLOYER/CANDIDATE theo permissions thực tế; signup chỉ dùng lựa chọn hợp lệ CANDIDATE/EMPLOYER.
6. Kiểm tra password/SSO/signup/link/unlink/revoke, reload, nhiều tab và 401/403; giữ mật khẩu/OTP/secrets ngoài nhật ký và tài liệu.

## Điều kiện nghiệm thu
- Nút provider không hứa live login khi IdP chưa sẵn sàng.
- Backend chặn privilege escalation và access chéo tenant dù UI bị sửa.

## Đầu ra
- Patch auth/UI theo đúng provider, ma trận lỗi và kiểm tra phù hợp.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [auth-security](references/auth-security.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.

## Ảnh tham chiếu gốc
Đọc references/reference-images.json để chọn PNG ở assets/stitch-reference theo local screen ID. Khi đã bootstrap project, ảnh nằm ở .stitch/designs theo screen catalog. Dùng canvas metadata để đối chiếu ảnh; image evidence không chứng minh code/test hoàn thành.
