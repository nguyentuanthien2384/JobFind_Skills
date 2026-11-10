# Prompt thiết kế · EXT-JF-012-REVERSE-RECRUITING · Tuyển Dụng Ngược Ẩn Danh (Blind Profile & Salary Bidding)

Sử dụng dự án Stitch hiện có của JobFind: https://stitch.withgoogle.com/projects/4225480897019041322. Tạo biến thể mở rộng (extension) từ màn hình chuẩn JF-012 ("Kho Ứng Viên - Tuyển Dụng VN"), kích thước canvas 1280 × 1600; mã danh mục cục bộ là EXT-JF-012-REVERSE-RECRUITING.

**MỤC ĐÍCH / VAI TRÒ (PURPOSE / ACTOR)**
- Tính năng: Tuyển dụng ngược ẩn danh (Blind Profile & Salary Bidding Offer-First):
  + Mở rộng `UserSettings` (`isBlindProfile`, `minExpectedSalary`, `blockedCompanyIds`): Ẩn Họ tên, SĐT, Email, Ảnh đại diện và Công ty hiện tại; lọc bỏ hoàn toàn ứng viên có `blockedCompanyIds` chứa `companyId` của HR đang đăng nhập (`GET /api/candidates/blind-search`).
  + Tạo bảng `JobInvitations` (`companyId`, `recruiterId`, `candidateId`, `postId`, `offeredSalaryMin`, `offeredSalaryMax`, `pitchMessage`, `status`, `respondedAt`): HR gửi lời mời kèm khung lương đề xuất (`POST /api/job-invitations`, sự kiện `invitation:received`).
  + Chống mất tiền oan cho HR: Chỉ khi ứng viên bấm Chấp nhận (`POST /api/job-invitations/:invitationId/respond` với `ACCEPTED`), hệ thống mới trừ 1 lượt trong gói `orderPackageCv.js`, mở khóa thông tin liên hệ và tự động tạo cuộc hội thoại trong `chatController.js`.
- Vai trò người dùng: CANDIDATE (Ứng viên tìm việc), EMPLOYER / COMPANY (Nhà tuyển dụng).

**HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM - BẮT BUỘC)**
- Chế độ: match-reference (khớp mẫu chuẩn Material 3 của JobFind).
- Phông chữ: Headline `Be Vietnam Pro`, Body & Label `Inter`.
- Bảng màu: Brand Primary `#004AC6`, Blind Dark `#0F172A`, Gold Accent `#F59E0B`, Success `#059669`.

**BÀN GIAO MÃ NGUỒN VÀ LIÊN KẾT**
- Mockup HTML hoàn chỉnh: `.stitch/designs/tuyen_dung_dao_chieu_blind_profile_bidding/code.html`.
- Liên kết hệ thống: Nối trực tiếp từ Kho ứng viên `JF-012`, gói dịch vụ `JF-003`, phòng chat `JF-030`/`JF-031`, và cài đặt hồ sơ `JF-009`.
- Trạng thái thiết kế: `proposal-complete` (100% tiếng Việt tự nhiên).
