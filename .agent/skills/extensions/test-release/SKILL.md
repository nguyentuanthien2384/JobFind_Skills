---
name: test-release
description: Chọn/chạy kiểm thử và chẩn đoán lỗi JobFind, QA giao diện, API, contracts, lint/build và release. Dùng cho /verify, regression, fix bug hoặc
  xác minh kết quả triển khai.
---


# JobFind · Kiểm thử và nghiệm thu

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc package scripts và test gần feature; tạo ma trận acceptance → kiểm tra → evidence. Tách QA thiết kế, unit/integration và runtime.
2. Chạy focused test cần thiết, sau đó lint/build/contracts theo phần đã đổi; không chạy toàn bộ integration live nếu thiếu điều kiện.
3. Kiểm tra UI đúng screenshot/viewport, quyền, states và CTA; build pass không chứng minh khớp ảnh hoặc nghiệp vụ chạy.
4. Với data/session/tenant/payment, kiểm tra lỗi và duplicate/concurrency cần thiết, không dùng test chỉ lặp lại logic implementation.
5. Khi thất bại, tìm nguyên nhân trong trace/code, sửa và chạy lại kiểm tra liên quan. Ghi skipped cùng lý do thực tế.
6. Chỉ chuẩn bị release/rollback khi được giao; không tự activate, gửi email, seed hay migrate để làm test xanh.

## Điều kiện nghiệm thu
- Báo cáo chỉ nêu lệnh đã chạy và kết quả thực; không gắn toàn dự án pass từ kiểm tra bộ skills.
- Không chạy test gửi thư/mua gói/AI live ngoài phạm vi đã giao.

## Đầu ra
- Verification report với passed/failed/skipped, logs cần thiết và rủi ro còn lại.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [testing](references/testing.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
