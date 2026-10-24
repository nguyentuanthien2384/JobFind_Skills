# Chọn kiểm tra và release

Đọc lại scripts trong package.json; bảng dưới là snapshot, không tự cài dependency mới để làm cho lệnh đúng. `npm ci` chỉ ở workspace cần thiết sau khi kiểm tra lockfile và lifecycle scripts.

| Phạm vi | Lệnh tại root | Điều kiện / ý nghĩa |
|---|---|---|
| Backend | `npm --prefix backend test -- --runTestsByPath tests/...` | Dùng test path có thật, Jest; không thay `...` thành đường đoán |
| Frontend | `npm --prefix frontend run test:unit -- --runTestsByPath src/...` | CRA/Jest, watch tắt |
| Microservices | `npm --prefix microservices test -- tests/<file>.test.js` | Vitest, chọn test liên quan |
| Runtime scripts | `npm run test:runtime` | Node tests của scripts root |
| Contract | `npm --prefix microservices run contracts:check` | Kiểm tra HTTP/event spec sinh ra khớp nguồn |
| UI | `npm run lint`, `npm run build` | Build không thay kiểm tra hình ảnh/quyền |
| Bộ unit | `npm test` | Backend + frontend + microservices |
| Auth integration | `npm run test:auth:integration` | MySQL test riêng, có tạo/xóa database; đọc script trước |
| Auth browser | `npm run test:auth:browser` | Cần local app/browser; tạo dữ liệu QA |
| Full gate | `npm run check` | Lint/unit/runtime/build/contracts và network audit; báo bước bị chặn, không bỏ gate âm thầm |

Coverage đã khai báo: backend statements/lines/functions 90%, branches 85%; frontend statements/lines 85%, functions 80%, branches 70%. Không hạ ngưỡng để làm xanh. Microservices đọc `vitest.config.*` thay vì đoán.

## Rủi ro → test
Auth: 401, 403, refresh replay/concurrency, late response, logout-all, IdP giả lập/cancel/invalid nonce, public role escalation.
Tenant: role đúng tenant sai; pending/banned company; forged identity; owner changed after session.
Write: gửi hai lần, response mất sau commit, stale revision 409, quota dưới tranh chấp, không replay ghi sau refresh.
Recruitment: ID mapping, six stages, notes không lộ, emailQueued không được biến thành sent, result cũ không ghi đè.
Realtime: reconnect, duplicate clientMessageId, unauthorized room/PDF, revocation, PDF limits tách với AI.
UI: lỗi object resolved, empty và retry, form giữ dữ liệu, desktop/mobile, keyboard.

## Dừng đúng mức
Sửa tài liệu/token thuần: validate link/format và render phù hợp, không chạy toàn bộ DB/paid AI. Sửa logic: test nhánh/hành vi thật; tránh test chỉ lặp lại implementation. Chạy rộng hơn nếu còn rủi ro cụ thể hoặc gate yêu cầu.
Không gửi email/tin nhắn thật, gọi AI tính phí, seed/restore dữ liệu hay kích hoạt production chỉ để chứng minh test pass. Môi trường test phải được xác định và việc tác động nằm trong phạm vi người dùng cho phép.

## Release theo source
Đọc `scripts/release/README.md`, `scripts/manage-activation.mjs`, `microservices/docs/release-preparation.md` trước khi dùng `release:prepare`/`deploy:*`. Chuẩn bị diff, migration, backup/rollback, flag matrix và bằng chứng trước hành động triển khai. Chỉ deploy khi được yêu cầu/đã cho phép. Giữ nguyên audience/secrets, không print `.env`.
Báo cáo lệnh, exit status và hạn chế cụ thể. Ghi rõ chưa chạy nếu thiếu Node/dependencies/MySQL/Docker/browser/network/provider. Không tái sử dụng báo cáo test cũ như kết quả của phiên này.
