# Prompt thiết kế · EXT-JF-010-CANDIDATE-INSIGHTS · Chi Tiết Việc Làm - Báo Cáo Cạnh Tranh & Tích Điểm Xem Ứng Viên

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-010 ("Job Detail - Senior Frontend Developer"), kích thước canvas 1280 × 2100; mã danh mục cục bộ là EXT-JF-010-CANDIDATE-INSIGHTS. Giữ nguyên 37 màn hình gốc và bổ sung màn hình này vào backlog thiết kế.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Báo cáo ứng tuyển, tỉ lệ cạnh tranh và cơ chế tích điểm / nạp tiền mở khóa xem số lượng ứng viên đã nộp CV (tương tự mô hình TopCV Insights & Top Point).
- Vai trò người dùng: CANDIDATE (Ứng viên tìm việc), PUBLIC (Khách vãng lai).
- Hành động chính:
  1. Xem chi tiết tin tuyển dụng của công ty/doanh nghiệp.
  2. Xem widget Báo cáo ứng tuyển ở trạng thái Khóa (Locked State): hiển thị số lượng CV đã nộp bị mờ/ẩn, thông báo yêu cầu tích điểm hoặc nạp tiền để mở khóa.
  3. Chọn phương thức mở khóa: Dùng Điểm thưởng tích lũy (Top Point / JobFind Points, ví dụ: 10 Điểm) hoặc Nạp tiền / Xu (10.000 VNĐ / Lượt).
  4. Xem dữ liệu phân tích sau khi mở khóa (Unlocked State): Số lượng chính xác CV đã nộp (42 ứng viên), tỉ lệ chọi (1 : 21), cơ cấu kinh nghiệm đối thủ, mức lương kỳ vọng trung bình và độ phù hợp hồ sơ.
  5. Tích điểm thưởng tự động (+5 Điểm) khi nộp CV thành công vào tin tuyển dụng.

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`.
- Bảng màu chuẩn:
  - Surface nền: `#F7F9FB`, Text chính: `#191C1E`, Text phụ: `#434655`.
  - Brand Primary: `#004AC6` (Xanh dương thương hiệu), Primary Container: `#2563EB`.
  - Accent / Rewards: `#F59E0B` - `#D97706` (Vàng Gold cho Điểm thưởng / Huy hiệu thành viên / Nạp tiền).
  - Success / Trạng thái mở khóa: `#059669` (Xanh lục bảo).
  - Surface cards: `#FFFFFF` với border `#E0E3E5` / `#C3C6D7` và bóng đổ nhẹ `ambient-shadow`.
- Iconography: Google Material Symbols Outlined (`lock`, `lock_open`, `stars`, `query_stats`, `payments`, `send`, `bookmark`).

**CẤU TRÚC TRANG (PAGE STRUCTURE)**
1. **Thanh điều hướng trên cùng (TopNavBar):**
   - Logo JobFind, menu Tìm việc làm / Danh sách công ty / Cẩm nang nghề nghiệp / Tạo CV.
   - Widget hiển thị số dư điểm tích lũy của ứng viên: *"Số dư: 45 Điểm (45.000 Xu) • Hạng Bạc"*.
   - Chuông thông báo, Avatar ứng viên, nút chuyển sang cổng Doanh nghiệp.
2. **Breadcrumb:** Trang Chủ > Việc Làm CNTT > VNG Corporation > Senior Frontend Developer.
3. **Thẻ tiêu đề tin tuyển dụng (Job Header Card):**
   - Logo VNG Corporation, tiêu đề vị trí, huy hiệu Doanh nghiệp xác thực, trạng thái đang tuyển dụng.
   - Thẻ metadata: Địa điểm (Quận 7, TP.HCM), Hình thức (Hybrid/Full-time), Mức lương (25 - 40 Triệu), Hạn nộp hồ sơ.
   - Cụm nút CTA: "Nộp CV Ứng Tuyển", "Lưu Tin", "Chia Sẻ".
