# Hướng dẫn tích hợp bộ tính năng khác biệt Đa ngành cho DALN_JobFind

Tài liệu và mã nguồn này hiện thực hóa trọn vẹn 5 trụ cột khác biệt so với TopCV theo định hướng **Đa ngành nghề (Sales/CSKH, Marketing/Truyền thông, Kế toán/Nhân sự/Hành chính, Thiết kế/Vận hành, Công nghệ thông tin/IT)**:

1. **Situational Micro-Assessment & AI Mock Interview (Đa ngành)**:
   - Cho phép HR đính kèm câu hỏi tình huống thực tế (`hasMicroTest`, `microTestPrompt`, `microTestTimeLimit` = 300s) vào bảng `DetailPosts` hoặc dùng AI (`POST /api/ai/generate-micro-test`) tự động gợi ý 3 câu hỏi tình huống sát ngành nghề.
   - Tự động chấm điểm câu trả lời của ứng viên (`POST /api/ai/evaluate-situational-answer`) trên thang 1–10 (`aiSituationalScore`) kèm nhận xét 3 tiêu chí (`aiEvaluationSummary`: Độ hiểu nghiệp vụ, Tư duy giải quyết vấn đề, Mức độ phù hợp JD) và chuyển trạng thái sang `AI_SCREENED`.
   - Khởi tạo phòng luyện phỏng vấn thử 1-on-1 với AI gồm 5 câu hỏi sát JD (`MockInterviewSessions`: `POST /api/mock-interview/start`, `POST /api/mock-interview/:sessionId/submit`) và phân tích khoảng cách kỹ năng (`POST /api/ai/skill-gap-simulator`).
2. **Anti-Ghosting Pizza-Tracker, Chỉ số SLA Phản hồi & Constructive AI Rejection**:
   - Theo dõi tiến trình hồ sơ thời gian thực theo 7 giai đoạn (`Cvs.applicationStage`: `SUBMITTED` → `AI_SCREENED` → `HR_VIEWED` → `SHORTLISTED` → `INTERVIEW_SCHEDULED` → `OFFERED` / `REJECTED`).
   - Tự động ghi nhận `hrViewedAt`, tính toán thời gian phản hồi trung bình (`Companies.avgResponseHours`) và tỷ lệ xử lý hồ sơ trong 72h (`Companies.responseRate`), bắn sự kiện `cv:stage_updated` qua Socket.IO.
   - Khi HR từ chối hồ sơ kèm ghi chú nội bộ (`REJECTED`), AI tự động biên tập thành thư góp ý nhân văn (`aiFeedbackForCandidate`) và gợi ý 3 tin tuyển dụng phù hợp hơn.
3. **Đánh giá doanh nghiệp có xác thực (Verified Candidate Reviews)**:
   - Mở rộng bảng `CompanyReviews` với `verificationType` (`PUBLIC`, `APPLICANT`, `INTERVIEWED_CANDIDATE`), `relatedCvId` (liên kết trực tiếp `Cvs.id`) và `interviewExperienceRating` (1–5 sao).
   - Tự động cấp huy hiệu `"Ứng viên đã phỏng vấn thực tế"` (`INTERVIEWED_CANDIDATE`) khi hồ sơ đạt từ giai đoạn `INTERVIEW_SCHEDULED` trở lên.
4. **Tuyển dụng ngược ẩn danh (Blind Profile & Salary Bidding Offer-First)**:
   - Mở rộng `UserSettings` với `isBlindProfile`, `minExpectedSalary` và `blockedCompanyIds` (chặn hoàn toàn công ty hiện tại không nhìn thấy hồ sơ trong kết quả tìm kiếm `GET /api/candidates/blind-search`).
   - Bảng `JobInvitations` (`POST /api/job-invitations`, sự kiện `invitation:received`) buộc HR cam kết khung lương (`offeredSalaryMin` – `offeredSalaryMax`) trước khi tiếp cận.
   - **Chống mất tiền oan cho HR**: Chỉ khi ứng viên bấm Chấp nhận (`POST /api/job-invitations/:invitationId/respond` với `action = 'ACCEPTED'`), hệ thống mới trừ 1 lượt mở khóa CV (`allowCvFree` / `allowCv` từ gói `OrderPackageCV`), mở khóa thông tin liên hệ hai chiều và tự động khởi tạo cuộc hội thoại trong `ChatMessages`.
5. **Xác thực năng lực thực tế (Proof-of-Skill qua GitHub API)**:
   - Đồng bộ dữ liệu public repositories, ngôn ngữ lập trình và tần suất commit qua `AuthIdentities` (`POST /api/profile/proof-of-skill/sync-github`) để gắn nhãn `"Kỹ năng đã xác thực qua mã nguồn"` vào `UserSkills`.

## Cấu trúc tệp tin đã triển khai

- Migration: [migrationzzzzzzzzzzzz-multi-industry-features.js](backend/src/migrations/migrationzzzzzzzzzzzz-multi-industry-features.js)
- Models mới: [mockInterviewSession.js](backend/src/models/mockInterviewSession.js), [jobInvitation.js](backend/src/models/jobInvitation.js)
- Models mở rộng: [detailpost.js](backend/src/models/detailpost.js), [cv.js](backend/src/models/cv.js), [company.js](backend/src/models/company.js), [companyReview.js](backend/src/models/companyReview.js), [userSetting.js](backend/src/models/userSetting.js), [userSkill.js](backend/src/models/userSkill.js)
- Service nghiệp vụ & AI: [differentiatorService.js](backend/src/services/differentiatorService.js)
- Controllers: [differentiatorController.js](backend/src/controllers/differentiatorController.js), [mockInterviewController.js](backend/src/controllers/mockInterviewController.js), [invitationController.js](backend/src/controllers/invitationController.js)
- Routes & Real-time Events: [differentiatorRoutes.js](backend/src/routes/differentiatorRoutes.js), [differentiator.events.v1.json](backend/src/contracts/differentiator.events.v1.json)
- Frontend Adapter & UI Component: [differentiatorService.js](frontend/src/service/differentiatorService.js), [MultiIndustryDifferentiatorHub.js](frontend/src/container/Candidate/MultiIndustryDifferentiatorHub.js)
- Kiểm thử tự động: [test-multi-industry-differentiator.cjs](backend/tests/test-multi-industry-differentiator.cjs)

## Cách sử dụng và kiểm thử

1. Chạy bộ kiểm thử tự động xác minh toàn bộ luồng nghiệp vụ đa ngành:
   ```bash
   node backend/tests/test-multi-industry-differentiator.cjs
   ```
2. Khi tích hợp vào thư mục gốc `DALN_JobFind`:
   - Sao chép thư mục `backend/` và `frontend/` (hoặc giải nén `DALN_JobFind_MultiIndustry_Features_Full.zip`) vào thư mục gốc dự án.
   - Trong `backend/src/routes/web.js`, gọi `registerDifferentiatorRoutes(router, protectedBy, PERMISSIONS)` từ `../routes/differentiatorRoutes`.
   - Chạy migration cập nhật cơ sở dữ liệu: `npx sequelize-cli db:migrate`.
