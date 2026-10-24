---
name: realtime
description: Phát triển/sửa chat tuyển dụng JobFind bằng Socket.IO, attachments PDF, chia sẻ job và reconnect. Dùng khi tin trùng/mất, socket/session, unread
  hoặc media privacy.
---


# JobFind · Chat tuyển dụng

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc ChatPage, socket client, chatService/mediaService và server auth/rooms. Phân biệt chat tuyển dụng và support assistant.
2. Kiểm tra participant/role/tenant ở server trước vào room, gửi hoặc đọc attachments. Đổi phiên phải rời room và xóa dữ liệu phiên cũ.
3. Dùng clientMessageId ổn định cho một tin; merge optimistic/ack/REST/socket bằng ID, xử lý thứ tự và delivery state.
4. Sau reconnect, lấy khoảng tin còn thiếu, không chỉ tăng unread từ mọi event. Hủy listeners đúng và kiểm tra hai tab.
5. PDF attachment dùng endpoint có quyền, MIME/size validation và preview đúng; không dùng URL public để đọc CV riêng.
6. Kiểm tra gửi, failure/retry, reconnect, đổi hội thoại/phiên, duplicate events và unread; cập nhật screen handoff JF-030/JF-031.

## Điều kiện nghiệm thu
- Một tin hiển thị một lần dù ack và event về khác thứ tự.
- Người không tham gia không tải attachment bằng URL đoán được.

## Đầu ra
- Chat/socket/media patch, state mapping và kiểm tra race/reconnect.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [realtime](references/realtime.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.

## Ảnh tham chiếu gốc
Đọc references/reference-images.json để chọn PNG ở assets/stitch-reference theo local screen ID. Khi đã bootstrap project, ảnh nằm ở .stitch/designs theo screen catalog. Dùng canvas metadata để đối chiếu ảnh; image evidence không chứng minh code/test hoàn thành.
