# Baton — EXT-JF-036-MOBILE

Ví dụ tác vụ thiết kế kế tiếp (không coi là màn mới đã có): biến thể tìm kiếm mobile từ màn chuẩn JF-036. Đọc .docs/ui-mockups/screens/JF-036.md và 6 tài liệu job-search, sau đó kiểm tra router/service/flags của /job hiện tại.

Lệnh chuẩn bị: python .agent/scripts/prepare_screen_prompt.py --screen JF-036 --device MOBILE --mode match-reference

Sử dụng chiều rộng 390px, giữ nguyên tìm kiếm/bộ lọc/kết quả/thứ tự/hành động và bộ token chuẩn. Bộ lọc sidebar chuyển thành bottom sheet; giữ nguyên quy tắc URL/debounce/cancellation/phân trang. Các trạng thái loading/trống/lỗi/cấm/vô hiệu hóa là thành phần mở rộng (extension). Không tự ý đổi chế độ API hoặc thêm trường dữ liệu không có thật. Sau khi tạo giao diện, kiểm tra và ghi lại URL/ID/ảnh chụp màn hình thật; chỉ cập nhật design_status, giữ code/test ở trạng thái pending cho đến khi có bằng chứng thực tế.

Phạm vi thực hiện theo yêu cầu của người dùng; thay thế tác vụ này khi người dùng yêu cầu tính năng/màn khác. Sử dụng update_baton dry-run trước khi áp dụng thay đổi trạng thái; luôn bảo toàn lịch sử.
