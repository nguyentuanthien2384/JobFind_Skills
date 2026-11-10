# EXT-JF-018-PIZZA-TRACKER · Anti-Ghosting Pizza-Tracker, Chỉ Số SLA & Constructive AI Rejection

## Identity và độ tin cậy
Feature `applications` (liên thông `pipeline`, `notifications`, `companies`) · Sub-feature: `pizza-tracker-sla-constructive-rejection` · Actor: CANDIDATE, EMPLOYER, COMPANY
Stitch project: https://stitch.withgoogle.com/projects/4225480897019041322
Local key: `EXT-JF-018-PIZZA-TRACKER` (Biến thể mở rộng từ JF-018).
Canvas: 1280 × 1700 (DESKTOP).
Trạng thái thiết kế: `proposal-complete`.
Route status: `/my-applications/tracker` (hoặc `/candidate/cv-post`).

## Nghiệp vụ cốt lõi
1. **Tiến trình ứng tuyển minh bạch thời gian thực (Pizza-Tracker 7 giai đoạn):**
   - Theo dõi chính xác trạng thái `Cvs.applicationStage`: `SUBMITTED` (Đã nộp) $\rightarrow$ `AI_SCREENED` (AI đã chấm điểm tình huống) $\rightarrow$ `HR_VIEWED` (HR đang mở xem) $\rightarrow$ `SHORTLISTED` (Danh sách rút gọn) $\rightarrow$ `INTERVIEW_SCHEDULED` (Đã đặt lịch phỏng vấn) $\rightarrow$ `OFFERED` (Đề nghị nhận việc) / `REJECTED` (Từ chối kèm phản hồi xây dựng).
   - Ngay khi HR mở xem CV hoặc đổi trạng thái, hệ thống ghi nhận `hrViewedAt`, `stageUpdatedAt` và bắn sự kiện thời gian thực `cv:stage_updated` qua `socket.js` cùng thông báo đẩy tới ứng viên.
2. **Chỉ số "SLA Phản hồi" của Nhà tuyển dụng:**
   - Tự động tính toán thời gian phản hồi trung bình `Companies.avgResponseHours` (từ `Cvs.createdAt` đến `Cvs.hrViewedAt`) và tỷ lệ xử lý hồ sơ trong vòng 72 giờ `Companies.responseRate` để gắn huy hiệu minh bạch cho doanh nghiệp.
3. **Constructive AI Rejection (Thư từ chối nhân văn bằng AI):**
   - Khi HR chuyển trạng thái sang `'REJECTED'` kèm ghi chú nội bộ trong `note.js` (ví dụ: *"Thiếu kinh nghiệm chạy Ads ngân sách lớn"*), AI tự động biên tập thành thư góp ý lịch sự lưu vào `Cvs.aiFeedbackForCandidate` và đính kèm 3 bài đăng (`post.js`) ở phân khúc phù hợp hơn.

## Thiết kế Database, Real-time Events & API
- **Migration:** `backend/src/migrations/migrationzzzzzzzzzzzz-multi-industry-features.js`
- **Mở rộng bảng `Cvs` (`cv.js`):**
  - `applicationStage` (`ENUM('SUBMITTED', 'AI_SCREENED', 'HR_VIEWED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'REJECTED')`)
  - `stageUpdatedAt` (`DATE`)
  - `hrViewedAt` (`DATE`, nullable)
  - `aiFeedbackForCandidate` (`TEXT`, nullable)
- **Mở rộng bảng `Companies` (`company.js`):**
  - `avgResponseHours` (`FLOAT`, default: `null`)
  - `responseRate` (`FLOAT`, default: `0`)
- **Real-time Event (`backend/src/contracts/differentiator.events.v1.json` & `socket.js`):**
  - Event `cv:stage_updated` phát tới phòng `user:<candidateId>`.
- **API Endpoints:**
  - `PUT /api/cv/stage` & `POST /api/cv/stage` (`RECRUITMENT_READ`)

## Source mapping
- Frontend: `frontend/src/container/Candidate/MultiIndustryDifferentiatorHub.js`, `frontend/src/container/Candidate/ManageCvCandidate.js`
- Adapter API: `frontend/src/service/differentiatorService.js` (`updateCvStageTrackerService`)
- Backend: `backend/src/controllers/differentiatorController.js`, `backend/src/services/differentiatorService.js`, `backend/src/models/cv.js`, `backend/src/models/company.js`, `backend/src/contracts/differentiator.events.v1.json`

## Assets
- Mockup HTML: `.stitch/designs/don_ung_tuyen_pizza_tracker_sla_realtime/code.html`
- Prompt: `.stitch/prompts/EXT-JF-018-PIZZA-TRACKER.md`
- Màn hình liên kết: `JF-018` (Đơn ứng tuyển), `JF-025` (Phễu tuyển dụng), `JF-033` (Thông báo), `EXT-JF-006-VERIFIED-REVIEWS`.
