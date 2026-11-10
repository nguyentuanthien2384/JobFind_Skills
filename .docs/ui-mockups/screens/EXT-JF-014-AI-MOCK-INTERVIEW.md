# EXT-JF-014-AI-MOCK-INTERVIEW · AI Mock Interview Đa Ngành Sát JD & CV

## Identity và độ tin cậy
Feature `interviews-offers` · Sub-feature: `ai-mock-interview-multi-industry` · Actor: CANDIDATE
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-014-AI-MOCK-INTERVIEW` (Biến thể mở rộng từ JF-014).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/interview/mock-coach/:interviewId` (hoặc mở từ lịch phỏng vấn / trang chi tiết việc làm).

## Nghiệp vụ cốt lõi (Đa ngành nghề)
1. **Nâng cấp từ AI Screening một chiều sang Huấn luyện viên phỏng vấn cá nhân (Role-play):**
   - Kết nối dữ liệu bài đăng (`post.js` / `detailpost.js`) và kỹ năng ứng viên (`userSkill.js`) để đóng vai Trưởng bộ phận theo đúng đặc thù ngành nghề:
     - **Sales / CSKH:** Đóng vai Giám đốc Kinh doanh hỏi về chốt deal B2B, quản trị phễu doanh số và xử lý khiếu nại.
     - **Marketing / Truyền thông:** Đóng vai CMO hỏi về tối ưu CPA/ROAS, chiến lược Launching và xử lý khủng hoảng truyền thông.
     - **Kế toán / Nhân sự / Hành chính:** Đóng vai Kế toán trưởng / HR Director hỏi về đối soát chứng từ, tuân thủ thuế và giải quyết xung đột nội bộ.
     - **IT / Phần mềm:** Đóng vai Tech Lead hỏi về kiến trúc hệ thống, Transaction/Idempotency và xử lý Production Incident.
2. **Kịch bản 5 câu hỏi & Báo cáo cải thiện CV trước khi ứng tuyển/phỏng vấn thật:**
   - Chấm điểm tổng thể `overallScore` (thang 10), phân tích điểm mạnh (`strengths`), điểm yếu (`weaknesses`), biểu đồ năng lực 5 trục (Radar) và gợi ý chỉnh sửa CV (`cvImprovementTips`) kèm câu trả lời mẫu theo mô hình STAR (`sampleAnswers`).

## Thiết kế Database & API
- **Migration:** `backend/src/migrations/migrationzzzzzzzzzzzz-multi-industry-features.js`
- **Bảng mới `MockInterviewSessions` (`backend/src/models/mockInterviewSession.js`):**
  - `id` (`INTEGER`, PK, AutoIncrement)
  - `userId` (`INTEGER`, FK tới `user.js`)
  - `postId` (`INTEGER`, FK tới `post.js`)
  - `questions` (`JSON`, danh sách 5 câu hỏi theo JD)
  - `transcript` (`JSON`, lịch sử câu trả lời của ứng viên)
  - `overallScore` (`FLOAT`, điểm tổng kết)
  - `feedback` (`JSON`: `{ strengths, weaknesses, radar, cvImprovementTips, sampleAnswers }`)
  - `status` (`ENUM('IN_PROGRESS', 'COMPLETED')`)
- **API Endpoints:**
  - `POST /api/mock-interview/start` (`ACCOUNT_SELF`)
  - `POST /api/mock-interview/:sessionId/submit` (`ACCOUNT_SELF`)

## Source mapping
- Frontend: `frontend/src/container/Candidate/MultiIndustryDifferentiatorHub.js`
- Adapter API: `frontend/src/service/differentiatorService.js` (`startMockInterviewService`, `submitMockInterviewService`)
- Backend: `backend/src/controllers/mockInterviewController.js`, `backend/src/controllers/differentiatorController.js`, `backend/src/services/differentiatorService.js`, `backend/src/models/mockInterviewSession.js`

## Assets
- Mockup HTML: `.stitch/designs/luyen_phong_van_ai_mock_interview_jd/code.html`
- Prompt: `.stitch/prompts/EXT-JF-014-AI-MOCK-INTERVIEW.md`
- Màn hình liên kết: `JF-013`/`JF-014` (Lịch phỏng vấn), `JF-010` (Job detail), `EXT-JF-024-MICRO-ASSESSMENT`.
