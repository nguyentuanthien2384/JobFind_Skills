# EXT-JF-010-SKILL-GAP-ATS · Biểu Đồ Đối Sánh Kỹ Năng & ATS Simulator Đa Ngành

## Identity và độ tin cậy
Feature `job-detail` · Sub-feature: `skill-gap-ats-simulator` · Actor: CANDIDATE
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-010-SKILL-GAP-ATS` (Biến thể mở rộng từ JF-010).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/jobs/:id/skill-gap` (hoặc modal trên `/detail-job/:id`).

## Nghiệp vụ cốt lõi
1. **Kiểm tra độ tương thích ATS trước khi nộp CV:** Ngăn chặn việc ứng viên ở mọi ngành nghề (Sales, Marketing, Kế toán/Nhân sự, IT) bị loại đáng tiếc vì thiếu từ khóa chuyên môn chuẩn trong CV.
2. **Đối sánh trực quan giữa `UserSkills` và `DetailPosts`:** Phân loại rõ kỹ năng đã khớp (`matchedSkills`) và kỹ năng còn khuyết (`missingSkills`) kèm điểm tương thích `atsScore` (%).
3. **Đề xuất từ khóa AI (`keywordSuggestions`):** Gợi ý câu văn mẫu và ngữ cảnh thực tế để ứng viên bổ sung vào CV trước khi bấm ứng tuyển.

## Thiết kế API & Source mapping
- **API Endpoint:** `POST /api/ai/skill-gap-simulator` (`ACCOUNT_SELF`)
- **Frontend:** `frontend/src/container/Candidate/MultiIndustryDifferentiatorHub.js`, `frontend/src/container/JobDetail/JobDetail.js`
- **Adapter API:** `frontend/src/service/differentiatorService.js` (`analyzeSkillGapAndAtsService`)
- **Backend:** `backend/src/controllers/differentiatorController.js`, `backend/src/services/differentiatorService.js`

## Assets
- Mockup HTML: `.stitch/designs/doi_sanh_ky_nang_skill_gap_ats_simulator/code.html`
- Prompt: `.stitch/prompts/EXT-JF-010-SKILL-GAP-ATS.md`
- Màn hình liên kết: `JF-010` (Job detail), `JF-024` (Ứng tuyển), `EXT-JF-024-MICRO-ASSESSMENT`.
