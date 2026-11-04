# EXT-JF-012-REVERSE-RECRUITING · Tuyển Dụng Đảo Chiều & Hồ Sơ Ẩn Danh (Blind Profile)

## Identity và độ tin cậy
Feature `candidate-search` · Sub-feature: `reverse-recruiting-blind-bidding` · Actor: CANDIDATE, EMPLOYER
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-012-REVERSE-RECRUITING` (Biến thể mở rộng từ JF-012).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/candidates/reverse-market` (hoặc `/employer/reverse-recruiting`).

## Nghiệp vụ cốt lõi
1. **Giải quyết rào cản ứng viên đang có việc làm:** Ứng viên sợ sếp hoặc HR công ty hiện tại phát hiện khi bật tìm việc. Chế độ Blind Profile trong `userSetting` ẩn toàn bộ danh tính cá nhân và công ty hiện tại.
2. **Cơ chế Offer-First Bidding:** Doanh nghiệp muốn tiếp cận ứng viên không thể "xem chùa" CV hay gọi điện làm phiền; bắt buộc phải gửi lời mời phỏng vấn với khung lương đề xuất cụ thể (ví dụ 40 - 55 triệu/tháng).
3. **Mở khóa hai chiều an toàn:** Khi ứng viên bấm "Chấp nhận Offer-First", hệ thống mới gỡ bỏ mặt nạ ẩn danh và tự động kết nối phòng chat `chatMessage` bảo mật giữa 2 bên.

## Source mapping
- Frontend: `frontend/src/container/Candidate/ReverseRecruiting.js`, `frontend/src/container/employer/BlindTalentPool.js`
- Adapter API: `frontend/src/service/userService.js`, `frontend/src/service/chatService.js`, `frontend/src/service/orderPackageService.js`
- Backend Controller/Model: `backend/src/controllers/userController.js`, `backend/src/controllers/chatController.js`, models `UserSetting`, `OfferFirstBid`, `ChatMessage`.

## Assets
- Mockup HTML: `.stitch/designs/tuyen_dung_dao_chieu_blind_profile_bidding/code.html`
- Prompt: `.stitch/prompts/EXT-JF-012-REVERSE-RECRUITING.md`
- Màn hình liên kết: `JF-012` (Kho ứng viên), `JF-009` (Hồ sơ cá nhân), `JF-030`/`JF-031` (Trò chuyện).
