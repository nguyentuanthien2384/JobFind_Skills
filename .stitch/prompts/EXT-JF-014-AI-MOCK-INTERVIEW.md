# Prompt thiết kế · EXT-JF-014-AI-MOCK-INTERVIEW · AI Huấn Luyện Viên Phỏng Vấn Sát JD & CV

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-014 ("Lịch Phỏng Vấn - Career Architect"), kích thước canvas 1280 × 1600; mã danh mục cục bộ là EXT-JF-014-AI-MOCK-INTERVIEW.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Nâng cấp AI từ "Chấm điểm một chiều" sang "Huấn luyện viên cá nhân":
  + AI Mock Interview (Phỏng vấn thử sát theo từng JD): Khi ứng viên nhận được lịch phỏng vấn trên `interview-calendar`, cung cấp nút "Luyện phỏng vấn vị trí này với AI".
  + Chatbot sẽ dựa vào nội dung bài đăng (`detailpost`) và CV của ứng viên để đóng vai nhà tuyển dụng (Tech Lead), đặt 5 câu hỏi chuyên môn/tình huống và nhận xét điểm mạnh, điểm yếu trong câu trả lời của ứng viên.
- Vai trò người dùng: CANDIDATE (Ứng viên tìm việc).

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`.
- Bảng màu: Brand Primary `#004AC6`, AI Purple `#7C3AED` / `#9333EA`, Success Green `#059669`.

**BÀN GIAO MÃ NGUỒN VÀ LIÊN KẾT**
- Mockup HTML hoàn chỉnh: `.stitch/designs/luyen_phong_van_ai_mock_interview_jd/code.html`.
- Liên kết hệ thống: Nối trực tiếp từ `JF-013`/`JF-014` (Lịch phỏng vấn), `JF-010` (Job detail), và chat `JF-030`.
- Trạng thái thiết kế: `proposal-complete` (100% tiếng Việt tự nhiên).
