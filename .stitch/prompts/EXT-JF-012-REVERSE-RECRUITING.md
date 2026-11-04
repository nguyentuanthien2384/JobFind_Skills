# Prompt thiết kế · EXT-JF-012-REVERSE-RECRUITING · Tuyển Dụng Đảo Chiều & Hồ Sơ Ẩn Danh

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-012 ("Kho Ứng Viên - Tuyển Dụng VN"), kích thước canvas 1280 × 1600; mã danh mục cục bộ là EXT-JF-012-REVERSE-RECRUITING.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Tuyển dụng đảo chiều (Reverse Recruiting) & Hồ sơ ẩn danh:
  + Chế độ Blind Profile (Hồ sơ ẩn danh): Bổ sung cấu hình trong `userSetting` cho phép ẩn tên thật, ảnh đại diện, email và tên công ty hiện tại; chỉ hiển thị kỹ năng (`userSkill`), số năm kinh nghiệm, dự án đã làm và mức lương mong muốn.
  + Cơ chế "Bidding / Offer-First": Khi nhà tuyển dụng dùng gói `orderPackageCv` để tìm ứng viên, họ phải gửi "Lời mời phỏng vấn kèm khung lương đề xuất". Chỉ khi ứng viên bấm chấp nhận lời mời, hệ thống mới mở khóa thông tin cá nhân và tự động khởi tạo phòng chat (`chatMessage`) giữa hai bên.
- Vai trò người dùng: CANDIDATE (Ứng viên tìm việc), EMPLOYER (Nhà tuyển dụng).

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`.
- Bảng màu: Brand Primary `#004AC6`, Blind Dark `#0F172A`, Gold Accent `#F59E0B`, Success `#059669`.

**BÀN GIAO MÃ NGUỒN VÀ LIÊN KẾT**
- Mockup HTML hoàn chỉnh: `.stitch/designs/tuyen_dung_dao_chieu_blind_profile_bidding/code.html`.
- Liên kết hệ thống: Nối trực tiếp từ Kho ứng viên `JF-012`, gói dịch vụ `JF-003`, phòng chat `JF-030`/`JF-031`, và cài đặt hồ sơ `JF-009`.
- Trạng thái thiết kế: `proposal-complete` (100% tiếng Việt tự nhiên).
