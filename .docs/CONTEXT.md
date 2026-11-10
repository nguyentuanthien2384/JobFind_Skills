# JobFind — Context · 10/11/2026

Bộ skills v3 JobFind tích hợp đầy đủ 37 màn native Stitch (100% tiếng Việt), 8 phân hệ mở rộng đột phá Đa Ngành Nghề (Sales/CSKH, Marketing/Truyền thông, Kế toán/Nhân sự/Hành chính, Thiết kế, Vận hành, IT) kèm trọn bộ mã nguồn Backend/Frontend/Migration/Tests và kiểm định toàn vẹn qua `verify_bundle.py` (0 lỗi).

## Đã có
- **Hạ tầng tri thức & Skills**: 42 skills, 31 feature slices × 6 docs (186 tài liệu đặc tả), 25 workflows, 18 templates.
- **Route & API static catalog**: 94 route declarations + 12 Multi-Industry Differentiator routes (`backend/src/routes/differentiatorRoutes.js`), 136 legacy endpoints trong `.docs/api-catalog.json`, 71 modern operations / 42 schemas, 34 Sequelize models (gồm `MockInterviewSession` và `JobInvitation`).
- **Màn hình Native Stitch (37 màn)**: Tham chiếu exact tại https://stitch.withgoogle.com/projects/4225480897019041322; 100% prompt và spec tiếng Việt.
- **Phân hệ mở rộng đột phá Đa Ngành Nghề (8 màn EXT + Full Source Code)**:
  1. `EXT-JF-010-CANDIDATE-INSIGHTS`: Báo cáo ứng tuyển, mức cạnh tranh & nạp điểm (tích hợp JF-010, JF-036, JF-037, JF-009, JF-003).
  2. `EXT-JF-024-MICRO-ASSESSMENT`: AI Situational Micro-Assessment (Bài test tình huống 3 phút mọi ngành nghề: Sales, Marketing, Kế toán/HR, IT; `DetailPosts.hasMicroTest`, `Cvs.aiSituationalScore`, `Cvs.aiEvaluationSummary`).
  3. `EXT-JF-014-AI-MOCK-INTERVIEW`: AI Mock Interviewer 1-on-1 đóng vai theo JD đa ngành & chấm điểm STAR (`MockInterviewSessions`, `overallScore`, `cvImprovementTips`).
  4. `EXT-JF-018-PIZZA-TRACKER`: Application Pizza-Tracker 7 chặng thời gian thực, cam kết SLA 72h (`Companies.avgResponseHours`, `responseRate`), Socket.IO `cv:stage_updated` & Constructive AI Rejection (`Cvs.aiFeedbackForCandidate` + 3 việc làm gợi ý).
  5. `EXT-JF-012-REVERSE-RECRUITING`: Tuyển dụng đảo chiều (Reverse Recruiting), chế độ `UserSettings.isBlindProfile`, `minExpectedSalary`, `blockedCompanyIds`, bảng `JobInvitations` & mở khóa 2 chiều + trừ quota `allowCvFree`/`allowCv` + tạo `ChatMessage` khi `ACCEPTED`.
  6. `EXT-JF-006-VERIFIED-REVIEWS`: Đánh giá doanh nghiệp xác thực 3 tầng (`INTERVIEWED_CANDIDATE`, `APPLICANT`, `PUBLIC`) gắn `relatedCvId` và `interviewExperienceRating`.
  7. `EXT-JF-009-PROOF-OF-SKILL`: Xác thực năng lực thực tế đa ngành (`UserSkills.isVerified`, `verificationSource`, `verifiedMetadata`: GitHub API cho IT & Case Study/Chứng chỉ ACCA/CPA/SHRM/ROAS cho Sales, Marketing, Kế toán/HR).
  8. `EXT-JF-010-SKILL-GAP-ATS`: Phân tích khoảng cách kỹ năng (Skill Gap) & Bộ mô phỏng ATS Simulator đa ngành (`POST /api/ai/skill-gap-simulator`).

## Trạng thái độc lập (Ledger)
- **Design status**: 37 màn native đạt `reference-complete`; 8 màn mở rộng đạt `proposal-complete` / `integrated` kèm mockup HTML tương tác đa ngành nghề.
- **Code status**: 7 phân hệ Multi-Industry Differentiator đạt `implemented` (`backend/src/migrations/migrationzzzzzzzzzzzz-multi-industry-features.js`, `backend/src/models/*`, `backend/src/services/differentiatorService.js`, `backend/src/controllers/*`, `backend/src/routes/differentiatorRoutes.js`, `frontend/src/service/differentiatorService.js`, `frontend/src/container/Candidate/MultiIndustryDifferentiatorHub.js`, đóng gói tại `DALN_JobFind_MultiIndustry_Features_Full.zip`). Các màn native còn lại giữ `unverified`.
- **Test status**: 7 phân hệ Multi-Industry Differentiator đạt `passed` (`node backend/tests/test-multi-industry-differentiator.cjs` exit code 0) và `verified-browser`.

## Tiếp tục
1. Hàng đợi tiếp theo trong backlog: `EXT-JF-036-MOBILE` (Mở rộng trải nghiệm tìm kiếm việc làm JF-036 trên thiết bị di động).
2. Khi tích hợp sang repo runtime: giải nén `DALN_JobFind_MultiIndustry_Features_Full.zip` hoặc copy trực tiếp `backend/` và `frontend/`, chạy `npx sequelize-cli db:migrate` và mount `initDifferentiatorRoutes(app)` trong `backend/src/routes/web.js`.

Archive trước phiên: `.docs/archive/20261110T141353652553Z-958c0814/CONTEXT.md`
