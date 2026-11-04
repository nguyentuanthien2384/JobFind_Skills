# EXT-JF-009-PROOF-OF-SKILL · Xác Thực Năng Lực Thực Tế & GitHub Portfolio

## Identity và độ tin cậy
Feature `candidate-profile` · Sub-feature: `proof-of-skill-github` · Actor: CANDIDATE
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-009-PROOF-OF-SKILL` (Biến thể mở rộng từ JF-009).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/profile/proof-of-skill` (hoặc tab `/profile?tab=skills-verification`).

## Nghiệp vụ cốt lõi
1. **Khắc phục điểm yếu CV tự khai:** Giải quyết vấn nạn ứng viên viết phóng đại kỹ năng trên CV truyền thống bằng cơ chế xác minh tự động từ tài nguyên mã nguồn thực tế.
2. **Đồng bộ GitHub API tự động:** Kết nối luồng `github-acceptance` và `authIdentity` có sẵn trong hệ thống để thu thập: public repositories, top programming languages theo Lines of Code, tần suất commit 365 ngày (Heatmap), số lượng PRs và Stars.
3. **Gắn nhãn bảng `userSkill`:** Phân loại minh bạch giữa kỹ năng đã kiểm chứng ("Kỹ năng đã xác thực qua mã nguồn") và kỹ năng do ứng viên tự khai chưa có bằng chứng thực tế.

## Source mapping
- Frontend: `frontend/src/container/Candidate/ProfileProofOfSkill.js`
- Adapter API: `frontend/src/service/userService.js` (hàm `syncGithubSkills()`, `getProofOfSkillReport()`)
- Backend Controller/Model: `backend/src/controllers/userController.js`, models `UserSkill`, `AuthIdentity`.

## Assets
- Mockup HTML: `.stitch/designs/ho_so_xac_thuc_nang_luc_github_proof_of_skill/code.html`
- Prompt: `.stitch/prompts/EXT-JF-009-PROOF-OF-SKILL.md`
- Màn hình liên kết: `JF-009` (Hồ sơ của tôi), `JF-012` (Kho ứng viên), `JF-025` (Phễu tuyển dụng).
