# Frontend plan · Phỏng vấn và thư mời

Feature ID: `interviews-offers` · Actor: COMPANY, EMPLOYER, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Cv/InterviewInvitationForm.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/Cv/OfferLetterForm.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/interviewSchema.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/offerSchema.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/applicationService.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/application-service/src/app.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/application-service/src/controllers/applicationController.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/application-service/src/libs/interview.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/application-service/src/libs/db.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `interviews-offers`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Calendar/agenda proposal theo JF-013/014
2. Interview form source
3. Offer/decision form source
4. Delivery status/history
5. Candidate interview/offer read view

## State/data ownership
- Session/actor lấy từ auth context/source guards; tenant từ server authorization.
- Server lists/tasks qua adapter/hook, UI controls/drafts ở component/hook phù hợp; URL state khi feature có filters/history.
- Dữ liệu schema và DTO đọc endpoint contract; interceptor đã trả response.data và có thể resolve error object.

## Task triển khai
1. Đối chiếu reference và source, chọn variant/mode; ghi khoảng cách cần sửa.
2. Reuse shell/components và tách blocks có props/event callbacks; scoped CSS/SCSS theo tokens reference.
3. Nối actions qua service/hook hiện có, giữ flags và ID namespace.
4. Bổ sung đầy đủ states và validation; khóa submit lặp, giữ draft và rollback optimistic update.
5. Giải quyết responsive/keyboard/PDF/media phù hợp với feature.
6. Chạy focused test/lint/build phù hợp; so screenshot/interaction và cập nhật QA/context.

## Quy tắc không thể bỏ qua
- Forms thư phỏng vấn/offer có trong pipeline; calendar tổng hợp độc lập là proposal.
- Asia/Ho_Chi_Minh và +07:00 theo validator hiện hành.
- Meeting URL/location/contact/deadline phải theo schema; event queued không chứng minh email delivered.
- application_events.decision_snapshot.interview ở PostgreSQL là snapshot lời mời; calendar latest-invitation là một MVP proposal, chưa có multi-round/cancel/RSVP persistence được chứng minh.
- confirmBy phải > now và ≤ interview start; bằng giờ bắt đầu hợp lệ. Duration tùy chọn 15–480 phút; timezone Asia/Ho_Chi_Minh/+07:00, logistics theo onsite/online/phone.
- Company/employer calendar cần frontend candidate-manage và API application:manage với S1/CS1/tenant. Candidate không dùng recruiter API: my-applications chỉ có stage/times, không interview snapshot; candidate read view cần plan mới.
- Invitation write hiện không có idempotency contract; khóa UI không bảo đảm exactly-once. Giữ timeout uncertain/no-auto-replay, plan idempotency khi cần. emailQueued không chứng minh delivered.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/applications/:id/interview-invitation | modern/applications | application:manage | body InterviewInvitation; response Application | 200 | companyRequired=True; idempotency=False |
| POST /api/applications/:id/decision-notification | modern/applications | application:manage | body Decision; response Application | 200 | companyRequired=True; idempotency=False |
| GET /api/my-applications | modern/applications | application:self:read | body none; response Record | 200 | companyRequired=False; idempotency=False |

## Kiểm tra behavior
- deadline trước start
- invalid URL/contact/time zone
- wrong application owner
- email failure/replay
- calendar API chưa có

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
