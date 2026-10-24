# Bắt đầu trải nghiệm JobFind Skills v3

1. Giải nén ZIP và mở thư mục này trong IDE. Đọc `README.md` và `JobFind-Huong-dan-Skills-v3.md`.
2. Xem danh mục skills ở `.agent/skill-registry.md`, tài liệu chức năng ở `.docs/INDEX.md`, màn/route ở `.docs/ui-mockups/`.
3. Xem 37 màn tham chiếu tại `.stitch/designs/`: mỗi thư mục có `screen.png` và `code.html`.

## Kiểm tra bộ ngay sau khi giải nén

Chạy từ thư mục vừa giải nén, bằng Python 3:

```bash
python tools/verify_bundle.py
```

## Cài vào source JobFind của bạn

Thay đường dẫn bên dưới bằng root dự án có `frontend/`, `backend/`, `microservices/`:

```bash
python tools/verify_bundle.py --project "/duong/dan/JobFind"
python tools/install.py --project "/duong/dan/JobFind"
python tools/install.py --project "/duong/dan/JobFind" --apply
```

Lệnh cài đầu tiên chỉ xem trước. Nếu có file khác nội dung, đọc danh sách xung đột và hợp nhất nội dung trước khi cài; công cụ giữ file hiện có. Bộ cài `.agent/`, `.docs/`, `.stitch/` và quy tắc dự án, giữ source ứng dụng hiện tại.

## Giao việc cho AI trong IDE sau khi cài

> Đọc AGENTS.md, .agent/skill-registry.md, .docs/CONTEXT.md và .stitch/backlog.json. Dùng workflow .agent/workflows/full-feature.md để tiếp tục tính năng tôi chọn, bám source JobFind và màn Stitch; ghi trạng thái thiết kế/code/test cùng bằng chứng.

Chọn screen/feature cụ thể khi giao việc. Nếu IDE có hỗ trợ slash workflows, dùng `/plans`, `/stitch-design`, `/execute-ui`, `/integrate`, `/verify`, `/save`, `/resume`; xem `.agent/workflows/` cho đầy đủ. Trong ChatGPT dùng `$jobfind-workflow` và các tên `$jobfind-*` trong hướng dẫn.

Gói này là bộ skills, tài liệu và tham chiếu thiết kế để phát triển tiếp dự án. Source chạy frontend/backend/microservices nằm trong dự án JobFind của bạn.
