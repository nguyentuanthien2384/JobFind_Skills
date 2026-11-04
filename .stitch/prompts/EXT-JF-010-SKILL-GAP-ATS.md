# Prompt thiết kế · EXT-JF-010-SKILL-GAP-ATS · Đối Sánh Khoảng Cách Kỹ Năng & ATS Simulator

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-010 ("Job Detail - Senior Frontend Developer"), kích thước canvas 1280 × 1600; mã danh mục cục bộ là EXT-JF-010-SKILL-GAP-ATS.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Biểu đồ khoảng cách kỹ năng (Skill Gap & ATS Simulator): Trước khi ứng viên bấm nộp CV, hiển thị biểu đồ đối sánh trực tiếp giữa `userSkill` và danh sách kỹ năng của công việc, đồng thời gợi ý bổ sung các từ khóa còn thiếu vào CV để vượt qua bộ lọc tự động.
- Vai trò người dùng: CANDIDATE (Ứng viên tìm việc).

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`.
- Bảng màu: Brand Primary `#004AC6`, Success `#059669`, Warning Gap `#F59E0B`.

**BÀN GIAO MÃ NGUỒN VÀ LIÊN KẾT**
- Mockup HTML hoàn chỉnh: `.stitch/designs/doi_sanh_ky_nang_skill_gap_ats_simulator/code.html`.
- Liên kết hệ thống: Nối trực tiếp từ JF-010 sang luồng nộp CV `JF-024` và Micro-Assessment `EXT-JF-024-MICRO-ASSESSMENT`.
- Trạng thái thiết kế: `proposal-complete` (100% tiếng Việt tự nhiên).
