# EXT-JF-024-MICRO-ASSESSMENT · Micro-Assessment Lọc Spam Khi Nộp CV

## Identity và độ tin cậy
Feature `applications` · Sub-feature: `micro-assessment-anti-spam` · Actor: CANDIDATE, EMPLOYER
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-024-MICRO-ASSESSMENT` (Biến thể mở rộng từ JF-024).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/apply/:jobId/assessment`.

## Nghiệp vụ cốt lõi
1. **Chống nạn rải CV hàng loạt (Spam Apply):** Các nền tảng thông thường gặp bài toán ứng viên spam apply bằng 1 cú click khiến HR quá tải. Hệ thống cho phép Employer đính kèm 3-5 câu hỏi ngắn giới hạn 5-10 phút.
2. **Auto-grading & Gắn điểm hồ sơ:** Điểm số và thời gian hoàn thành được gắn trực tiếp vào bản ghi `application` và hiển thị trên phễu tuyển dụng Kanban `JF-025`.
3. **Độ an toàn và trải nghiệm:** Timer đếm ngược, tự động nộp bài khi hết giờ, captcha chống bot script.

## Source mapping
- Frontend: `frontend/src/container/Candidate/ApplicationAssessment.js`
- Adapter API: `frontend/src/service/applicationService.js` (hàm `submitAssessment()`, `getAssessmentByJob()`)
- Backend Controller/Model: `backend/src/controllers/postController.js`, `backend/src/controllers/cvController.js`, models `PostAssessment`, `Application`.

## Assets
- Mockup HTML: `.stitch/designs/ung_tuyen_micro_assessment_test_nang_luc/code.html`
- Prompt: `.stitch/prompts/EXT-JF-024-MICRO-ASSESSMENT.md`
- Màn hình liên kết: `JF-010` (Job detail), `JF-024` (Ứng tuyển), `JF-025` (Phễu tuyển dụng).
