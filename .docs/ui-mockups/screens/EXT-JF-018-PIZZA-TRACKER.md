# EXT-JF-018-PIZZA-TRACKER · Pizza-Tracker Tiến Trình Ứng Tuyển & SLA Phản Hồi

## Identity và độ tin cậy
Feature `applications` · Sub-feature: `pizza-tracker-sla-rejection` · Actor: CANDIDATE, EMPLOYER
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-018-PIZZA-TRACKER` (Biến thể mở rộng từ JF-018).
Canvas: 1280 × 1700 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/my-applications/tracker` (hoặc `/candidate/applications/:id`).

## Nghiệp vụ cốt lõi
1. **Chống "Ghosting" ứng viên:** Ứng viên nắm bắt chính xác tiến độ hồ sơ theo 5 bước: Đã nộp $\rightarrow$ AI phân tích $\rightarrow$ HR đang mở xem (Realtime presence) $\rightarrow$ Ghi chú đánh giá $\rightarrow$ Đặt lịch phỏng vấn.
2. **Chỉ số SLA phản hồi của công ty:** Thống kê tự động từ timestamp tạo đơn và phản hồi, gắn huy hiệu minh bạch "Công ty phản hồi 94% hồ sơ trong 48h".
3. **Constructive AI Rejection:** Chuyển hóa ghi chú nội bộ từ chối hồ sơ thành thư phản hồi mang tính cố vấn phát triển kỹ năng và đề xuất việc làm tương thích.

## Source mapping
- Frontend: `frontend/src/container/Candidate/ApplicationTracker.js`
- Adapter API: `frontend/src/service/applicationService.js`, `frontend/src/service/notificationService.js`
- Backend Controller/Model: `backend/src/controllers/cvController.js`, models `Application`, `CandidateView`, `Note`.

## Assets
- Mockup HTML: `.stitch/designs/don_ung_tuyen_pizza_tracker_sla_realtime/code.html`
- Prompt: `.stitch/prompts/EXT-JF-018-PIZZA-TRACKER.md`
- Màn hình liên kết: `JF-018` (Đơn ứng tuyển), `JF-025` (Phễu tuyển dụng), `JF-033` (Thông báo).
