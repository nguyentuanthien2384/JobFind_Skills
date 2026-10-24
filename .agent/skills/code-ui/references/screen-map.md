# Bản đồ 37 màn Stitch

# Hợp đồng thiết kế và source

## Nguồn chính
- Stitch JobFind exact: https://stitch.withgoogle.com/projects/4225480897019041322
- Dự án mẫu gốc: https://stitch.withgoogle.com/projects/11086475323725615160
- Có 37 screen thật: 34 desktop 1280px và 3 mobile 390px; tên/kích thước bản sao đã được đối chiếu với mẫu.
- Figma V2 mở rộng: https://www.figma.com/design/aASrpnjI0sgztK3QB3fxtd?node-id=46-647. Catalog V2 có 192 screen/state mục tiêu, gồm 145 desktop và 47 mobile. Đây là bộ độc lập; duplicate prototype không nằm trong số 192.

## Chọn mode
**match-reference** mặc định cho yêu cầu giống bộ Stitch: giữ section order, màu, typography, assets và từng variant. Reference còn tên Tuyển Dụng VN/TalentArch/Career Architect/The Ledger; chỉ tên project mới là JobFind. Không tự đổi branding bên trong khi user yêu cầu y hệt.
**jobfind-normalized** khi user yêu cầu đồng nhất thương hiệu: giữ workflow/data contract, ghi token/brand/label đổi, nhận diện Figma V2 là mục tiêu riêng.

## Giữ sự thật
- PNG raster và canvas có thể khác tỷ lệ. Dùng canvas.width/height cho frame; raster.width/height cho đối chiếu ảnh.
- UID JF-001…JF-037 là local catalog ID, không phải Stitch screen ID. Chưa truy xuất ID màn thật thì để null, tìm màn theo title + dimensions; không dựng deep link.
- 37 màn là bộ reference hoàn chỉnh, không có nghĩa bao phủ mọi route app. Dùng route-coverage và extension backlog khi vẽ tiếp.
- Font/color observations trích từ từng code.html. Các spacing/states/a11y bổ sung phải gắn label extension/proposal.
- Trong React CRA, dịch HTML Tailwind sang JSX/CSS-SCSS scoped; không chép CDN/scripts của mockup vào app.
- Fixtures thiết kế không là dữ liệu live. Google/GitHub/Auth0 theo readiness; LinkedIn trong mẫu không chứng minh provider source.
- Calendar global/settings/recurring billing là phần cần plan source. Các form interview/offer, gói post/CV hiện có được giữ và mapping riêng.

## Handoff bắt buộc
Feature/screen/variant, source URL và assets, mode, actor/permissions, route status, component files, adapter/API/schema, UI states, responsive behavior, gap/proposal, acceptance và evidence.

## Quy tắc công cụ
Discover tool có thật trước gọi; theo skill plugin bắt buộc cho Figma. Dùng secure auth khi cần, chỉ trả link đã mở xác minh. Khi blocker, giữ prompt/spec offline và nêu đúng phần chưa hoàn thành.

