# EXT-JF-010-CANDIDATE-INSIGHTS · Chi Tiết Việc Làm - Báo Cáo Cạnh Tranh & Tích Điểm Xem Ứng Viên

## Identity và độ tin cậy
Feature `job-detail` · Sub-feature: `candidate-insights-points` · Actor: CANDIDATE, PUBLIC
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-010-CANDIDATE-INSIGHTS` (Biến thể mở rộng từ JF-010).
Canvas: 1280 × 2100 (DESKTOP).
Trạng thái thiết kế: `integrated-into-jf010` (Đã tích hợp trực tiếp thành phân hệ chuẩn trong `JF-010` - Chi Tiết Việc Làm Senior Frontend Developer, đồng thời giữ mã nguồn biến thể chuyên sâu `EXT-JF-010-CANDIDATE-INSIGHTS`).
Route status: `integrated-core-extension`.

## Sơ đồ tích hợp & Liên kết đa chiều trong hệ thống JobFind
Màn hình đã được kết nối khép kín hai chiều vào 5 màn hình chuẩn có sẵn của Stitch:
1. **JF-010 (job_detail_senior_frontend_developer - Màn hình mẹ):**
   - Tích hợp trực tiếp TopNavBar có số dư Điểm thưởng (45 Điểm / Hạng Bạc).
   - Banner cảnh báo tỉ lệ chọi (42 CV, 1:21) ngay trên Header Card với nút chuyển xem trực tiếp.
   - Tab Switcher [Báo Cáo Cạnh Tranh & Tỉ Lệ Chọi ⭐️] [Mô Tả & Yêu Cầu] [Tích Điểm Thưởng].
   - Khối Section Báo cáo cạnh tranh với cơ chế chuyển đổi trực quan giữa Trạng thái Khóa (mờ số liệu) và Mở Khóa (4 thẻ chỉ số, biểu đồ kinh nghiệm, AI Insight).
   - Thẻ Ví Điểm Thưởng Ứng Viên tại Sidebar với nút Nạp Điểm / Lịch sử.
2. **JF-036 (tuy_n_d_ng_vn_homepage - Trang chủ):**
   - Header widget điểm thưởng hiển thị xuyên suốt.
   - Hero banner giới thiệu đặc quyền mở khóa tỉ lệ chọi cho ứng viên.
   - Tin tuyển dụng VNG Corporation trên trang chủ mang badge "42 CV đã nộp • Tỉ lệ chọi 1 : 21" dẫn thẳng về báo cáo.
3. **JF-037 (tuy_n_d_ng_vn_search_results - Tìm kiếm việc làm):**
   - Bổ sung bộ lọc chuyên sâu "Có Báo Cáo Cạnh Tranh (Insights)".
   - Kết quả tìm kiếm Senior Frontend Developer nổi bật với nhãn cạnh tranh và nút tắt "Xem Báo Cáo Cạnh Tranh".
4. **JF-009 (h_s_c_a_t_i_tuy_n_d_ng_vn - Hồ sơ cá nhân ứng viên):**
   - Tích hợp Thẻ Ví Điểm Thưởng (45 Điểm, Hạng Bạc) và danh sách báo cáo cạnh tranh đã mở khóa gần nhất.
5. **JF-003 (billing_subscriptions - Nạp tiền & Đăng ký gói):**
   - Bổ sung phân hệ "Gói Nạp Xu & Điểm Thưởng Ứng Viên (JobFind Rewards)" gồm 3 gói nạp điểm (20.000đ, 45.000đ, 99.000đ) để mở khóa báo cáo vị trí Senior Frontend Developer.

## Source mapping
Route: `/detail-job/:id` (kết hợp tab/query `?tab=insights`)
Component dự kiến: `container/JobDetail/JobDetail.js` kết hợp `components/JobDetail/ApplicationInsightsCard.js` và `components/modal/UnlockInsightsModal.js`
Adapter API: `frontend/src/service/jobService.js`, `frontend/src/service/pointService.js`

## Sections chính của màn hình
1. **TopNavBar:** Logo JobFind, menu chính, widget số dư điểm thưởng (45 Điểm / 45.000 Xu - Hạng Bạc), thông báo, avatar ứng viên.
2. **Breadcrumb:** Điều hướng phân cấp ngành nghề và công ty.
3. **Job Header Card:** Thông tin vị trí tuyển dụng, mức lương 25 - 40M, địa điểm, hạn nộp, nút Nộp CV và Lưu tin.
4. **Báo Cáo Ứng Tuyển & Tỉ Lệ Cạnh Tranh (Mô hình TopCV Insights):**
   - **Trạng thái Khóa (Locked State):** Dữ liệu bị làm mờ, ổ khóa bảo mật, nút chọn thanh toán bằng Điểm thưởng (10 Điểm) hoặc Nạp Xu (10.000 VNĐ).
   - **Trạng thái Mở Khóa (Unlocked State):** Hiển thị số lượng CV đã nộp (42 hồ sơ), tỉ lệ chọi (1 : 21), lương kỳ vọng đối thủ (31.8 triệu), độ phù hợp hồ sơ (88%), biểu đồ phân bổ số năm kinh nghiệm.
   - **Chính sách tích điểm:** Thưởng +5 Điểm tích lũy khi hoàn thành ứng tuyển.
5. **Nội dung JD chi tiết:** Mô tả công việc, yêu cầu ứng viên, quyền lợi & đãi ngộ.
6. **Sidebar:** Thông tin doanh nghiệp (VNG Corporation), Thẻ Ví điểm thưởng ứng viên (Nạp thêm điểm / Mua gói xu / Lịch sử), Sticky CTA ứng tuyển.

## Assets
- Mockup màn hình tích hợp: `.stitch/designs/job_detail_senior_frontend_developer/code.html` (JF-010)
- Mockup màn hình mở rộng chuyên sâu: `.stitch/designs/job_detail_candidate_insights_points/code.html` (EXT-JF-010-CANDIDATE-INSIGHTS)
- Màn hình kết nối: `.stitch/designs/tuy_n_d_ng_vn_homepage/code.html`, `.stitch/designs/tuy_n_d_ng_vn_search_results/code.html`, `.stitch/designs/h_s_c_a_t_i_tuy_n_d_ng_vn/code.html`, `.stitch/designs/billing_subscriptions/code.html`
- Prompt Stitch: `.stitch/prompts/EXT-JF-010-CANDIDATE-INSIGHTS.md` và `.stitch/prompts/JF-010.md`
- Token styling: Material 3, Tailwind CSS, Google Fonts (`Be Vietnam Pro` & `Inter`).

## Handoff và ghi nhận
- Dữ liệu hiển thị mang tính tổng hợp bảo mật, không để lộ thông tin định danh cá nhân của các ứng viên khác.
- Giao diện đáp ứng 100% tiếng Việt chuẩn hóa và liên kết điều hướng thông suốt trên toàn bộ hệ thống.
