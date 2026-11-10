# EXT-JF-012-REVERSE-RECRUITING · Tuyển Dụng Ngược Ẩn Danh (Blind Profile & Salary Bidding)

## Identity và độ tin cậy
Feature `candidate-search` (liên thông `candidate-profile`, `billing-packages`, `chat`) · Sub-feature: `reverse-recruiting-blind-salary-bidding` · Actor: CANDIDATE, EMPLOYER, COMPANY
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-012-REVERSE-RECRUITING` (Biến thể mở rộng từ JF-012).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/candidates/reverse-market` (hoặc `/admin/list-candiate`).

## Nghiệp vụ cốt lõi (Đa ngành nghề & Chống mất tiền oan cho HR)
1. **Chế độ Blind Profile & Chặn công ty hiện tại (`UserSettings`):**
   - Nhân sự có kinh nghiệm ở các ngành Sales, Kế toán trưởng, Marketing Manager, Kỹ sư IT rất ngại bật "Tìm việc" vì sợ công ty hiện tại phát hiện.
   - Khi bật `isBlindProfile = true`, hệ thống che toàn bộ Họ tên, Số điện thoại, Email, Ảnh đại diện và tên Công ty đang làm việc; chỉ hiển thị kỹ năng (`userSkill`), kinh nghiệm và mức lương tối thiểu mong muốn (`minExpectedSalary`).
   - Trường `blockedCompanyIds` (JSON mảng ID công ty) lọc bỏ hoàn toàn hồ sơ ứng viên khỏi kết quả tìm kiếm của HR thuộc các công ty bị chặn.
2. **Đặt lời mời kèm mức lương (`JobInvitations` - Offer-First):**
   - Thay vì trừ lượt mở khóa CV (`orderPackageCv.js` / `Company.allowCv`) ngay lập tức mà không biết ứng viên có quan tâm hay không, HR gửi một `JobInvitation` kèm khung lương cam kết (`offeredSalaryMin` – `offeredSalaryMax`) và lời nhắn thuyết phục (`pitchMessage`).
   - Hệ thống kiểm tra khung lương đề xuất phải đạt mức kỳ vọng tối thiểu `minExpectedSalary` của ứng viên và bắn sự kiện `invitation:received` qua `socket.js`.
3. **Mở khóa thông tin 2 chiều khi Ứng viên Chấp nhận (`ACCEPTED`):**
   - Chỉ khi ứng viên bấm Chấp nhận (`ACCEPTED`), hệ thống mới trừ 1 lượt mở khóa CV của doanh nghiệp (`allowCvFree` / `allowCv` và ghi nhận `CandidateView`), mở khóa đầy đủ thông tin liên hệ và tự động khởi tạo phòng trò chuyện trong `ChatMessages` (`chatController.js`).

## Thiết kế Database, Real-time Events & API
- **Migration:** `backend/src/migrations/migrationzzzzzzzzzzzz-multi-industry-features.js`
- **Mở rộng bảng `UserSettings` (`userSetting.js`):**
  - `isBlindProfile` (`BOOLEAN`, default: `false`)
  - `minExpectedSalary` (`INTEGER`, default: `0`)
  - `blockedCompanyIds` (`JSON`, default: `[]`)
- **Bảng mới `JobInvitations` (`backend/src/models/jobInvitation.js`):**
  - `id`, `companyId` (FK `company.js`), `recruiterId` (FK `user.js`), `candidateId` (FK `user.js`), `postId` (FK `post.js`)
  - `offeredSalaryMin` (`INTEGER`), `offeredSalaryMax` (`INTEGER`), `pitchMessage` (`TEXT`)
  - `status` (`ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED')`), `respondedAt` (`DATE`)
- **Real-time Event (`backend/src/contracts/differentiator.events.v1.json` & `socket.js`):**
  - Event `invitation:received` phát tới phòng `user:<candidateId>`.
- **API Endpoints:**
  - `GET /api/candidates/blind-search` (`CANDIDATE_SEARCH`)
  - `POST /api/job-invitations` (`CANDIDATE_SEARCH`)
  - `POST /api/job-invitations/:invitationId/respond` (`ACCOUNT_SELF`)

## Source mapping
- Frontend: `frontend/src/container/Candidate/MultiIndustryDifferentiatorHub.js`, `frontend/src/container/system/Cv/FilterCv.js`
- Adapter API: `frontend/src/service/differentiatorService.js` (`searchBlindCandidatesService`, `sendReverseJobInvitationService`, `respondToJobInvitationService`)
- Backend: `backend/src/controllers/invitationController.js`, `backend/src/controllers/differentiatorController.js`, `backend/src/services/differentiatorService.js`, `backend/src/models/userSetting.js`, `backend/src/models/jobInvitation.js`

## Assets
- Mockup HTML: `.stitch/designs/tuyen_dung_dao_chieu_blind_profile_bidding/code.html`
- Prompt: `.stitch/prompts/EXT-JF-012-REVERSE-RECRUITING.md`
- Màn hình liên kết: `JF-012` (Kho ứng viên), `JF-009` (Hồ sơ cá nhân), `JF-003` (Gói dịch vụ CV), `JF-030`/`JF-031` (Trò chuyện).
