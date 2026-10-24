---
name: save-context
description: Lưu/khôi phục quyết định và tiến độ JobFind để tiếp tục vẽ và code không mất ngữ cảnh. Dùng cho /save, /resume, tiếp tục phiên, ghi FEATURES_DONE/CONTEXT
  hoặc bàn giao.
---


# JobFind · Lưu và tiếp tục phiên

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc context và diff/log hiện tại, kiểm tra bằng chứng file và lệnh đã thực hiện; phân biệt kết quả quan sát với kế hoạch.
2. Ghi feature/screen ID, files, quyết định, flags đang được xử lý và trạng thái riêng design/code/test.
3. Ghi lệnh kiểm tra, kết quả, điều kiện môi trường và lỗi còn lại; không lưu env value, JWT, mật khẩu, nội dung CV hoặc dữ liệu thật.
4. Cập nhật CONTEXT.md dạng ngắn, FEATURES_DONE.md theo feature và log append-only theo thời điểm.
5. Khi resume, đọc source mới, đối chiếu checksum/route và tiếp tục bước chưa hoàn thành; tránh lặp lại việc đã làm có bằng chứng.
6. Nếu cần giảm context dài, dùng archive-memory để lưu archive và liên kết truy hồi.

## Điều kiện nghiệm thu
- Người tiếp tục biết cần làm bước nào và file nào đọc đầu tiên.
- Không gắn DONE cho thiết kế chưa được code hoặc test chưa chạy.

## Đầu ra
- Context hiện tại, feature ledger và nhật ký có evidence, next action.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [context](references/context.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
