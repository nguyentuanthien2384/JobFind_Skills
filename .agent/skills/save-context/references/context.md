# Lưu tiến độ và bàn giao đáng tin

## Lưu sau một lát tính năng
Append `.docs/FEATURES_DONE.md` với ngày giờ/timezone, feature ID, yêu cầu, file đã sửa, hành vi, lệnh/exit/result, phần chưa kiểm tra, blocker và việc tiếp theo. “Có code”, “unit pass”, “UI đã xem”, “đã deploy” là các trạng thái khác nhau.
Không chép token, email/số điện thoại thật, CV, connection string hoặc raw production logs. Chỉ giữ dữ liệu tổng hợp đủ tái hiện bằng fixture.
Ghi `.docs/CONTEXT.md` trạng thái mới nhất: project root/branch nếu có, nguồn đang dùng, quyết định có lý do, task dở và file, test failures liên quan, yêu cầu user còn hiệu lực. Không che lỗi bằng cách chỉ lưu thành công.

## Archive
Đọc hiện trạng, đối chiếu source, đưa nội dung cũ vào `.docs/archive/<timestamp>-context.md` trước khi rút gọn active log. Giữ mọi quyết định, kiểm thử, blocker còn giá trị; không xóa sạch lịch sử. Nếu file archive đã có, chọn tên khác hoặc merge có kiểm soát.
Cập nhật `.docs/ARCHITECTURE.md`/`.docs/STYLEGUIDE.md` chỉ khi implementation thực tế đổi hoặc mục proposal được ghi riêng. Giữ docs cũ ngoài `.docs`.

## Resume
Đọc CONTEXT + task files, `git status`, source liên quan và test evidence. Kiểm tra diff mới trước khi dựa vào snapshot. Nêu ngắn điểm đã biết và hành động tiếp theo; không bắt người dùng lặp lại yêu cầu đã lưu. Không chạy lệnh phá hủy được nhắc trong log nếu chưa thuộc task được cho phép.
