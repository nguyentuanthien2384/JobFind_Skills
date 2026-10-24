# Ý tưởng · Danh mục nghề nghiệp và kỹ năng

Feature ID: `recruitment-catalogs` · Actor: ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện danh mục nghề nghiệp và kỹ năng theo nhu cầu actor ADMIN, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. CRUD taxonomy/skills
2. Search/paging
3. Use codes in job/profile/filter forms

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/JobSkill/ManageJobSkill.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/JobType/ManageJobType.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/container/system/useCatalogList.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/recruitmentCatalog.cjs | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

## Quy tắc nghiệp vụ
- Codes/type/job skill relations theo source; labels không thay key.
- Xóa/update phải giữ referenced jobs/profiles và unique constraints hiện hành.
- Catalog consumer dropdowns/search facets cần tương thích cả legacy/modern.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra duplicate code với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra referenced delete với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra role forbidden với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra stale dropdown với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra pagination reset với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra invalid type với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/recruitment-catalogs-idea.md → design-briefs/recruitment-catalogs-brief.md → frontend-plans/recruitment-catalogs-plan.md → backend-plans/recruitment-catalogs-plan.md → endpoint-apis/recruitment-catalogs-endpoints.md → qa/recruitment-catalogs-qa.md
