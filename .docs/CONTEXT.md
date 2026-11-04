# JobFind — Context · 04/11/2026

Bộ skills v3 JobFind tích hợp đầy đủ 37 màn native Stitch (100% tiếng Việt) và 8 phân hệ mở rộng đột phá theo yêu cầu người dùng, kiểm định toàn vẹn qua verify_bundle.py (0 lỗi).

## Đã có
- **Hạ tầng tri thức & Skills**: 42 skills, 31 feature slices × 6 docs (186 tài liệu đặc tả), 25 workflows, 18 templates.
- **Route & API static catalog**: 94 route declarations (92 unique patterns), 124 legacy endpoints, 71 modern operations / 42 schemas, 32 Sequelize models.
- **Màn hình Native Stitch (37 màn)**: Tham chiếu exact tại https://stitch.withgoogle.com/projects/4225480897019041322; 100% prompt và spec tiếng Việt; mã HTML mockup đã bản địa hóa tự nhiên.
- **Màn hình mở rộng đột phá (8 màn EXT)**:
  1. `EXT-JF-010-CANDIDATE-INSIGHTS`: Báo cáo ứng tuyển, mức cạnh tranh & nạp điểm (đã tích hợp chuẩn vào JF-010, JF-036, JF-037, JF-009, JF-003).
  2. `EXT-JF-009-PROOF-OF-SKILL`: Xác thực năng lực thực tế qua GitHub Portfolio tự động (Heatmap, commit frequency, repos, top languages LOC).
  3. `EXT-JF-024-MICRO-ASSESSMENT`: Micro-Assessment kiểm tra nhanh gắn bước nộp CV lọc spam apply.
  4. `EXT-JF-018-PIZZA-TRACKER`: Theo dõi tiến trình ứng tuyển thời gian thực dạng Pizza-Tracker, chỉ số SLA 48h & Constructive AI Rejection.
  5. `EXT-JF-014-AI-MOCK-INTERVIEW`: Huấn luyện viên phỏng vấn AI 1-on-1 sát JD & CV (5 vòng, radar chart đánh giá).
  6. `EXT-JF-010-SKILL-GAP-ATS`: Biểu đồ khoảng cách kỹ năng (Skill Gap) & Bộ mô phỏng quét lọc ATS Simulator trước khi apply.
  7. `EXT-JF-012-REVERSE-RECRUITING`: Tuyển dụng đảo chiều, chế độ Blind Profile ẩn danh & cơ chế Offer-First Bidding.
  8. `EXT-JF-006-VERIFIED-REVIEWS`: Đánh giá doanh nghiệp xác thực theo lịch sử ứng tuyển & chấm điểm trải nghiệm phỏng vấn (HR SLA, độ sát JD).

## Trạng thái độc lập (Ledger)
- **Design status**: 37 màn native đạt `reference-complete`; 8 màn mở rộng đạt `proposal-complete` kèm mockup HTML và đặc tả chi tiết.
- **Code status**: `unverified` / `planned` (source mapping hoàn tất, chưa triển khai code production; không đánh dấu implemented khi chưa có code thực tế).
- **Test status**: 8 màn mở rộng đã `verified-browser` (kiểm thử bố cục/liên kết trên mockup HTML); native screens ở trạng thái `not-run`.

## Tiếp tục
1. Hàng đợi tiếp theo trong backlog: `EXT-JF-036-MOBILE` (Mở rộng trải nghiệm tìm kiếm việc làm JF-036 trên thiết bị di động).
2. Khi bắt tay vào code hoặc test: Chọn feature/screen ID tương ứng, đọc six docs (`.docs/ideas`, `design-briefs`, `frontend-plans`, `backend-plans`, `endpoint-apis`, `qa`), screen contract và source hiện hành.
3. Giữ nguyên stack (React 18 JSX CRA + Express Babel Sequelize legacy / microservices), duy trì routing legacy, kiểm định server-side và cập nhật bằng chứng thực tế vào backlog/ledger.

Calendar tổng hợp, general system settings và recurring subscriptions là PROPOSAL/partial. Source có interview/offer forms và gói post/CV; không tuyên bố thiếu toàn bộ nghiệp vụ đó.

Archive trước phiên: `.docs/archive/20261104T012330713981Z-66a955b9/CONTEXT.md`
