# Handoff ứng tuyển — JF-024 desktop và JF-023 mobile

Feature `applications`, actor `CANDIDATE`, mode `match-reference`. Đây là hai biến thể native cùng luồng `/detail-job/:id` → modal; chưa có route `/apply`.

| Variant | Canvas | PNG raster |
|---|---|---|
| JF-024 desktop | 1280 × 1249 | 1600 × 1561 |
| JF-023 mobile | 390 × 1817 | 487 × 2268 |

## Component contract từ source

| Component/khối | Contract hiện hành | Handoff |
|---|---|---|
| `JobDetail.js` | Job data và trigger mở modal; auth return intent | Truyền job summary đã tải; kiểm tra deadline lại trước gửi |
| `SendCvModal` | `isOpen`, `postId`, `jobTitle`, `onHide`, `onSubmitted` | Giữ controller và session behavior; shell/stepper/summary/action bar mới là đề xuất |
| `ApplicationForm` | `type`, `description`, file, saved file, prepared, reviewed, reading/loading/feedback; refs chống gửi lặp và phản hồi cũ | Giữ draft trong memory; thay source/job/session loại preview cũ |
| `PreparedCvPicker` | `token`, `disabled`, `onPrepared`; chọn bằng MongoDB `_id` | Refresh/đổi lựa chọn loại preview/approval; tạo PDF local và xem lại |
| `PdfPreviewButton`/`DocumentPreviewModal` | Preview/download hiện có | Giữ session, labels, focus trap/restore và Escape khi mở modal lồng |
| `ApplicationAiHelper` | Theo candidate AI flag | Phần bổ sung ngoài ảnh, không tự gọi provider khi mở |

Modal source hiện rộng tối đa 900px; muốn khớp desktop cần presentation phù hợp canvas nhưng giữ route và hành vi truy cập. Submit dùng đúng bytes PDF đã xem, không refetch/regenerate trong lúc gửi.

## Adapter, quyền và payload

| Hành động | Adapter → endpoint | Dữ liệu/quyền |
|---|---|---|
| CV online | `userService.getDetailUserById` → `GET /api/get-detail-user-by-id?id=…` | `data.userAccountData.userSettingData.file`; resource authorization |
| CV đã chuẩn bị | `aiSearchService.listMyCvs` → `GET /api/profile/cvs` | `validateCvList` ở `candidateWorkspace`; modern `cv:self:manage` |
| Nộp hồ sơ | `cvService.createNewCv` → `POST /api/create-new-cv` | `{userId,postId,file,description}`; legacy `candidate:apply`, FE `candidate.jobs.apply` |
| Lịch sử đã nộp | `GET /api/get-all-cv-by-userId` | Rows/count theo legacy adapter, self/resource ownership |
| Tiến trình | `applicationService.getMyApplications` → `GET /api/my-applications` | Stage/times; modern `application:self:read`; progress flag riêng |

Backend thay `userId` body bằng `req.user.id`, chỉ active CANDIDATE được nộp; ADMIN cũng không apply. `Cv.id` MySQL, application `id` PostgreSQL và prepared CV `_id` Mongo là ba namespace khác nhau. Tiến trình nối bằng `legacy_cv_id` và job ID; payload nộp hiện chỉ có PDF bytes, không có prepared CV ID.

## Validation và source gaps

| Trong reference | Source thực tế | Quyết định khi code |
|---|---|---|
| Desktop PDF 10 MB; mobile PDF/DOCX 10 MB | UI PDF-only ≤2 MiB, kiểm data URL và `%PDF-` | Giữ ảnh exact; functional UI cần ghi giới hạn thật. DOCX/10 MB cần contract/backend plan riêng |
| Input portfolio URL | Chưa có field trong payload/model/event | Không nhận rồi bỏ dữ liệu; bổ sung contract hoặc biểu đạt chưa hỗ trợ |
| Ghi chú có vẻ optional | `description` bắt buộc 1–255 Unicode characters | Label/helper/validation theo yêu cầu thật; không ngầm coi note optional là intro bắt buộc |
| Wizard ba bước | Source là modal, chưa có wizard state | Mobile Continue chỉ chuyển bước; chỉ explicit final submit gọi POST; giữ draft qua các bước |
| Recruiter/SLA 3–5 ngày trong mẫu | Chưa có field/cam kết live tương ứng đầy đủ | Dùng source data khi có; không biến fixture thành cam kết |
| Lịch/offer của candidate | `my-applications` không trả snapshot; application detail yêu cầu manage | Candidate read view cần contract mới, không gọi API recruiter hoặc lộ internal notes |

`backend/src/utils/legacyApplication.js` hiện chỉ kiểm `file` là string không rỗng; chưa enforce PDF/2 MiB tại submit. Đây là server validation gap, không được suy từ frontend validation. Không có nguồn hỗ trợ rút đơn.

## Error, session và ghi dữ liệu

| Response | UI |
|---|---|
| `errCode:0` và không HTTP error | Gọi `onSubmitted`, đóng modal, refresh phạm vi liên quan |
| `1/400` | Validation, giữ input |
| `2/503` | Storage/outbox chưa sẵn sàng, feedback và retry có chủ đích |
| `3/403` hoặc `3/404` | Sai actor hoặc job/company không public; không báo success |
| `4/409` | Job hết hạn |
| `5/409` | Đã nộp; hướng dẫn đối chiếu Công việc đã nộp |
| Timeout/5xx/mất phản hồi | Chưa xác nhận kết quả, kiểm lịch sử trước gửi lại |

Writes không tự replay sau refresh. Session đổi/kết thúc thì không nhận late response của actor cũ. Giữ độc lập các flags prepared CV, candidate AI và application progress. CV + `application.submitted` outbox ghi trong transaction với unique `(userId,postId)`; progress projection có thể chậm.

## Acceptance — NOT_RUN

Kiểm actor/forged userId, job deadline/public/company state; zero-byte/signature/MIME/sát-vượt 2 MiB/DOCX; intro 0/255/256 Unicode; flags và picker rỗng/lỗi/late response; đổi nguồn/CV/job/session; bytes đã review; double click/duplicate/lost response/write 401; projection lag/ID mismatch; canvas desktop/mobile, bàn phím, focus và sticky CTA. Ghi commands/screenshots thực sau implementation. Source/tests hiện có không chứng minh các ca đã pass.


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
