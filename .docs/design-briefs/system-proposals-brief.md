# Design brief · Màn tổng hợp chưa có đầy đủ source

Feature ID: `system-proposals` · Actor: ADMIN, COMPANY

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Design source và mode
Stitch: https://stitch.withgoogle.com/projects/4225480897019041322. Mặc định match-reference; xem .stitch/DESIGN.md và token-observations.json. Với màn chưa có, ghi EXTENSION/PROPOSAL và dùng skeleton của actor tương ứng. Chuẩn hóa brand JobFind cần quyết định được ghi rõ.

## Màn/biến thể
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-003 | Billing & Subscriptions | 1280 × 1160 | partial |
| JF-004 | Cài Đặt Hệ Thống - Admin Panel | 1280 × 1413 | proposal |
| JF-013 | Lịch Phỏng Vấn & Agenda | 1280 × 1049 | partial |
| JF-014 | Lịch Phỏng Vấn - Career Architect | 1280 × 1035 | partial |

## Cấu trúc màn và hierarchy
1. System settings sections theo JF-004
2. Calendar/agenda theo JF-013/014
3. Recurring plans theo JF-003
4. Unavailable/proposal UI state

## Tương tác chính
| Control/action | Hành vi |
| --- | --- |
| Lập kế hoạch feature mới | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Vẽ prototype có nhãn | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Triển khai sau khi scope/dependencies xác định | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |

## Trạng thái cần thể hiện
| State | UI behavior | Điều kiện |
| --- | --- | --- |
| loading | Skeleton/indicator giữ layout và live status hợp lý | Pending request/task |
| empty | Nội dung không có kết quả với action phù hợp | Success list rỗng |
| error | Thông báo actionable, giữ draft và retry có chủ đích | Object errCode hoặc exception |
| forbidden | Giải thích quyền/readiness và điều hướng hợp lệ | 403/guard company state |
| submitting | Button busy/disabled theo mutation; không double-submit | Write in-flight |
| success | Hiển thị kết quả từ server, refresh đúng phạm vi | Validated successful response |
| unavailable | Provider/service chưa sẵn sàng có label thật | Readiness/feature flag |
| stale/offline | Giữ dữ liệu phù hợp và báo giới hạn, không giả success | Network/race/session change |

## Quy tắc UI gắn với nghiệp vụ
- System settings tổng quát chưa có /admin/settings.
- Calendar tổng hợp không đồng nhất với interview-invitation endpoint.
- Recurring subscriptions không đồng nhất mua gói post/CV.
- Lập owner/schema/API/role/route plan trước implementation; UI offline vẫn có thể vẽ tiếp và ghi proposal.

## Responsive và accessibility
- Giữ canvas reference cho desktop/mobile đã có. Với mobile bổ sung, thiết kế 390px và kiểm tra 360/768px; ghi variant mới.
- Sidebar/filter thành drawer/panel; table cuộn nội bộ hoặc row cards; labels/dữ liệu dài không gây tràn cả trang.
- Label thật, focus visible, tab order, icon accessible name; modal có Escape/trap/restore. Form giữ draft khi thất bại.
- Fixtures có nhãn, ảnh gốc đúng aspect ratio; chưa có quyền/availability thì thể hiện state đúng.

## Handoff bắt buộc
Feature/screen key, mode, token provenance, shell/component props, actor/permission, route/API/status matrix, asset paths, acceptance và bằng chứng hình thật nếu đã render.

## Acceptance riêng
- route/API absent
- permission design chưa quyết định
- prototype-only actions
- no live claims
- migration implications
