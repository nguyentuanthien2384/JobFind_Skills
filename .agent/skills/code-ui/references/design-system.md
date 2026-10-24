# JobFind — exact reference và normalized proposal

## Chọn mode trước dùng tokens
Default **match-reference**: dùng references/design-contract.md, screen-catalog.json và tokens của đúng HTML/frame native. Desktop canvas 1280, mobile390; raster PNG có thể tỷ lệ khác. Đừng áp palette/typography/layout chuẩn hóa bên dưới cho yêu cầu giống y hệt Stitch.

Phần dưới chỉ áp dụng **jobfind-normalized** khi user giao đồng nhất thương hiệu. Figma V2 desktop1440/mobile390 là target riêng, không thay native canvas. Những kích thước/thông số bổ sung là design proposal, không là dữ liệu trích chung cho cả37màn.

# JobFind — thiết kế mục tiêu từ Stitch

## Hai nguồn màu cần phân biệt
Source hiện tại có `$colormain:#0071ba` ở `frontend/src/css/styles/_variables.scss` và `--jf-primary:#4b49ac` ở `container/system/AdminLayout.css`. Bộ Stitch dùng nhiều thương hiệu/biến thể. Thiết kế mục tiêu hợp nhất thành **JobFind**, giữ mô-típ xanh dương, nền sáng, thẻ bo 12px. Đây là đề xuất giao diện mới, không khẳng định đã áp dụng vào source.

| Token mục tiêu | Giá trị | Cách dùng |
|---|---|---|
| brand.primary | #2563EB | CTA chính, lấy từ `primary-container` của Stitch homepage |
| brand.strong | #004AC6 | Link/hover, lấy từ `primary` của cùng màn hình |
| brand.soft | #DBE1FF | Trạng thái chọn, nền phụ |
| surface.canvas | #F7F9FB | Nền trang |
| surface.card | #FFFFFF | Card/form/table |
| text.primary | #191C1E | Nội dung chính |
| text.secondary | #434655 | Nhãn/mô tả |
| border.default | #C3C6D7 | Phân cách/form |
| status.danger | #BA1A1A | Lỗi, thao tác phá hủy |
| status.success | #15803D | Thành công; bổ sung từ token hiện có của admin |
| status.warning | #B45309 | Cần chú ý; bổ sung từ token hiện có của admin |

Typography mục tiêu: Be Vietnam Pro cho tiêu đề; Inter cho nội dung; fallback sans-serif có tiếng Việt. Kích cỡ 12/14/16/20/24/32/48; body 16 line-height 1.5. Khoảng cách 4/8/12/16/24/32/48/64; radius 8 input, 12 card, 16 modal. Button/input tối thiểu 44px cao, target 44×44. Không chỉ dùng màu để báo trạng thái.

## Bố cục và component
- Public: header 72px, container max 1200px, hero/search, danh sách card, footer. Dashboard: sidebar 248px, header 72px, nội dung co giãn. Đây là layout mục tiêu; admin source có sidebar 281px, nên đổi đồng bộ cả shell khi triển khai.
- Desktop thiết kế 1440px; tablet 768px; mobile 390px và kiểm tra đến 360px. Sidebar thành drawer, filter thành panel, bảng dùng cuộn nội bộ/row card; không gây tràn ngang toàn trang.
- Component library: Brand, PublicHeader, WorkspaceSidebar, Button, IconButton, FormField, SearchBar, JobCard, CompanyCard, FilterGroup, Pagination, StatusBadge, MetricCard, DataTable, KanbanCard, CandidateDrawer, Stepper, PdfPreview, ConversationRow, MessageBubble, EmptyState, InlineError, ConfirmDialog, Toast.
- Mỗi component có default/hover/focus/disabled/loading nếu có tương tác. Form có helper/error và input giữ nguyên khi gửi thất bại. Lỗi phải gắn với field và có thông báo tổng khi cần.
- Modal: tên truy cập, đóng bằng Esc, focus trap/restore. Form label thật; nút không chỉ có icon; bàn phím dùng được.

## Quy tắc tích hợp
Không chép `<script src=cdn.tailwindcss...>` hoặc inline config vào React. Dịch token thành CSS variables được scope, giữ cấu trúc component hiện có và sửa theo lát tính năng. Không dùng ảnh screenshot làm cả giao diện production.
Không hiển thị thống kê, email đã gửi, SSO đã bật hay AI đã hoàn thành nếu chưa có phản hồi thật. Dữ liệu minh họa chỉ dùng trong thiết kế/fixture và gắn nhãn khi trình bày.
Social login đọc `/api/auth/providers`; Google/GitHub trực tiếp và Auth0 là các provider riêng trong source. Nếu muốn Google/GitHub bên trong Universal Login của Auth0, ghi riêng thiết kế connection, không bịa source đã có nút connection-specific.
Nghiệp vụ lịch phỏng vấn có API trong application; trang lịch toàn cục độc lập, trang system settings và billing subscription định kỳ từ Stitch chưa có route tương ứng đầy đủ: đặt trong nhóm **Đề xuất**. Gói đăng tin/CV hiện có không đồng nghĩa recurring billing.

## Nghiệm thu UI
So với frame đúng viewport; kiểm tra đầy đủ role, 401/403, loading/empty/error/success, validation, offline/retry và mobile. Chụp trang đã render khi có browser preview phù hợp. Không coi build thành công là đã đạt độ khớp thiết kế.