| ID | Screen | Actor | Route | Feature | Source status |
| --- | --- | --- | --- | --- | --- |
| JF-001 | 404 Page - Tuyển Dụng VN | PUBLIC,CANDIDATE,COMPANY,EMPLOYER,ADMIN | * | master-layout | source-mapped |
| JF-002 | Admin Dashboard Overview | ADMIN | /admin/ | admin-overview | source-mapped |
| JF-003 | Billing & Subscriptions | COMPANY,ADMIN | /admin/buy-post; /admin/buy-cv | billing-packages | partial |
| JF-004 | Cài Đặt Hệ Thống - Admin Panel | ADMIN,COMPANY | — | system-proposals | proposal |
| JF-005 | Company Profile Editor - VNG Corporation | COMPANY,EMPLOYER | /admin/edit-company | company-profile | source-mapped |
| JF-006 | Danh Mục Công Ty | PUBLIC,CANDIDATE | /company | companies | source-mapped |
| JF-007 | Danh Sách Công Ty - Tuyển Dụng VN | PUBLIC,CANDIDATE | /company | companies | source-mapped |
| JF-008 | Duyệt Hồ Sơ Công Ty | ADMIN | /admin/list-company-admin | admin-companies | source-mapped |
| JF-009 | Hồ Sơ Của Tôi - Tuyển Dụng VN | CANDIDATE | /candidate/info | candidate-profile | source-mapped |
| JF-010 | Job Detail - Senior Frontend Developer | PUBLIC,CANDIDATE | /detail-job/:id | job-detail | source-mapped |
| JF-011 | Job Moderation - Admin Panel | ADMIN | /admin/list-post-admin | admin-jobs | source-mapped |
| JF-012 | Kho Ứng Viên - Tuyển Dụng VN | COMPANY,EMPLOYER | /admin/list-candiate | candidate-search | source-mapped |
| JF-013 | Lịch Phỏng Vấn & Agenda | COMPANY,EMPLOYER,CANDIDATE | /admin/pipeline | interviews-offers | partial |
| JF-014 | Lịch Phỏng Vấn - Career Architect | COMPANY,EMPLOYER,CANDIDATE | /admin/pipeline | interviews-offers | partial |
| JF-015 | Login - Premium Desktop | PUBLIC | /login | auth-login | source-mapped |
| JF-016 | Login - Tuyển Dụng VN | PUBLIC | /login | auth-login | source-mapped |
| JF-017 | Login - Tuyển Dụng VN | PUBLIC | /login | auth-login | source-mapped |
| JF-018 | Đơn Ứng Tuyển Của Tôi - Tuyển Dụng VN | CANDIDATE | /candidate/cv-post | applications | source-mapped |
| JF-019 | Đăng ký - Chọn vai trò | PUBLIC | /register | auth-register | source-mapped |
| JF-020 | Đăng Ký - Tuyển Dụng VN | PUBLIC | /register | auth-register | source-mapped |
| JF-021 | Đăng Tin Tuyển Dụng - Bước 1 | COMPANY,EMPLOYER,ADMIN | /admin/add-post | job-posting | source-mapped |
| JF-022 | Ứng tuyển: Bước 1 - Thông tin cá nhân | CANDIDATE | /detail-job/:id · modal | applications | partial |
| JF-023 | Ứng tuyển: Senior UI/UX Designer | CANDIDATE | /detail-job/:id · modal | applications | partial |
| JF-024 | Ứng tuyển: Senior UI/UX Designer (Desktop) | CANDIDATE | /detail-job/:id · modal | applications | partial |
| JF-025 | Phễu Tuyển Dụng - Senior Frontend Developer | COMPANY,EMPLOYER | /admin/pipeline | pipeline | source-mapped |
| JF-026 | Quản lý Gói dịch vụ | ADMIN | /admin/list-package-post; /admin/list-package-cv | admin-packages | source-mapped |
| JF-027 | Quản Lý Người Dùng - Admin Panel | ADMIN | /admin/list-user | admin-users | source-mapped |
| JF-028 | Registration - Premium Desktop | PUBLIC | /register | auth-register | source-mapped |
| JF-029 | Revenue & Analytics Dashboard | ADMIN | /admin/reports; /admin/sum-by-year-post; /admin/sum-by-year-cv | admin-reports-audit | source-mapped |
| JF-030 | Tin nhắn tuyển dụng | CANDIDATE,COMPANY,EMPLOYER,ADMIN | /chat/:partnerId; /admin/chat/:partnerId | chat | source-mapped |
| JF-031 | Trò chuyện & Tin nhắn | CANDIDATE,COMPANY,EMPLOYER,ADMIN | /chat/:partnerId; /admin/chat/:partnerId | chat | source-mapped |
| JF-032 | Trang 404 - Không Tìm Thấy | PUBLIC,CANDIDATE,COMPANY,EMPLOYER,ADMIN | * | master-layout | source-mapped |
| JF-033 | Trung Tâm Thông Báo - Tuyển Dụng VN | CANDIDATE,COMPANY,EMPLOYER,ADMIN | /candidate/notifications | notifications | source-mapped |
| JF-034 | Tuyển Dụng VN - Dashboard Doanh Nghiệp | COMPANY,EMPLOYER | /admin/ | employer-dashboard | source-mapped |
| JF-035 | Tuyển Dụng VN - Homepage | PUBLIC | / | home | source-mapped |
| JF-036 | Tuyển Dụng VN - Search Results | PUBLIC,CANDIDATE | /job | job-search | source-mapped |
| JF-037 | Xác thực Doanh nghiệp - Admin | ADMIN | /admin/list-company-admin | admin-companies | source-mapped |
