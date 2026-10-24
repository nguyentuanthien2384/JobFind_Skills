# Ý tưởng · Phỏng vấn và thư mời

Feature ID: `interviews-offers` · Actor: COMPANY, EMPLOYER, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện phỏng vấn và thư mời theo nhu cầu actor COMPANY, EMPLOYER, CANDIDATE, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Lên lịch/gửi thư theo scope được giao
2. Preview nội dung
3. Xem decision/interview snapshot

## Bằng chứng nguồn
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

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-013 | Lịch Phỏng Vấn & Agenda | 1280 × 1049 | partial |
| JF-014 | Lịch Phỏng Vấn - Career Architect | 1280 × 1035 | partial |

## Quy tắc nghiệp vụ
- Forms thư phỏng vấn/offer có trong pipeline; calendar tổng hợp độc lập là proposal.
- Asia/Ho_Chi_Minh và +07:00 theo validator hiện hành.
- Meeting URL/location/contact/deadline phải theo schema; event queued không chứng minh email delivered.
- application_events.decision_snapshot.interview ở PostgreSQL là snapshot lời mời; calendar latest-invitation là một MVP proposal, chưa có multi-round/cancel/RSVP persistence được chứng minh.
- confirmBy phải > now và ≤ interview start; bằng giờ bắt đầu hợp lệ. Duration tùy chọn 15–480 phút; timezone Asia/Ho_Chi_Minh/+07:00, logistics theo onsite/online/phone.
- Company/employer calendar cần frontend candidate-manage và API application:manage với S1/CS1/tenant. Candidate không dùng recruiter API: my-applications chỉ có stage/times, không interview snapshot; candidate read view cần plan mới.
- Invitation write hiện không có idempotency contract; khóa UI không bảo đảm exactly-once. Giữ timeout uncertain/no-auto-replay, plan idempotency khi cần. emailQueued không chứng minh delivered.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra deadline trước start với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra invalid URL/contact/time zone với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra wrong application owner với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra email failure/replay với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra calendar API chưa có với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/interviews-offers-idea.md → design-briefs/interviews-offers-brief.md → frontend-plans/interviews-offers-plan.md → backend-plans/interviews-offers-plan.md → endpoint-apis/interviews-offers-endpoints.md → qa/interviews-offers-qa.md
