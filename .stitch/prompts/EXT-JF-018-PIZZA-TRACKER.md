# Prompt thiết kế · EXT-JF-018-PIZZA-TRACKER · Anti-Ghosting Pizza-Tracker, Chỉ Số SLA & Constructive AI Rejection

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-018 ("Đơn Ứng Tuyển Của Tôi - Tuyển Dụng VN"), kích thước canvas 1280 × 1700; mã danh mục cục bộ là EXT-JF-018-PIZZA-TRACKER.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Quy trình tuyển dụng minh bạch & Chống "Ghosting" cho mọi ngành nghề:
  1. Application Tracker dạng tiến trình trực quan ("Pizza-Tracker cho CV"): Mở rộng `Cvs` với `applicationStage` (`SUBMITTED`, `AI_SCREENED`, `HR_VIEWED`, `SHORTLISTED`, `INTERVIEW_SCHEDULED`, `OFFERED`, `REJECTED`), `stageUpdatedAt`, `hrViewedAt` và bắn sự kiện thời gian thực `cv:stage_updated` qua `socket.js`.
  2. Chỉ số "SLA Phản hồi" của Nhà tuyển dụng: Mở rộng `Companies` với `avgResponseHours` và `responseRate` (% hồ sơ xử lý trong vòng 72 giờ).
  3. Constructive AI Rejection (`aiFeedbackForCandidate`): Khi HR chuyển trạng thái sang `'REJECTED'` kèm ghi chú nội bộ trong `note.js`, AI tự động biên tập thành thư góp ý lịch sự và đính kèm 3 bài đăng (`post.js`) ở phân khúc phù hợp hơn.
- Vai trò người dùng: CANDIDATE (Ứng viên tìm việc), EMPLOYER / COMPANY (Nhà tuyển dụng).

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`.
- Bảng màu: Brand Primary `#004AC6`, Success Green `#059669`, Realtime Blue `#2563EB`, Constructive Amber `#D97706`.

**BÀN GIAO MÃ NGUỒN VÀ LIÊN KẾT**
- Mockup HTML hoàn chỉnh: `.stitch/designs/don_ung_tuyen_pizza_tracker_sla_realtime/code.html`.
- Liên kết hệ thống: Nối trực tiếp từ luồng nộp CV `JF-024`, thông báo `JF-033`, lịch phỏng vấn `JF-014`, và chat `JF-030`.
- Trạng thái thiết kế: `proposal-complete` (100% tiếng Việt tự nhiên).
