# Backend plan · Phỏng vấn và thư mời

Feature ID: `interviews-offers` · Actor: COMPANY, EMPLOYER, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Nguồn hiện hành
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

## Owner và dữ liệu
Trace endpoint tới controller/service/store. Legacy backend và job-core MySQL, application PostgreSQL, identity/audit MongoDB và search projection có owner riêng. Feature không cần schema mới thì ghi không áp dụng; không tạo bảng chỉ từ layout.

## API hiện có
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/applications/:id/interview-invitation | modern/applications | application:manage | body InterviewInvitation; response Application | 200 | companyRequired=True; idempotency=False |
| POST /api/applications/:id/decision-notification | modern/applications | application:manage | body Decision; response Application | 200 | companyRequired=True; idempotency=False |
| GET /api/my-applications | modern/applications | application:self:read | body none; response Record | 200 | companyRequired=False; idempotency=False |

## Quy tắc dữ liệu và nghiệp vụ
- Forms thư phỏng vấn/offer có trong pipeline; calendar tổng hợp độc lập là proposal.
- Asia/Ho_Chi_Minh và +07:00 theo validator hiện hành.
- Meeting URL/location/contact/deadline phải theo schema; event queued không chứng minh email delivered.
- application_events.decision_snapshot.interview ở PostgreSQL là snapshot lời mời; calendar latest-invitation là một MVP proposal, chưa có multi-round/cancel/RSVP persistence được chứng minh.
- confirmBy phải > now và ≤ interview start; bằng giờ bắt đầu hợp lệ. Duration tùy chọn 15–480 phút; timezone Asia/Ho_Chi_Minh/+07:00, logistics theo onsite/online/phone.
- Company/employer calendar cần frontend candidate-manage và API application:manage với S1/CS1/tenant. Candidate không dùng recruiter API: my-applications chỉ có stage/times, không interview snapshot; candidate read view cần plan mới.
- Invitation write hiện không có idempotency contract; khóa UI không bảo đảm exactly-once. Giữ timeout uncertain/no-auto-replay, plan idempotency khi cần. emailQueued không chứng minh delivered.

## Trình tự task
1. Đọc route/guard/controller/service/schema và xác định phần reuse/đổi/thêm.
2. Validate params/query/body theo contract thật; actor/tenant lấy phía server.
3. Chỉ thêm migration khi field/index/constraint cần thiết; ghi rollback/backfill.
4. Đặt state write và outbox trong cùng transaction khi feature có event, dedupe tại consumer.
5. Giữ response/error/pagination tương thích adapter frontend; không tự replay write sau timeout/refresh.
6. Kiểm tra success/failure/401/403/owner chéo/duplicate phù hợp; cập nhật endpoint và QA.

## Consistency và failure
- application.id, legacy_cv_id, job ID và prepared CV _id phải được ghi đúng trong mapping.
- Phân biệt accepted/queued/sent/delivered. Nếu dependency/provider lỗi, ghi state có thể retry đúng phạm vi.
- Internal route không public vì permission field null; đọc trust middleware và gateway registration.

## Test theo rủi ro
- deadline trước start
- invalid URL/contact/time zone
- wrong application owner
- email failure/replay
- calendar API chưa có

## Kết quả
Patch vào owner/controller/service/contract/model thực sự cần thiết; kiểm tra có evidence và plan rollout nếu user giao đổi mode. Các lệnh live migration/seed/payment/email không được tự chạy để hoàn tất plan.
