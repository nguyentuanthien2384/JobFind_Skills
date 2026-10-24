# Handoff lịch phỏng vấn — JF-014

Feature `interviews-offers`, canvas 1280 × 1035, mode `match-reference`. Form gửi lời mời trên `/admin/pipeline` đã có; lịch tổng hợp còn partial/PROPOSAL. Candidate read view chưa hoạt động qua `my-applications` hiện hành.

## Ownership và contract hiện có

Application-service/PostgreSQL sở hữu `applications` và `application_events.decision_snapshot.interview`. Invitation POST ghi stage, event và outbox trong cùng transaction. Source: `src/controllers/applicationController.js`, `src/libs/{db,interview}.js`, `microservices/shared/contracts/{operations,interviewSchema}.js`; frontend `InterviewInvitationForm.js` và `applicationService.js`.

Validator dùng `Asia/Ho_Chi_Minh`/UTC+7, start ở tương lai; duration tùy chọn dạng string 15–480 phút. Onsite cần location, online cần HTTP(S) URL, phone cần số liên hệ. `confirmBy > now && confirmBy <= start`; bằng giờ bắt đầu hợp lệ.

## MVP đề xuất

1. Chọn calendar variant của pipeline hoặc route `/admin/interviews` mới theo scope và ghi PROPOSAL.
2. Khai báo API đọc lịch mới, query/response/permission/range/pagination rõ; chưa có trong 71 operation snapshot.
3. Đọc invitation mới nhất cho mỗi application theo `created_at DESC,id DESC` **trước** khi lọc khoảng ngày. Đổi lịch sang tháng sau không được tìm lại snapshot cũ trong tháng trước.
4. Không tự tạo buổi từ stage `phong_van`; thiếu snapshot là chưa có lịch. Duration thiếu trả nullable, không tự đặt 60 phút.
5. MVP latest invitation có thể dùng dữ liệu hiện có; multi-round, cancel, RSVP và internal drafts cần domain/schema proposal riêng. Không tạo bảng calendar chỉ từ ảnh.

`interviewers` hiện là text, không là staff user IDs; không dựng bộ lọc/chống trùng lịch người từ chuỗi này. Bounded range/paging, UTC+7 và sort ổn định phải có acceptance. Nếu thêm static `/applications/interviews`, đăng ký trước dynamic `/:id`.

## Quyền và candidate boundary

FE `MANAGE_CANDIDATES`/`company.candidates.manage` khác API `application:manage`. COMPANY/EMPLOYER cần S1/CS1 và tenant xác minh; ADMIN theo chính sách source và test riêng. Không tin companyId do client cung cấp.

Candidate có `application:self:read`; `my-applications` chỉ trả id, legacy_cv_id, job_id/job_title, stage và các times, không trả interview/offer. `applications/:id` vẫn manage-guarded ở gateway/service dù controller có candidate branch. Self calendar/detail cần scoped contract mới; không lộ recruiter notes/rating hoặc ứng viên khác.

## Writes và delivery

Reuse invitation form và POST hiện có. Invitation write chưa có idempotency contract; disabled UI không bảo đảm exactly-once. Timeout giữ draft và trạng thái chưa xác định, đọc history trước retry chủ đích; không tự replay POST sau refresh. `emailQueued` là đã xếp hàng, không là delivered hay candidate confirmed.

## Acceptance — NOT_RUN

Cross-company/role/readiness/candidate-self filtering; confirmBy boundary; latest-before-range/reschedule/tied timestamps; nửa đêm UTC+7/missing duration/stage thiếu invitation; bounded pagination/races/loading/empty/error; duplicate/timeout/email queue; keyboard và responsive extension. Candidate view, multi-round/cancel/RSVP giữ PROPOSAL đến khi contract và implementation có bằng chứng. Đọc package/test hiện tại trước chạy; không coi kế hoạch là kết quả runtime.
