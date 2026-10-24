# JobFind — Context · 15/10/2026

Bộ skills v3 được xây từ skills.zip, source JobFind và exact Stitch 37 màn. Dự án Stitch và toàn bộ tài liệu đặc tả thiết kế đã được chuyển ngữ 100% sang tiếng Việt chuẩn theo yêu cầu người dùng.

## Đã có
42 skills (14 cập nhật + 28 bổ sung), 31 feature slices × 6 docs, 25 workflows, 18 templates. Có 37 ảnh/HTML gốc, screen contracts/prompts (toàn bộ 37 prompt .stitch/prompts/ đã Việt hóa hoàn chỉnh) và bảng route coverage 94 declarations/92 unique patterns. API catalog static: 124 legacy endpoints, 71 modern operations/42 schemas, 32 Sequelize model files. Toàn bộ mã HTML thiết kế mockups (.stitch/designs/) đã được bản địa hóa sang tiếng Việt tự nhiên (Thanh toán & Gói dịch vụ, Duyệt hồ sơ công ty, Hộp thư & Tin nhắn, Bảng điều khiển quản trị, v.v.). Kết quả verify_bundle.py: 0 lỗi.

## Thiết kế
Stitch: https://stitch.withgoogle.com/projects/4225480897019041322 (toàn bộ prompts và specs tiếng Việt; bắt buộc 100% nhãn/nội dung tiếng Việt).
Figma V2 bổ sung: https://www.figma.com/design/aASrpnjI0sgztK3QB3fxtd?node-id=46-647 (192 screen/state; 145 desktop, 47 mobile). Hai catalog riêng; không cộng 192 vào 37 native hoặc coi tất cả đã code.
Màn mở rộng mới: `EXT-JF-010-CANDIDATE-INSIGHTS` (Chi tiết tin tuyển dụng — Báo cáo ứng tuyển, mức độ cạnh tranh & tích điểm/nạp tiền xem số lượng CV nộp theo mô hình TopCV). Đã tích hợp hoàn toàn thành phân hệ chuẩn trong `JF-010` (`.stitch/designs/job_detail_senior_frontend_developer/code.html`) và kết nối hai chiều khép kín với các màn hình có sẵn: `JF-036` (Trang chủ - widget điểm & badge tỉ lệ chọi), `JF-037` (Tìm kiếm việc làm - bộ lọc báo cáo cạnh tranh & job card nổi bật), `JF-009` (Hồ sơ ứng viên - thẻ ví điểm thưởng 45 Điểm & báo cáo đã mở khóa), và `JF-003` (Thanh toán & Gói dịch vụ - phân hệ gói nạp xu/điểm thưởng). Toàn bộ liên kết tương đối nội bộ đã được kiểm chứng thông suốt trên trình duyệt. Mockup biến thể mở rộng độc lập vẫn được lưu trữ tại `.stitch/designs/job_detail_candidate_insights_points/code.html`. Stitch URL ngoại vi tiếp tục được lưu hồ sơ offline sẵn sàng import khi có tài khoản Google xác thực.

## Tiếp tục
1. Chọn feature/screen và đọc six docs, screen contract, source hiện hành.
2. Vẽ bổ sung theo .stitch/backlog.json/next-prompt.md hoặc code screen được giao với yêu cầu 100% giao diện tiếng Việt.
3. Giữ stack, contracts và flags; update independent statuses/evidence và save checkpoint.

Calendar tổng hợp, general system settings và recurring subscriptions là PROPOSAL/partial. Source có interview/offer forms và gói post/CV; không tuyên bố thiếu toàn bộ nghiệp vụ đó.
