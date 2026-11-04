# Prompt thiết kế · EXT-JF-009-PROOF-OF-SKILL · Xác Thực Năng Lực Thực Tế & GitHub Portfolio

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-009 ("Hồ Sơ Của Tôi - Tuyển Dụng VN"), kích thước canvas 1280 × 1600; mã danh mục cục bộ là EXT-JF-009-PROOF-OF-SKILL.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Xác thực năng lực thực tế (Proof-of-Skill) thay vì CV tự khai. Đồng bộ và phân tích Portfolio/GitHub tự động: Tận dụng luồng đăng nhập GitHub (`github-acceptance`) và định danh (`authIdentity`) có sẵn trong dự án để gọi GitHub API lấy dữ liệu public repositories, ngôn ngữ lập trình sử dụng nhiều nhất, tần suất commit và tự động gắn nhãn "Kỹ năng đã xác thực qua mã nguồn" vào bảng `userSkill`.
- Vai trò người dùng: CANDIDATE (Ứng viên tìm việc).
- Hành động chính:
  1. Xem tổng quan chỉ số tin cậy Proof-of-Skill (98% Trust Score, Hạng A+ Verified).
  2. Xem Biểu đồ đóng góp mã nguồn 365 ngày (Heatmap Commit Activity) chứng minh tính kỷ luật lập trình liên tục.
  3. Xem Bảng phân bổ ngôn ngữ lập trình theo Lines of Code (TypeScript 48%, JavaScript 26%, React 14%...).
  4. Xem Bảng kỹ năng `userSkill` với nhãn phân định rõ ràng giữa: "Kỹ năng đã xác thực qua mã nguồn" (React, TypeScript, Redux) và "CV tự khai chưa có repo đối chiếu" (Docker/CI-CD).
  5. Xem danh mục Top Repositories nổi bật được phân tích tự động (Clean code index, Storybook, Architecture grade).
  6. Thao tác đồng bộ dữ liệu tức thời qua GitHub OAuth2 hoặc xuất báo cáo Proof-of-Skill PDF.

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`.
- Bảng màu chuẩn:
  - Surface nền: `#F7F9FB`, Text chính: `#191C1E`, Text phụ: `#434655`.
  - Brand Primary: `#004AC6` (Xanh dương thương hiệu), Primary Container: `#2563EB`.
  - Verified Green: `#059669` / `#10B981` (Huy hiệu xác thực mã nguồn, commit cells mức cao).
  - GitHub Dark: `#161B22` / `#24292F`.
  - Warning Gold: `#F59E0B` (Nhãn CV tự khai cần kiểm chứng).
- Iconography: Google Material Symbols Outlined (`verified`, `analytics`, `data_object`, `code`, `shield_with_heart`, `sync`).

**BÀN GIAO MÃ NGUỒN VÀ LIÊN KẾT**
- Mockup HTML hoàn chỉnh: `.stitch/designs/ho_so_xac_thuc_nang_luc_github_proof_of_skill/code.html`.
- Liên kết hệ thống: Nối trực tiếp với màn hình hồ sơ `JF-009`, màn hình tìm kiếm ứng viên của nhà tuyển dụng `JF-012`, và luồng nộp CV `JF-024`.
- Trạng thái thiết kế: `proposal-complete` (100% tiếng Việt tự nhiên).