4. **Bố cục 2 cột (Main Content 780px + Sidebar 400px):**
   - **Cột trái (Nội dung chính):**
     * **KHỐI TÍNH NĂNG MỚI: Báo Cáo Ứng Tuyển & Tỉ Lệ Cạnh Tranh (TopCV Model):**
       + **Trạng thái Khóa (Locked State):** Nền làm mờ (blur backdrop) các thông số đối thủ, icon ổ khóa vàng, thông điệp kêu gọi mở khóa, 2 lựa chọn thanh toán: "Dùng 10 Điểm tích lũy" (Số dư 45 điểm - Đủ điều kiện) hoặc "Nạp Xu 10.000 VNĐ / Lượt". Nút CTA mở khóa tức thì.
       + **Trạng thái Đã Mở Khóa (Unlocked State):** Banner xác nhận đã mở khóa (hiệu lực 30 ngày). 4 thẻ chỉ số: Tổng CV đã nộp (42 hồ sơ), Tỉ lệ cạnh tranh (1 : 21), Mức lương kỳ vọng trung bình (31.8 triệu), Độ phù hợp hồ sơ của ứng viên (88% - Top 15%). Biểu đồ thanh ngang phân bổ số năm kinh nghiệm của các ứng viên khác (Dưới 3 năm: 16%, 3-5 năm: 58%, Trên 5 năm: 26%). Đánh giá đề xuất từ AI.
       + **Footer khối báo cáo:** Thông báo cơ chế thưởng điểm (+5 Điểm khi ứng tuyển thành công).
     * **Các phần JD tiêu chuẩn:** Mô Tả Công Việc, Yêu Cầu Ứng Viên, Quyền Lợi & Đãi Ngộ.
   - **Cột phải (Sidebar):**
     * Thẻ thông tin công ty VNG Corporation (Quy mô 2.000+ nhân sự, ngành nghề, địa chỉ, link trang công ty).
     * Thẻ Quản Lý Điểm Thưởng & Nạp Xu Ứng Viên (Hiển thị chi tiết số dư, phân hạng thành viên Bạc, nút Nạp Thêm Điểm / Mua Gói Xu, Lịch sử dùng điểm).
     * Thẻ Sticky CTA nhắc ứng tuyển.
5. **Chân trang (Footer):** Thông tin bản quyền JobFind, chính sách quy chế tích điểm và bảo mật.

**QUY CHUẨN NGHIỆP VỤ (BUSINESS GUARDRAILS)**
- Ứng viên chỉ xem được báo cáo số lượng và phân tích đối thủ cạnh tranh khi đã đăng nhập và thực hiện mở khóa bằng Điểm tích lũy hoặc Xu nạp.
- Điểm thưởng được tích lũy thông qua các hoạt động: hoàn thiện hồ sơ CV (100%), điểm danh hằng ngày, nộp hồ sơ ứng tuyển thành công, hoặc mua trực tiếp qua cổng thanh toán (VNPAY/MoMo).
- Bảo mật thông tin: Chỉ hiển thị dữ liệu tổng hợp (aggregated metrics), tuyệt đối không để lộ danh tính cá nhân hoặc thông tin liên hệ của các ứng viên khác.
- Route dự kiến: `/detail-job/:id` (kèm query/state `?tab=insights`).

**NỘI DUNG VÀ BÀN GIAO (CONTENT AND HANDOFF)**
- BẮT BUỘC 100% TIẾNG VIỆT tự nhiên cho toàn bộ giao diện.
- Mockup HTML hoàn chỉnh đã được lưu tại: `.stitch/designs/job_detail_candidate_insights_points/code.html`.
- Trạng thái thiết kế: `proposal-complete` (đã xây dựng mã nguồn HTML hoàn chỉnh, sẵn sàng import lên Stitch project `4225480897019041322`).
