# Ví dụ áp dụng · Nối UI với API

## Ví dụ 1

**Yêu cầu:** Dùng $integrate-api nối JF-018 với my-applications và legacy CV theo mode hiện tại.

1. Nạp project context, feature/screen evidence và source root.
2. Áp dụng quy trình của skill vào đúng phần được giao; ghi mode và source gap.
3. Lưu Adapter/hook/component patch cùng test tích hợp cần thiết và API mapping.
4. Nghiệm thu: Kết quả search cũ không ghi đè kết quả mới.; Form không báo thành công từ HTTP 200 có errCode khác 0.

Output status phải theo bằng chứng thực. Khi chỉ yêu cầu plan hoặc prompt, không đánh dấu implementation hoàn thành.

## Ví dụ 2

**Yêu cầu:** Dùng $integrate-api sửa tìm việc khi đổi filter nhanh bị trả kết quả cũ.

1. Nạp project context, feature/screen evidence và source root.
2. Áp dụng quy trình của skill vào đúng phần được giao; ghi mode và source gap.
3. Lưu Adapter/hook/component patch cùng test tích hợp cần thiết và API mapping.
4. Nghiệm thu: Kết quả search cũ không ghi đè kết quả mới.; Form không báo thành công từ HTTP 200 có errCode khác 0.

Output status phải theo bằng chứng thực. Khi chỉ yêu cầu plan hoặc prompt, không đánh dấu implementation hoàn thành.
