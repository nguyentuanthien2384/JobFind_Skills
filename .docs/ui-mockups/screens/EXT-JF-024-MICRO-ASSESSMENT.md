# EXT-JF-024-MICRO-ASSESSMENT · Situational Micro-Assessment Đa Ngành Lọc Spam Khi Nộp CV

## Identity và độ tin cậy
Feature `applications` (liên thông `job-posting`, `pipeline`) · Sub-feature: `situational-micro-assessment-multi-industry` · Actor: CANDIDATE, EMPLOYER, COMPANY
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-024-MICRO-ASSESSMENT` (Biến thể mở rộng từ JF-024).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/apply/:jobId/assessment` (hoặc bước tích hợp trong luồng ứng tuyển `/detail-job/:id`).

## Nghiệp vụ cốt lõi (Định hướng Đa ngành nghề)
1. **Đánh giá tình huống nghề nghiệp (Situational Case Study) thay vì chỉ kiểm tra code:**
   - **Ngành Sales / CSKH:** Tình huống xử lý khách hàng B2B phàn nàn về giá hoặc từ chối gia hạn hợp đồng.
   - **Ngành Marketing / Truyền thông:** Đề xuất ý tưởng chiến dịch Launching ngắn gọn với ngân sách giả định trong 150 từ.
   - **Ngành Kế toán / Nhân sự / Hành chính:** Xử lý tình huống sai lệch chứng từ trước thời điểm khóa sổ hoặc giải quyết xung đột nội bộ.
   - **Ngành IT / Phần mềm:** Chẩn đoán nghẽn cổ chai hiệu năng, chống Race Condition và cân bằng Technical Debt.
2. **AI Gợi ý đề bài cho HR & Tự động chấm điểm cho Ứng viên:**
   - Khi HR soạn tin tuyển dụng ở `postController.js`, gọi `POST /api/ai/generate-micro-test` để AI sinh sẵn 3 câu hỏi tình huống sát ngành nghề (`allcode.js` / `categoryJobCode`).
   - Khi ứng viên nộp bài (`microTestTimeLimit` mặc định 300 giây = 5 phút chống sao chép), gọi `POST /api/ai/evaluate-situational-answer` để chấm `aiSituationalScore` (thang 1–10), lưu nhận xét 3 ý chính `aiEvaluationSummary` (`understanding`, `problemSolving`, `fitLevel`) và tự động chuyển `applicationStage = 'AI_SCREENED'`.

## Thiết kế Database & API
- **Migration:** `backend/src/migrations/migrationzzzzzzzzzzzz-multi-industry-features.js`
- **Mở rộng bảng `DetailPosts` (`detailpost.js`):**
  - `hasMicroTest` (`BOOLEAN`, default: `false`)
  - `microTestPrompt` (`TEXT`, nullable)
  - `microTestTimeLimit` (`INTEGER`, default: `300`)
- **Mở rộng bảng `Cvs` (`cv.js`):**
  - `microTestAnswer` (`TEXT`, nullable)
  - `aiSituationalScore` (`FLOAT`, nullable, thang 1–10)
  - `aiEvaluationSummary` (`JSON`, nullable: `{ understanding, problemSolving, fitLevel }`)
- **API Endpoints:**
  - `POST /api/ai/generate-micro-test` (`JOB_MANAGE`)
  - `POST /api/ai/evaluate-situational-answer` (`CANDIDATE_APPLY`)

## Source mapping
- Frontend: `frontend/src/container/Candidate/MultiIndustryDifferentiatorHub.js`, `frontend/src/components/modal/SendCvModal.js`
- Adapter API: `frontend/src/service/differentiatorService.js` (`generateMicroTestService`, `evaluateSituationalAnswerService`)
- Backend: `backend/src/controllers/differentiatorController.js`, `backend/src/controllers/mockInterviewController.js`, `backend/src/services/differentiatorService.js`, `backend/src/models/detailpost.js`, `backend/src/models/cv.js`

## Assets
- Mockup HTML: `.stitch/designs/ung_tuyen_micro_assessment_test_nang_luc/code.html`
- Prompt: `.stitch/prompts/EXT-JF-024-MICRO-ASSESSMENT.md`
- Màn hình liên kết: `JF-010` (Job detail), `JF-021` (Đăng tin tuyển dụng), `JF-024` (Ứng tuyển), `JF-025` (Phễu tuyển dụng), `EXT-JF-018-PIZZA-TRACKER`.
