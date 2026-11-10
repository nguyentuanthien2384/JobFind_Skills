# Prompt thiết kế · EXT-JF-014-AI-MOCK-INTERVIEW · AI Huấn Luyện Viên Phỏng Vấn Đa Ngành Sát JD & CV

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-014 ("Lịch Phỏng Vấn - Career Architect"), kích thước canvas 1280 × 1600; mã danh mục cục bộ là EXT-JF-014-AI-MOCK-INTERVIEW.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Nâng cấp AI từ "Chấm điểm một chiều" sang "Huấn luyện viên phỏng vấn cá nhân đa ngành":
  + Bảng `MockInterviewSessions` (`id`, `userId`, `postId`, `questions`, `transcript`, `overallScore`, `feedback`, `status`).
  + Kết nối `POST /api/mock-interview/start` và `POST /api/mock-interview/:sessionId/submit` dựa trên dữ liệu `post.js`/`detailpost.js` và `userSkill.js` để đóng vai Trưởng bộ phận (Sales Director, Marketing CMO, Kế toán trưởng / HR Director, Tech Lead IT), đặt 5 câu hỏi tình huống thực chiến và trả về nhận xét điểm mạnh, điểm yếu cùng gợi ý cải thiện CV trước khi ứng viên nộp thật.
- Vai trò người dùng: CANDIDATE (Ứng viên tìm việc).

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`.
- Bảng màu: Brand Primary `#004AC6`, AI Purple `#7C3AED` / `#9333EA`, Success Green `#059669`.

**BÀN GIAO MÃ NGUỒN VÀ LIÊN KẾT**
- Mockup HTML hoàn chỉnh: `.stitch/designs/luyen_phong_van_ai_mock_interview_jd/code.html`.
- Liên kết hệ thống: Nối trực tiếp từ `JF-013`/`JF-014` (Lịch phỏng vấn), `JF-010` (Job detail), và chat `JF-030`.
- Trạng thái thiết kế: `proposal-complete` (100% tiếng Việt tự nhiên).
