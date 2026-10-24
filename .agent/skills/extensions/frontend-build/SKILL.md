---
name: frontend-build
description: Chẩn đoán dev/build/bundle JobFind theo react-scripts CRA và lazy routes hiện có. Dùng cho frontend-build, lỗi webpack, assets PDF, chunk,
  lint/build hoặc thay slot nextjs-turbopack của mẫu.
---


# JobFind · CRA build và hiệu năng

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc frontend/package.json, lockfile, scripts/start.cjs và copy-pdf-assets.cjs; giữ CRA/webpack toolchain.
2. Tái hiện đúng script và log lỗi, xác định build-time env key/asset path/lazy import gần lỗi.
3. Kiểm tra PDF worker/assets, public path, chunk loading và route fallback; giữ các dependency cần thiết của source.
4. Tối ưu có measurement: code split routes, tránh import nặng không cần, memoize khi có bottleneck đo được.
5. Không thay CRA bằng Vite/Next/Turbopack trong một fix build; ghi yêu cầu migration riêng nếu được giao.
6. Chạy lint/build và focused smoke phù hợp, nêu warning/runtime chưa kiểm chứng.

## Điều kiện nghiệm thu
- Lệnh dùng thực sự tồn tại trong package scripts.
- Build pass và browser/runtime pass được báo riêng.

## Đầu ra
- Build/performance fix với log và phép đo phù hợp.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
