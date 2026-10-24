---
name: integrate-api
description: Nối màn JobFind với API thật qua frontend/src/service, axios và feature flags. Dùng cho /integrate, bỏ mock, fetch/form, search, pagination,
  normalize response hoặc session errors.
---


# JobFind · Nối UI với API

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc frontend/src/axios.js, adapter của feature và endpoint doc; xác định chính xác response.data đã được interceptor bóc và object lỗi có thể được resolve.
2. Giữ các mode flag hiện hành và phân biệt legacy/core/search/prepared-CV/progress. Khi server thiếu readiness, hiển thị trạng thái thật.
3. Tách API data khỏi component trình bày; normalize tại adapter/hook dùng cho feature, giữ legacy_cv_id và không ép mọi response vào một envelope.
4. Quản lý stale response, cancel/unmount, debounce và pagination reset. Giữ URL filters và back/forward khi trang dùng URL state.
5. Chặn submit lặp; ghi không tự retry sau refresh. Với 401/403, xử lý session/quyền đúng và giữ dữ liệu người dùng có thể gửi lại.
6. Kiểm tra response thành công, object lỗi, rejection, timeout, response trễ và cờ bật/tắt; cập nhật feature handoff.

## Điều kiện nghiệm thu
- Kết quả search cũ không ghi đè kết quả mới.
- Form không báo thành công từ HTTP 200 có errCode khác 0.

## Đầu ra
- Adapter/hook/component patch cùng test tích hợp cần thiết và API mapping.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [api-contract](references/api-contract.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
