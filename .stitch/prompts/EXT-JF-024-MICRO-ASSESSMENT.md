# Prompt thiết kế · EXT-JF-024-MICRO-ASSESSMENT · Situational Micro-Assessment Đa Ngành Lọc Spam Nộp CV

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-024 ("Ứng tuyển: Senior UI/UX Designer (Desktop)"), kích thước canvas 1280 × 1600; mã danh mục cục bộ là EXT-JF-024-MICRO-ASSESSMENT.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Situational Micro-Assessment (Bài kiểm tra tình huống nghề nghiệp đa ngành gắn liền với bước nộp CV):
  + Mở rộng bảng `DetailPosts` (`hasMicroTest`, `microTestPrompt`, `microTestTimeLimit = 300s`) và `Cvs` (`microTestAnswer`, `aiSituationalScore` thang 1–10, `aiEvaluationSummary` gồm 3 tiêu chí: Độ hiểu nghiệp vụ, Tư duy giải quyết vấn đề, Mức độ phù hợp JD).
  + Hỗ trợ đa ngành nghề: Sales/CSKH (xử lý khách hàng phàn nàn về giá), Marketing/Truyền thông (chiến dịch ngắn gọn 150 từ với ngân sách giả định), Kế toán/Nhân sự/Hành chính (xử lý sai lệch chứng từ hoặc xung đột nội bộ), và IT/Phần mềm.
  + Cho phép HR bấm `POST /api/ai/generate-micro-test` để AI sinh sẵn 3 câu hỏi tình huống sát ngành nghề, và chấm tự động qua `POST /api/ai/evaluate-situational-answer`.
- Vai trò người dùng: CANDIDATE (Ứng viên tìm việc), EMPLOYER / COMPANY (Nhà tuyển dụng).

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`, Code `JetBrains Mono`.
- Bảng màu: Brand Primary `#004AC6`, Success `#059669`, Warning Timer `#F59E0B`, Dark Snippet `#0F172A`.

**BÀN GIAO MÃ NGUỒN VÀ LIÊN KẾT**
- Mockup HTML hoàn chỉnh: `.stitch/designs/ung_tuyen_micro_assessment_test_nang_luc/code.html`.
- Liên kết hệ thống: Nối trực tiếp từ trang JD `JF-010`, đăng tin `JF-021`, luồng nộp CV `JF-022`/`JF-023`/`JF-024`, sang Pizza-Tracker `EXT-JF-018-PIZZA-TRACKER` và phễu tuyển dụng Kanban `JF-025`.
- Trạng thái thiết kế: `proposal-complete` (100% tiếng Việt tự nhiên).
