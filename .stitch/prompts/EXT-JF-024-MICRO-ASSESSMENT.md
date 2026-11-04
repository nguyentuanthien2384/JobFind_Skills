# Prompt thiết kế · EXT-JF-024-MICRO-ASSESSMENT · Micro-Assessment Lọc Spam Nộp CV

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-024 ("Ứng tuyển: Senior UI/UX Designer (Desktop)"), kích thước canvas 1280 × 1600; mã danh mục cục bộ là EXT-JF-024-MICRO-ASSESSMENT.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Micro-Assessment (Bài kiểm tra ngắn gắn liền với bước nộp CV): Cho phép nhà tuyển dụng gắn kèm 3–5 câu hỏi tình huống hoặc bài test code/trắc nghiệm ngắn (giới hạn 5–10 phút) vào bài đăng (`post` / `detailpost`). Hồ sơ kèm kết quả giải bài sẽ giúp HR lọc ngay ứng viên rải CV hàng loạt (spam apply).
- Vai trò người dùng: CANDIDATE (Ứng viên tìm việc), EMPLOYER (Nhà tuyển dụng).
- Hành động chính:
  1. Theo dõi đồng hồ đếm ngược trực quan (Countdown Timer giới hạn 10 phút).
  2. Trả lời các câu hỏi tình huống trắc nghiệm và code review thực tế bám sát JD vị trí.
  3. Hoàn thành đoạn code logic ngắn (useDebounce custom hook).
  4. Trình bày phương án giải quyết tình huống lỗi production thực tế.
  5. Đính kèm điểm số tự động vào đơn ứng tuyển để vượt qua phễu lọc spam tự động.

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`, Code `JetBrains Mono`.
- Bảng màu: Brand Primary `#004AC6`, Success `#059669`, Warning Timer `#F59E0B`, Dark Snippet `#0F172A`.

**BÀN GIAO MÃ NGUỒN VÀ LIÊN KẾT**
- Mockup HTML hoàn chỉnh: `.stitch/designs/ung_tuyen_micro_assessment_test_nang_luc/code.html`.
- Liên kết hệ thống: Nối trực tiếp từ trang JD `JF-010`, luồng nộp CV `JF-022`/`JF-023`/`JF-024`, sang Pizza-Tracker `EXT-JF-018-PIZZA-TRACKER` và phễu tuyển dụng Kanban `JF-025`.
- Trạng thái thiết kế: `proposal-complete` (100% tiếng Việt tự nhiên).
