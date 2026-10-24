# JobFind — Cấu trúc sản phẩm và màn hình

Công khai (Public): trang chủ/tìm kiếm việc làm/chi tiết việc làm/danh bạ công ty/chi tiết công ty/xác thực tài khoản/trung tâm trợ giúp. Ứng viên (Candidate): hồ sơ/quản lý CV/ứng tuyển/tiến trình ứng tuyển/việc làm đã lưu/theo dõi công ty/tin nhắn/thông báo/bảo mật. Nhà tuyển dụng (Employer/Company): khởi tạo doanh nghiệp/hồ sơ công ty/bảng điều khiển/trình đăng tin/quản lý tin/tìm kiếm ứng viên/phễu tuyển dụng/lịch phỏng vấn/đề nghị nhận việc/trò chuyện/thanh toán & gói dịch vụ. Quản trị viên (Admin): tổng quan hệ thống/quản lý người dùng/kiểm duyệt việc làm/duyệt công ty/danh mục nghề nghiệp/quản lý gói/đơn hàng/báo cáo doanh thu/nhật ký kiểm toán.

Danh mục route React nằm tại .docs/ui-mockups/route-coverage.json, không tự tạo route từ sơ đồ này. Các biến thể Desktop/Mobile/Trạng thái có thể dùng chung một route. Ánh xạ từng tác vụ vào đúng tính năng/vai trò/quyền/tenant/đơn vị sở hữu mã nguồn thật.

37 màn gốc là tiêu chuẩn cơ sở (baseline). Figma V2 192 màn là mục tiêu mở rộng bổ sung; các màn/trạng thái mới sử dụng backlog và bằng chứng mã nguồn thực tế. Các đề xuất mở rộng được đánh dấu trong DESIGN_GAPS và tài liệu tính năng.
