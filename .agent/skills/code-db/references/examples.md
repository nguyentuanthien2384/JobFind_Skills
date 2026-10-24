# Ví dụ áp dụng · Database và migration

## Ví dụ 1

**Yêu cầu:** Dùng $code-db thêm index phù hợp cho truy vấn Kanban theo công ty và job.

1. Nạp project context, feature/screen evidence và source root.
2. Áp dụng quy trình của skill vào đúng phần được giao; ghi mode và source gap.
3. Lưu Migration/model/store patch và hướng dẫn kiểm tra/rollback dựa trên schema thật.
4. Nghiệm thu: Giao dịch rollback được nếu ghi outbox thất bại.; Migration không xóa dữ liệu ngoài yêu cầu, truy vấn không làm lộ CV/tenant khác.

Output status phải theo bằng chứng thực. Khi chỉ yêu cầu plan hoặc prompt, không đánh dấu implementation hoàn thành.

## Ví dụ 2

**Yêu cầu:** Dùng $code-db kiểm tra đồng bộ legacy_cv_id khi ứng viên nộp CV mới.

1. Nạp project context, feature/screen evidence và source root.
2. Áp dụng quy trình của skill vào đúng phần được giao; ghi mode và source gap.
3. Lưu Migration/model/store patch và hướng dẫn kiểm tra/rollback dựa trên schema thật.
4. Nghiệm thu: Giao dịch rollback được nếu ghi outbox thất bại.; Migration không xóa dữ liệu ngoài yêu cầu, truy vấn không làm lộ CV/tenant khác.

Output status phải theo bằng chứng thực. Khi chỉ yêu cầu plan hoặc prompt, không đánh dấu implementation hoàn thành.
