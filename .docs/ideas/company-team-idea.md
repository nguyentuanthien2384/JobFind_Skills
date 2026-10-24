# Ý tưởng · Nhân sự và tuyển dụng theo tenant

Feature ID: `company-team` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện nhân sự và tuyển dụng theo tenant theo nhu cầu actor COMPANY, EMPLOYER, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Xem team
2. Thêm employer
3. Rời công ty theo quyền

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Company/ManageEmployer.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/companyService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/routes/web.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
Chưa có màn trong bộ Stitch 37 cho phần này. Lập screen mới theo source/route và ghi EXTENSION; dùng Figma V2 làm mục tiêu bổ sung khi phù hợp.

## Quy tắc nghiệp vụ
- COMPANY_TEAM_MANAGE và ownership ở server; actor/tenant không lấy theo body.
- EMPLOYER chỉ các quyền company membership đang cho phép.
- Tách quit/self-exit với loại member/team mutation.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra cross-company target với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate membership với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra invalid member với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra self-exit consequences với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra company pending với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra role guard với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/company-team-idea.md → design-briefs/company-team-brief.md → frontend-plans/company-team-plan.md → backend-plans/company-team-plan.md → endpoint-apis/company-team-endpoints.md → qa/company-team-qa.md
