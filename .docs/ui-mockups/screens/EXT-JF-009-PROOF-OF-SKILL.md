# EXT-JF-009-PROOF-OF-SKILL · Xác Thực Năng Lực Thực Tế & GitHub Portfolio

## Identity và độ tin cậy
Feature `candidate-profile` · Sub-feature: `proof-of-skill-github` · Actor: CANDIDATE
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-009-PROOF-OF-SKILL` (Biến thể mở rộng từ JF-009).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/profile/proof-of-skill` (hoặc tab `/candidate/info`).

## Nghiệp vụ cốt lõi
1. **Khắc phục điểm yếu CV tự khai:** Giải quyết vấn nạn ứng viên viết phóng đại kỹ năng trên CV truyền thống bằng cơ chế xác minh tự động từ mã nguồn và hồ sơ năng lực thực tế.
2. **Đồng bộ GitHub API tự động:** Kết nối luồng `github-acceptance` và bảng `AuthIdentities` (`authIdentity.js`) sẵn có trong dự án để gọi GitHub API thu thập: public repositories, ngôn ngữ lập trình sử dụng nhiều nhất, tần suất commit 365 ngày (Heatmap) và số lượng Stars.
3. **Gắn nhãn bảng `UserSkills` (`userSkill.js`):** Tự động gắn nhãn `"Kỹ năng đã xác thực qua mã nguồn"` (`isVerified = true`, `verificationSource = 'GITHUB_API'`, `verifiedMetadata`, `verifiedAt`) tách biệt với kỹ năng tự khai.

## Thiết kế Database & API
- **Migration:** `backend/src/migrations/migrationzzzzzzzzzzzz-multi-industry-features.js`
- **Mở rộng bảng `UserSkills` (`userSkill.js`):**
  - `isVerified` (`BOOLEAN`, default: `false`)
  - `verificationSource` (`STRING(64)`, nullable)
  - `verifiedMetadata` (`JSON`, nullable)
  - `verifiedAt` (`DATE`, nullable)
- **API Endpoints:**
  - `POST /api/profile/proof-of-skill/sync-github` (`ACCOUNT_SELF`)

## Source mapping
- Frontend: `frontend/src/container/Candidate/MultiIndustryDifferentiatorHub.js`, `frontend/src/container/Candidate/CandidateInfo.js`
- Adapter API: `frontend/src/service/differentiatorService.js` (`syncGithubPortfolioSkillsService`)
- Backend: `backend/src/controllers/differentiatorController.js`, `backend/src/services/differentiatorService.js`, `backend/src/models/userSkill.js`, `backend/src/models/authIdentity.js`

## Assets
- Mockup HTML: `.stitch/designs/ho_so_xac_thuc_nang_luc_github_proof_of_skill/code.html`
- Prompt: `.stitch/prompts/EXT-JF-009-PROOF-OF-SKILL.md`
- Màn hình liên kết: `JF-009` (Hồ sơ của tôi), `JF-012` (Kho ứng viên), `JF-025` (Phễu tuyển dụng).
