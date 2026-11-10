# EXT-JF-006-VERIFIED-REVIEWS · Đánh Giá Doanh Nghiệp Có Xác Thực (Verified Candidate Reviews) & SLA

## Identity và độ tin cậy
Feature `companies` · Sub-feature: `verified-reviews-interview-experience` · Actor: CANDIDATE, PUBLIC, COMPANY
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-006-VERIFIED-REVIEWS` (Biến thể mở rộng từ JF-006).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/company/:id/verified-reviews` (hoặc tích hợp trong `/detail-company/:id`).

## Nghiệp vụ cốt lõi
1. **Chống đánh giá seeding hoặc ẩn danh thiếu căn cứ:**
   - Liên kết trực tiếp bảng `CompanyReviews` (`companyReview.js`) với hồ sơ ứng tuyển `Cvs` (`cv.js`) thông qua khóa ngoại `relatedCvId`.
   - Khi trạng thái hồ sơ `Cvs.applicationStage` đạt từ `'INTERVIEW_SCHEDULED'` trở lên, hệ thống tự động cấp nhãn `verificationType = 'INTERVIEWED_CANDIDATE'` (*"Ứng viên đã phỏng vấn thực tế"*).
   - Nếu ứng viên đã nộp đơn tại công ty nhưng chưa qua vòng phỏng vấn, gắn nhãn `verificationType = 'APPLICANT'` (*"Ứng viên đã nộp hồ sơ"*), tách biệt hoàn toàn với `'PUBLIC'` (người dùng vãng lai).
2. **Đánh giá trải nghiệm phỏng vấn riêng biệt (`interviewExperienceRating`):**
   - Chấm điểm thang 1–5 chuyên biệt cho sự chuyên nghiệp của HR, độ sát thực tế của đề bài tình huống/phỏng vấn với JD và tính đúng giờ trên lịch hẹn.
3. **Hiển thị Huy hiệu SLA Phản hồi trên trang Công ty:**
   - Hiển thị công khai `Companies.avgResponseHours` (thời gian phản hồi trung bình) và `Companies.responseRate` (% hồ sơ được phản hồi trong vòng 72 giờ).

## Thiết kế Database & API
- **Migration:** `backend/src/migrations/migrationzzzzzzzzzzzz-multi-industry-features.js`
- **Mở rộng bảng `CompanyReviews` (`companyReview.js`):**
  - `verificationType` (`ENUM('PUBLIC', 'APPLICANT', 'INTERVIEWED_CANDIDATE')`, default: `'PUBLIC'`)
  - `relatedCvId` (`INTEGER`, nullable, FK tới `cv.js`)
  - `interviewExperienceRating` (`TINYINT`, 1–5)
- **Mở rộng bảng `Companies` (`company.js`):**
  - `avgResponseHours` (`FLOAT`, default: `null`)
  - `responseRate` (`FLOAT`, default: `0`)
- **API Endpoints:**
  - `POST /api/company-reviews/verified` (`SOCIAL_INTERACT`)
  - `GET /api/get-review-by-company`

## Source mapping
- Frontend: `frontend/src/container/Candidate/MultiIndustryDifferentiatorHub.js`, `frontend/src/container/Company/DetailCompany.js`
- Adapter API: `frontend/src/service/differentiatorService.js` (`createVerifiedCompanyReviewService`)
- Backend: `backend/src/controllers/differentiatorController.js`, `backend/src/controllers/companyReviewController.js`, `backend/src/services/differentiatorService.js`, `backend/src/models/companyReview.js`, `backend/src/models/company.js`

## Assets
- Mockup HTML: `.stitch/designs/danh_gia_cong_ty_xac_thuc_verified_reviews/code.html`
- Prompt: `.stitch/prompts/EXT-JF-006-VERIFIED-REVIEWS.md`
- Màn hình liên kết: `JF-006`/`JF-007` (Công ty), `JF-014` (Lịch phỏng vấn), `EXT-JF-018-PIZZA-TRACKER`.
