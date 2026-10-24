# Khoảng trống và phần cần plan

## Không phải mọi route có native screen
37 native references có 34 desktop/3 mobile, gồm variants cùng chức năng. Route inventory có 94 declarations/92 patterns; xem route-coverage.json và Figma V2 để chọn màn tiếp theo. Không giả định route 1:1 với frame.

## Proposal cần rõ contract
- Lịch tổng hợp: source có interview/offer thao tác trong pipeline; global agenda/calendar cần query/read model, route và timezone plan trước tích hợp.
- System settings: chưa có general /admin/settings. Phải xác định từng setting, owner/permission/audit/concurrency; không tạo API tổng quát từ control trong ảnh.
- Recurring billing: hiện có gói post/CV, payment/history/quota. Auto-renew/card-on-file/trial là proposal cần provider/contract riêng.
- LinkedIn có trong fixture ảnh; source readiness Google/GitHub/Auth0 phải kiểm tra, không tự thêm provider hoạt động.
- Mobile, loading/empty/error/modal states ngoài 37 ảnh native được coi extension và nghiệm thu riêng.

## Mục tiêu code
Trace UI/API/store thực tế, không đổi flag để hợp ảnh. Kiểm thử privacy/tenant/idempotency/session/IDs/stages ở những slice có rủi ro; record actual evidence.
