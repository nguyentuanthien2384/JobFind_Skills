# Nghiệp vụ tuyển dụng và giao dịch

## File đầu mối
`frontend/src/service/applicationService.js`, `applicationProgress.js`, `recruiterAi.js`, `jobPostingService.js`, `jobFormAdapter.js`; `frontend/src/components/modal/SendCvModal.js`; `frontend/src/container/system/Cv/`, `container/Candidate/`, `container/system/Post/` (xác minh tên bằng rg).
Legacy: `backend/src/services/postService.js`, `cvService.js`, `candidateSearchService.js`, `paymentIntegrityService.js`, `packagePostService.js`, `packageCvService.js`; `utils/postingQuota.js`, `jobEdit.js`, `jobRepost.js`.
Modern: Application Service + Job Core + shared `interviewSchema.js`/`offerSchema.js`; docs `recruitment-interview-email.md`, `recruitment-offer-email.md`, `candidate-search.md`.

## Luồng phải giữ
Tìm tin công khai → chi tiết `/detail-job/:id` → ứng viên đăng nhập → form/modal CV → review → submit đúng một ý định → lịch sử `/candidate/cv-post`. Việc gửi CV trong chat không tạo application. External job `/external-job/:id` cần giữ loại nguồn và đích ứng tuyển ngoài, không mặc định có API nộp CV nội bộ.
Nhà tuyển dụng tạo/sửa tin → quota và tenant → pending moderation → public khi hợp lệ. Repost khác edit hạn; giữ chính sách và idempotency trong source.

| Stage key trong code | Nhãn thiết kế |
|---|---|
| moi_ung_tuyen | Mới ứng tuyển |
| dang_xem_xet | Đang xem xét |
| phong_van | Phỏng vấn |
| de_nghi | Đề nghị nhận việc |
| nhan_viec | Đã nhận việc |
| tu_choi | Từ chối |

Không thay stage keys bằng tiếng Anh từ Stitch. Đọc service để biết transition được phép; không giả định mọi kéo thả hợp lệ. Chi tiết ứng viên, rating, notes và talent pool tenant-private. Join tiến trình `legacy_cv_id` + job ID, không dùng application id như legacy CV id.

## Interview/offer/email
API `POST /api/applications/:id/interview-invitation`, `.../decision-notification`; stage `PATCH .../:id/stage`. Mời phỏng vấn có ngày/giờ/timezone/location theo schema; offer có trường bắt buộc theo schema. UI bắt người gửi xem lại nội dung. `emailQueued` chỉ báo đã xếp hàng; trạng thái sent cần bằng chứng delivery. Không tự gửi email/tin nhắn trong lúc code/test nếu user chưa cho phép.
AI viết lời nhắn chỉ là draft, không tự tạo lương/ngày/hứa hẹn, không tự loại ứng viên hay đổi stage.

## Gói đăng tin/CV
Các trang `/admin/buy-post`, `/admin/buy-cv`, `/admin/history-post`, `/admin/history-cv` và payment success/cancel đã có. COMPANY và EMPLOYER không có quyền mua gói giống nhau. Không suy ra subscription auto-renew từ màn billing Stitch.
Quyền/lượt xem candidate: mở lại hồ sơ đã unlock không trừ lại; không lộ CV trước kiểm tra entitlement. Giá, số lượt, trạng thái thanh toán lấy từ backend. Kiểm tra payment capture/return, binding intent, retry và quota atomic trong service; browser redirect success không tự chứng minh đã trả tiền.

## Nghiệm thu
Đúng/sai tenant; company pending/banned; ứng tuyển trùng; hết hạn tin; hồ sơ đã xóa; filter/sort thay đổi; race quota và retry; six-stage mapping; bảo mật notes; delayed event/email; CV namespace; mobile modal/PDF. Gắn case với test module thật, tránh seed dữ liệu thật.
