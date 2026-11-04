# Prompt thiết kế · EXT-JF-018-PIZZA-TRACKER · Pizza-Tracker Tiến Trình Ứng Tuyển & SLA Phản Hồi

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-018 ("Đơn Ứng Tuyển Của Tôi - Tuyển Dụng VN"), kích thước canvas 1280 × 1700; mã danh mục cục bộ là EXT-JF-018-PIZZA-TRACKER.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Quy trình tuyển dụng minh bạch & Chống "Ghosting":
  1. Application Tracker dạng tiến trình trực quan ("Pizza-Tracker cho CV"): Hiển thị trạng thái hồ sơ theo thời gian thực cho ứng viên: Đã nộp $\rightarrow$ AI đã phân tích $\rightarrow$ HR đang mở xem (`candidateView`) $\rightarrow$ Ghi chú đánh giá (`note`) $\rightarrow$ Đặt lịch phỏng vấn.
  2. Chỉ số "SLA Phản hồi" của Nhà tuyển dụng: Tính toán tự động thời gian trung bình từ lúc ứng viên nộp CV đến khi công ty xem hoặc phản hồi để gắn huy hiệu công ty ("Công ty phản hồi 94% hồ sơ trong vòng 48h").
  3. Constructive AI Rejection (Phản hồi từ chối có giá trị xây dựng): Tự động chuyển hóa ghi chú nội bộ của HR thành thư phản hồi ấm áp, nêu rõ 2 kỹ năng còn thiếu và gợi ý vị trí cấp độ thấp hơn phù hợp trên sàn.
- Vai trò người dùng: CANDIDATE (Ứng viên tìm việc), EMPLOYER (Nhà tuyển dụng).

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`.
- Bảng màu: Brand Primary `#004AC6`, Success Green `#059669`, Realtime Blue `#2563EB`, Constructive Amber `#D97706`.

**BÀN GIAO MÃ NGUỒN VÀ LIÊN KẾT**
- Mockup HTML hoàn chỉnh: `.stitch/designs/don_ung_tuyen_pizza_tracker_sla_realtime/code.html`.
- Liên kết hệ thống: Nối trực tiếp từ luồng nộp CV `JF-024`, thông báo `JF-033`, lịch phỏng vấn `JF-014`, và chat `JF-030`.
- Trạng thái thiết kế: `proposal-complete` (100% tiếng Việt tự nhiên).
