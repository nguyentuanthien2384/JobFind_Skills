# EXT-JF-014-AI-MOCK-INTERVIEW · AI Mock Interview Huấn Luyện Viên Cá Nhân Sát JD

## Identity và độ tin cậy
Feature `interviews-offers` · Sub-feature: `ai-mock-interview-coach` · Actor: CANDIDATE
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-014-AI-MOCK-INTERVIEW` (Biến thể mở rộng từ JF-014).
Canvas: 1280 × 1600 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/interview/mock-coach/:interviewId`.

## Nghiệp vụ cốt lõi
1. **Nâng cấp từ AI Screening một chiều sang Huấn luyện viên tương tác:** Biến dữ liệu JD chi tiết và kinh nghiệm trong CV của ứng viên thành bối cảnh phỏng vấn thử 1-on-1.
2. **Kịch bản 5 vòng câu hỏi thực tế:** Câu hỏi mở đầu, câu hỏi chuyên môn sâu (React 18 Concurrent), xử lý xung đột dự án & deadline, System Design, và đặt câu hỏi cho nhà tuyển dụng.
3. **Phản hồi tức thì & Báo cáo Radar Chart:** Chấm điểm từng câu trả lời theo phương pháp STAR, chỉ ra điểm mạnh cần phát huy và điểm yếu cần tránh trước buổi phỏng vấn chính thức.

## Source mapping
- Frontend: `frontend/src/container/Candidate/InterviewMockCoach.js`
- Adapter API: `frontend/src/service/aiService.js`, `frontend/src/service/interviewService.js`
- Backend Controller/Model: `backend/src/controllers/aiController.js`, `backend/src/controllers/interviewController.js`.

## Assets
- Mockup HTML: `.stitch/designs/luyen_phong_van_ai_mock_interview_jd/code.html`
- Prompt: `.stitch/prompts/EXT-JF-014-AI-MOCK-INTERVIEW.md`
- Màn hình liên kết: `JF-013`/`JF-014` (Lịch phỏng vấn), `JF-010` (Job detail).
