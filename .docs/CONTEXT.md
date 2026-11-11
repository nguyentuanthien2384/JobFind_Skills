# JobFind — Context · 11/11/2026

Bộ skills v3 JobFind tích hợp đầy đủ 37 màn native Stitch (100% tiếng Việt), 8 phân hệ mở rộng đột phá Đa Ngành Nghề (Sales/CSKH, Marketing/Truyền thông, Kế toán/Nhân sự/Hành chính, Thiết kế, Vận hành, IT) kèm trọn bộ mã nguồn Backend + Frontend đồng bộ đầu-cuối (End-to-End Synchronized) và kiểm định toàn vẹn qua `verify_bundle.py` (0 lỗi).

## Đã có
- **Hạ tầng tri thức & Skills**: 42 skills, 31 feature slices × 6 docs (186 tài liệu đặc tả), 25 workflows, 18 templates.
- **Route & API static catalog**: 94 route declarations + 14 Multi-Industry Differentiator routes (`backend/src/routes/differentiatorRoutes.js` được mount trực tiếp vào `backend/src/routes/web.js`), 136 legacy endpoints trong `.docs/api-catalog.json`, 71 modern operations / 42 schemas, 34 Sequelize models (gồm `MockInterviewSession` và `JobInvitation` đồng bộ trong `backend/src/server.js`).
- **Màn hình Native Stitch (37 màn)**: Tham chiếu exact tại https://stitch.withgoogle.com/projects/4225480897019041322; 100% prompt và spec tiếng Việt.
- **Phân hệ mở rộng đột phá Đa Ngành Nghề (8 màn EXT + Full Backend/Frontend End-to-End Integration)**:
  1. `EXT-JF-010-CANDIDATE-INSIGHTS`: Báo cáo ứng tuyển, mức cạnh tranh & nạp điểm (tích hợp JF-010, JF-036, JF-037, JF-009, JF-003).
  2. `EXT-JF-024-MICRO-ASSESSMENT`: AI Situational Micro-Assessment — HR cấu hình đề tình huống 3 phút trong `AddPost.js` (`hasMicroTest`, `microTestPrompt`, `microTestTimeLimit`, `postService.js`), ứng viên làm bài đếm ngược 3 phút trong `SendCvModal.js`, hệ thống tự động chấm `aiSituationalScore` (1–10) & `aiEvaluationSummary` trong `cvService.js` và hiển thị cho HR tại `UserCv.js`.
  3. `EXT-JF-014-AI-MOCK-INTERVIEW`: AI Mock Interviewer 1-on-1 đóng vai theo JD đa ngành & chấm điểm STAR ngay trên `JobDetail.js` và `MultiIndustryDifferentiatorHub.js` (`MockInterviewSessions`, `GET /api/mock-interview/my`).
  4. `EXT-JF-018-PIZZA-TRACKER`: Application Pizza-Tracker 7 chặng thời gian thực (`ManageCvCandidate.js`, `UserCv.js`), tự động chuyển `HR_VIEWED` & tính SLA 72h (`Companies.avgResponseHours`, `responseRate`) khi HR mở CV trong `cvService.getDetailCvById`, phát Socket.IO `cv:stage_updated` (`config/socket.js`) & tự động sinh thư góp ý Constructive AI Rejection (`Cvs.aiFeedbackForCandidate` + 3 việc làm gợi ý).
  5. `EXT-JF-012-REVERSE-RECRUITING`: Tuyển dụng đảo chiều (Reverse Recruiting) đồng bộ từ `SettingUser.js` (`isBlindProfile`, `minExpectedSalary`, `blockedCompanyIds`, `userService.js`) sang kho CV của HR `FilterCv.js` (`cvService.fillterCVBySelection` tự động che thông tin cá nhân & lọc công ty bị chặn, tích hợp nút gửi lời mời đấu giá lương Offer-First) và hộp thư ứng viên tại `ManageCvCandidate.js` (`GET /api/job-invitations/my`, mở khóa liên hệ 2 chiều + trừ quota `allowCvFree`/`allowCv` + tạo `ChatMessage` khi `ACCEPTED`).
  6. `EXT-JF-006-VERIFIED-REVIEWS`: Đánh giá doanh nghiệp xác thực 3 tầng (`INTERVIEWED_CANDIDATE`, `APPLICANT`, `PUBLIC`) tích hợp trực tiếp vào `CompanyReview.js`, `DetailCompany.js` và `companyReviewService.js` (tự động đối chiếu lịch sử `Cvs` để gắn `relatedCvId` và `interviewExperienceRating`).
  7. `EXT-JF-009-PROOF-OF-SKILL`: Xác thực năng lực thực tế đa ngành tích hợp tại `CandidateInfo.js` (`POST /api/profile/proof-of-skill/sync-github`), tự động cập nhật `UserSkills.isVerified = 1`, `verificationSource` và hiển thị huy hiệu `✓ Đã xác thực` trên kho CV `FilterCv.js`.
  8. `EXT-JF-010-SKILL-GAP-ATS`: Phân tích khoảng cách kỹ năng (Skill Gap) & Bộ mô phỏng ATS Simulator đa ngành tích hợp trực tiếp trên trang chi tiết việc làm `JobDetail.js` (`POST /api/ai/skill-gap-simulator`).

## Trạng thái độc lập (Ledger)
- **Design status**: 37 màn native đạt `reference-complete`; 8 màn mở rộng đạt `proposal-complete` / `integrated` kèm mockup HTML tương tác đa ngành nghề.
- **Code status**: Toàn bộ hệ thống Backend (`routes/web.js`, `server.js`, `config/socket.js`, `services/postService.js`, `services/companyService.js`, `services/cvService.js`, `services/companyReviewService.js`, `services/userService.js`, `services/differentiatorService.js`) và Frontend (`App.js`, `AddPost.js`, `JobDetail.js`, `SendCvModal.js`, `ManageCvCandidate.js`, `UserCv.js`, `SettingUser.js`, `CandidateInfo.js`, `FilterCv.js`, `DetailCompany.js`, `CompanyReview.js`, `MultiIndustryDifferentiatorHub.js`) đạt `implemented` & đồng bộ 2 chiều, đóng gói tại `DALN_JobFind_MultiIndustry_Features_Full.zip`.
- **Test status**: Hệ thống đồng bộ đa ngành đạt `passed` (`node backend/tests/test-multi-industry-differentiator.cjs` exit code 0; `python tools/verify_bundle.py` 0 errors) và `verified-browser`.

## Tiếp tục
1. Hàng đợi tiếp theo trong backlog: `EXT-JF-036-MOBILE` (Mở rộng trải nghiệm tìm kiếm việc làm JF-036 trên thiết bị di động).
2. Khi chạy thực tế: giải nén `DALN_JobFind_MultiIndustry_Features_Full.zip` hoặc dùng trực tiếp thư mục `backend/` và `frontend/` trong dự án, chạy `npx sequelize-cli db:migrate` và khởi động `npm start` ở cả hai đầu Backend & Frontend.

Archive trước phiên: `.docs/archive/20261110T141353652553Z-958c0814/CONTEXT.md`
