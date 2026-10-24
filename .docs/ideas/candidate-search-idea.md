# Ý tưởng · Kho ứng viên và mở CV

Feature ID: `candidate-search` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện kho ứng viên và mở cv theo nhu cầu actor COMPANY, EMPLOYER, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Tìm/lọc/chuyển page
2. Mở/unlock CV
3. Lưu talent pool
4. Mở recruitment profile

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/system/Cv/FilterCv.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/cvService.js | File hiện có, đọc khi triển khai để tránh drift |
| backend/src/services/candidateSearchService.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-012 | Kho Ứng Viên - Tuyển Dụng VN | 1280 × 1501 | source-mapped |

## Quy tắc nghiệp vụ
- Giữ route /admin/list-candiate và endpoint spelling đang dùng.
- Không lộ private PII trước unlock; server kiểm tra entitlement.
- Candidate/profile/CV/application ID cần mapping đúng khi mở detail.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra no quota/expired package với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra duplicate unlock với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra cross-tenant với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra stale filters với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra no candidates với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra private PDF forbidden với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/candidate-search-idea.md → design-briefs/candidate-search-brief.md → frontend-plans/candidate-search-plan.md → backend-plans/candidate-search-plan.md → endpoint-apis/candidate-search-endpoints.md → qa/candidate-search-qa.md
