---
name: code-db
description: 'Sửa dữ liệu JobFind: Sequelize/MySQL legacy và job-core, PostgreSQL application, MongoDB profile/audit, indexes và outbox. Dùng cho /code-db,
  migration, transaction, ràng buộc hoặc lỗi ID mapping.'
---


# JobFind · Database và migration

## Nạp bằng chứng
Đọc [bối cảnh dự án](references/project-context.md), [hợp đồng thiết kế](references/design-contract.md) và [playbook](references/playbook.md). Dùng [screen catalog](references/screen-catalog.json) để tìm đúng local key/variant; source mới và quy tắc user hiện tại có ưu tiên snapshot. Nạp .docs của feature liên quan nếu đã bootstrap.

## Quy trình
1. Đọc references/database.md nếu có, backend plan và model/store thực tế; chọn đúng database sở hữu nghiệp vụ.
2. Liệt kê field, nullability, constraint, index và ID được dùng. Phân biệt legacy Cv.id, application.id và MongoDB CV _id; nối bằng legacy_cv_id + job ID đúng.
3. Thiết kế migration thêm/bổ sung theo dữ liệu hiện có; ghi điều kiện dữ liệu trước/sau, backfill và rollback nếu thay kiểu.
4. Đặt ghi nghiệp vụ và event outbox trong cùng transaction; dùng inbox/idempotency cho event lặp và tránh ghi chéo service trực tiếp.
5. Cập nhật model/store, truy vấn và contract cần thiết; giữ query có tenant và tham số hóa SQL.
6. Kiểm tra migration trên fixture/database kiểm thử được phép; không chạy migration hoặc seed môi trường ngoài phạm vi.

## Điều kiện nghiệm thu
- Giao dịch rollback được nếu ghi outbox thất bại.
- Migration không xóa dữ liệu ngoài yêu cầu, truy vấn không làm lộ CV/tenant khác.

## Đầu ra
- Migration/model/store patch và hướng dẫn kiểm tra/rollback dựa trên schema thật.

## Tài liệu và ví dụ
- [Feature documents](references/feature/INDEX.md) — ví dụ chi tiết idea/design/frontend/backend/API/QA khi chưa bootstrap project; chọn feature theo yêu cầu.
- [Playbook](references/playbook.md) — source paths, decisions, failure handling và handoff của skill.
- [Ví dụ sử dụng](references/examples.md) — prompts và cách áp dụng vào JobFind.
- [Hợp đồng thiết kế](references/design-contract.md) — Stitch 37, Figma V2 192, exact/normalized mode và proposal boundary.
- [Screen catalog](references/screen-catalog.json) — màn liên quan; local ID không phải Stitch screen ID.
- [database](references/database.md) — đọc khi phần chuyên môn này liên quan; source mới và mode trong design-contract có ưu tiên.
