# Ý tưởng · Trang chủ và khám phá việc làm

Feature ID: `home` · Actor: PUBLIC

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Mục tiêu và phạm vi
Hoàn thiện trang chủ và khám phá việc làm theo nhu cầu actor PUBLIC, tái sử dụng source và đúng thiết kế được chọn. Bắt đầu bằng trigger cụ thể trong actions bên dưới; mục tiêu là người dùng hoàn thành tác vụ, có phản hồi và trạng thái chính xác.

## Luồng người dùng
1. Tìm việc
2. Mở job detail
3. Mở công ty
4. Đăng ký/đăng nhập

## Bằng chứng nguồn
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/home/home.js | File hiện có, đọc khi triển khai để tránh drift |
| frontend/src/service/userService.js | File hiện có, đọc khi triển khai để tránh drift |

## Màn tham chiếu
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-035 | Tuyển Dụng VN - Homepage | 1280 × 3456 | source-mapped |

## Quy tắc nghiệp vụ
- Homepage dùng dữ liệu công khai, stats trong Stitch là fixture.
- Search điều hướng /job với query được adapter hỗ trợ.
- Không đổi legacy/search mode để khớp bản mẫu.

## Phương án và quyết định
- Ưu tiên reuse component/adapter/router hiện có, bổ sung theo lát chức năng và nghiệm thu trạng thái.
- Nếu source chỉ hỗ trợ một phần reference, giữ phần hiện có và lập contract/route/owner plan cho phần thiếu; ghi PROPOSAL.
- Chỉ đổi stack, database owner hoặc mode khi phạm vi user giao có thay đổi đó.

## Điều kiện hoàn thành
- Kiểm tra API danh sách rỗng với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra ảnh/logo lỗi với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra search input dài với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra guest CTA ứng tuyển với phản hồi rõ và không làm mất dữ liệu hợp lệ.
- Kiểm tra mobile hero/search stacking với phản hồi rõ và không làm mất dữ liệu hợp lệ.

## Chuỗi tài liệu
ideas/home-idea.md → design-briefs/home-brief.md → frontend-plans/home-plan.md → backend-plans/home-plan.md → endpoint-apis/home-endpoints.md → qa/home-qa.md
