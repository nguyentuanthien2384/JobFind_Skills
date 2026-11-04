# Prompt thiết kế · EXT-JF-006-VERIFIED-REVIEWS · Đánh Giá Doanh Nghiệp Có Xác Thực & Trải Nghiệm Phỏng Vấn

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-006 ("Danh Mục Công Ty") & JF-007 ("Danh Sách Công Ty - Tuyển Dụng VN"), kích thước canvas 1280 × 1600; mã danh mục cục bộ là EXT-JF-006-VERIFIED-REVIEWS.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Đánh giá công ty có xác thực (Verified Candidate Reviews):
  + Huy hiệu "Đã từng phỏng vấn / Ứng tuyển thực tế": Liên kết trực tiếp bảng `companyReview` với dữ liệu lịch sử nộp CV và lịch phỏng vấn của người dùng trên hệ thống. Những đánh giá từ tài khoản thực sự đã trải qua quy trình phỏng vấn tại công ty đó sẽ có nhãn "Verified Candidate", tách biệt hoàn toàn với đánh giá từ người dùng vãng lai.
  + Đánh giá trải nghiệm phỏng vấn riêng biệt: Cho phép ứng viên chấm điểm sát quy trình tuyển dụng (Độ chuyên nghiệp của HR, Đề phỏng vấn có sát JD không, Có đúng giờ trên lịch hẹn không) ngay sau khi sự kiện trên lịch phỏng vấn kết thúc.
- Vai trò người dùng: CANDIDATE, PUBLIC, COMPANY.

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`.
- Bảng màu: Brand Primary `#004AC6`, Verified Green `#059669`, Gold Star `#F59E0B`.

**BÀN GIAO MÃ NGUỒN VÀ LIÊN KẾT**
- Mockup HTML hoàn chỉnh: `.stitch/designs/danh_gia_cong_ty_xac_thuc_verified_reviews/code.html`.
- Liên kết hệ thống: Nối trực tiếp từ JF-006/JF-007 (Công ty), JF-014 (Phỏng vấn), và JF-018 (Đơn ứng tuyển).
- Trạng thái thiết kế: `proposal-complete` (100% tiếng Việt tự nhiên).
