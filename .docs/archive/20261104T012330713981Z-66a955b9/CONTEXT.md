# JobFind — Context · 15/10/2026

Bộ skills v3 được xây từ skills.zip, source JobFind và exact Stitch 37 màn. Dự án Stitch và toàn bộ tài liệu đặc tả thiết kế đã được chuyển ngữ 100% sang tiếng Việt chuẩn theo yêu cầu người dùng.

## Đã có
42 skills (14 cập nhật + 28 bổ sung), 31 feature slices × 6 docs, 25 workflows, 18 templates. Có 37 ảnh/HTML gốc, screen contracts/prompts (toàn bộ 37 prompt .stitch/prompts/ đã Việt hóa hoàn chỉnh) và bảng route coverage 94 declarations/92 unique patterns. API catalog static: 124 legacy endpoints, 71 modern operations/42 schemas, 32 Sequelize model files. Toàn bộ mã HTML thiết kế mockups (.stitch/designs/) đã được bản địa hóa sang tiếng Việt tự nhiên (Thanh toán & Gói dịch vụ, Duyệt hồ sơ công ty, Hộp thư & Tin nhắn, Bảng điều khiển quản trị, v.v.). Kết quả verify_bundle.py: 0 lỗi.

## Thiết kế
Stitch: https://stitch.withgoogle.com/projects/4225480897019041322 (toàn bộ prompts và specs tiếng Việt; bắt buộc 100% nhãn/nội dung tiếng Việt).
Figma V2 bổ sung: https://www.figma.com/design/aASrpnjI0sgztK3QB3fxtd?node-id=46-647 (192 screen/state; 145 desktop, 47 mobile). Hai catalog riêng; không cộng 192 vào 37 native hoặc coi tất cả đã code.
Màn mở rộng mới: `EXT-JF-010-CANDIDATE-INSIGHTS` (Chi tiết tin tuyển dụng — Báo cáo ứng tuyển, mức độ cạnh tranh & tích điểm/nạp tiền xem số lượng CV nộp theo mô hình TopCV). Đã tích hợp hoàn toàn thành phân hệ chuẩn trong `JF-010` (`.stitch/designs/job_detail_senior_frontend_developer/code.html`) và kết nối hai chiều khép kín với các màn hình có sẵn: `JF-036` (Trang chủ - widget điểm & badge tỉ lệ chọi), `JF-037` (Tìm kiếm việc làm - bộ lọc báo cáo cạnh tranh & job card nổi bật), `JF-009` (Hồ sơ ứng viên - thẻ ví điểm thưởng 45 Điểm & báo cáo đã mở khóa), và `JF-003` (Thanh toán & Gói dịch vụ - phân hệ gói nạp xu/điểm thưởng). Toàn bộ liên kết tương đối nội bộ đã được kiểm chứng thông suốt trên trình duyệt. Mockup biến thể mở rộng độc lập vẫn được lưu trữ tại `.stitch/designs/job_detail_candidate_insights_points/code.html`.
Bổ sung 7 màn mở rộng thiết kế đột phá theo yêu cầu người dùng:
1. `EXT-JF-009-PROOF-OF-SKILL`: Xác thực năng lực thực tế (Proof-of-Skill) qua GitHub Portfolio tự động (Heatmap, commit frequency, repos, top languages LOC, gắn nhãn userSkill verified). Mockup: `.stitch/designs/ho_so_xac_thuc_nang_luc_github_proof_of_skill/code.html`.
2. `EXT-JF-024-MICRO-ASSESSMENT`: Micro-Assessment gắn liền bước nộp CV lọc spam apply (Countdown timer, 4 câu trắc nghiệm & coding situation, tự động chấm điểm). Mockup: `.stitch/designs/ung_tuyen_micro_assessment_test_nang_luc/code.html`.
3. `EXT-JF-018-PIZZA-TRACKER`: Application Tracker dạng Pizza-Tracker thời gian thực (5 bước, realtime presence khi HR đang xem hồ sơ, chỉ số SLA 48h, Constructive AI Rejection). Mockup: `.stitch/designs/don_ung_tuyen_pizza_tracker_sla_realtime/code.html`.
4. `EXT-JF-014-AI-MOCK-INTERVIEW`: AI Mock Interview huấn luyện viên phỏng vấn 1-on-1 sát JD & CV (Chatbot đóng vai Tech Lead 5 vòng, nhận xét điểm mạnh/yếu, radar chart). Mockup: `.stitch/designs/luyen_phong_van_ai_mock_interview_jd/code.html`.
5. `EXT-JF-010-SKILL-GAP-ATS`: Biểu đồ khoảng cách kỹ năng (Skill Gap) & Bộ mô phỏng quét lọc ATS Simulator trước khi nộp CV. Mockup: `.stitch/designs/doi_sanh_ky_nang_skill_gap_ats_simulator/code.html`.
6. `EXT-JF-012-REVERSE-RECRUITING`: Tuyển dụng đảo chiều & Chế độ Blind Profile (Ẩn danh trong userSetting), cơ chế Offer-First Bidding. Mockup: `.stitch/designs/tuyen_dung_dao_chieu_blind_profile_bidding/code.html`.
7. `EXT-JF-006-VERIFIED-REVIEWS`: Đánh giá doanh nghiệp có xác thực (Verified Candidate Reviews từ lịch sử ứng tuyển/phỏng vấn) & Chấm điểm riêng biệt trải nghiệm phỏng vấn (HR SLA, độ sát JD, đúng giờ). Mockup: `.stitch/designs/danh_gia_cong_ty_xac_thuc_verified_reviews/code.html`.
Stitch URL ngoại vi tiếp tục được lưu hồ sơ offline sẵn sàng import khi có tài khoản Google xác thực: https://stitch.withgoogle.com/projects/4225480897019041322.

## Tiếp tục
1. Chọn feature/screen và đọc six docs, screen contract, source hiện hành.
2. Vẽ bổ sung theo .stitch/backlog.json/next-prompt.md hoặc code screen được giao với yêu cầu 100% giao diện tiếng Việt.
3. Giữ stack, contracts và flags; update independent statuses/evidence và save checkpoint.

Calendar tổng hợp, general system settings và recurring subscriptions là PROPOSAL/partial. Source có interview/offer forms và gói post/CV; không tuyên bố thiếu toàn bộ nghiệp vụ đó.
