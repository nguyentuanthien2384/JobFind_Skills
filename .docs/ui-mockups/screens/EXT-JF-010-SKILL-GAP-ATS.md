# EXT-JF-010-SKILL-GAP-ATS · Biểu Đồ Đối Sánh Kỹ Năng & ATS Simulator

## Identity và độ tin cậy
Feature `job-detail` · Sub-feature: `skill-gap-ats-simulator` · Actor: CANDIDATE
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-010-SKILL-GAP-ATS` (Biến thể mở rộng từ JF-010).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/jobs/:id/skill-gap`.

## Nghiệp vụ cốt lõi
1. **Kiểm tra độ tương thích ATS trước khi nộp CV:** Ngăn chặn việc ứng viên bị loại oan uổng vì thiếu từ khóa chuẩn trong bản CV.
2. **Đối sánh trực quan giữa `userSkill` và JD:** Phân loại rõ kỹ năng đã khớp (10/12) và kỹ năng còn khuyết (Unit testing Jest, Web Vitals).
3. **Đề xuất từ khóa AI:** Gợi ý ngữ cảnh thực tế để bổ sung từ khóa vào bản CV nộp cho doanh nghiệp.

## Source mapping
- Frontend: `frontend/src/container/JobDetail/SkillGapModal.js`
- Adapter API: `frontend/src/service/jobService.js`, `frontend/src/service/aiService.js`
- Backend Controller/Model: `backend/src/controllers/postController.js`, `backend/src/controllers/aiController.js`.

## Assets
- Mockup HTML: `.stitch/designs/doi_sanh_ky_nang_skill_gap_ats_simulator/code.html`
- Prompt: `.stitch/prompts/EXT-JF-010-SKILL-GAP-ATS.md`
- Màn hình liên kết: `JF-010` (Job detail), `JF-024` (Ứng tuyển), `EXT-JF-024-MICRO-ASSESSMENT`.
