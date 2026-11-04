# EXT-JF-006-VERIFIED-REVIEWS · Đánh Giá Doanh Nghiệp Có Xác Thực (Verified Candidate Reviews)

## Identity và độ tin cậy
Feature `companies` · Sub-feature: `verified-reviews-interview-experience` · Actor: CANDIDATE, PUBLIC, COMPANY
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-006-VERIFIED-REVIEWS` (Biến thể mở rộng từ JF-006).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/company/:id/verified-reviews`.

## Nghiệp vụ cốt lõi
1. **Chống đánh giá seeding hoặc ẩn danh thiếu căn cứ:** Liên kết chặt chẽ bảng `companyReview` với dữ liệu lịch sử nộp CV (`applications`) và lịch phỏng vấn (`interview-calendar`).
2. **Huy hiệu "Verified Candidate":** Chỉ những tài khoản thực sự đã trải qua phỏng vấn mới được cấp nhãn xanh bảo chứng, tách biệt với đánh giá từ người dùng vãng lai.
3. **Thang điểm chấm trải nghiệm phỏng vấn riêng biệt:**
   - Độ chuyên nghiệp của HR (HR Professionalism)
   - Đề phỏng vấn có sát JD không (JD Alignment)
   - Đúng giờ trên lịch hẹn (Punctuality)
   - Tốc độ và chất lượng phản hồi kết quả (SLA Response).

## Source mapping
- Frontend: `frontend/src/container/Company/CompanyVerifiedReviews.js`, `frontend/src/components/Company/InterviewRatingCard.js`
- Adapter API: `frontend/src/service/companyService.js`, `frontend/src/service/reviewService.js`
- Backend Controller/Model: `backend/src/controllers/companyController.js`, models `CompanyReview`, `Application`, `InterviewCalendar`.

## Assets
- Mockup HTML: `.stitch/designs/danh_gia_cong_ty_xac_thuc_verified_reviews/code.html`
- Prompt: `.stitch/prompts/EXT-JF-006-VERIFIED-REVIEWS.md`
- Màn hình liên kết: `JF-006`/`JF-007` (Công ty), `JF-014` (Lịch phỏng vấn).
