# Design brief · Dashboard doanh nghiệp

Feature ID: `employer-dashboard` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Design source và mode
Stitch: https://stitch.withgoogle.com/projects/4225480897019041322. Mặc định match-reference; xem .stitch/DESIGN.md và token-observations.json. Với màn chưa có, ghi EXTENSION/PROPOSAL và dùng skeleton của actor tương ứng. Chuẩn hóa brand JobFind cần quyết định được ghi rõ.

## Màn/biến thể
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-034 | Tuyển Dụng VN - Dashboard Doanh Nghiệp | 1280 × 1455 | source-mapped |

## Cấu trúc màn và hierarchy
1. Company sidebar/header
2. Recruitment metric cards
3. Jobs/application attention tables
4. Company-specific chart
5. Quick actions và readiness

## Tương tác chính
| Control/action | Hành vi |
| --- | --- |
| Đi quản lý tin/pipeline | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Xem ứng viên | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Mua gói theo quyền | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Mở attention target | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |

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
- Cùng /admin/ với platform admin nhưng component/data theo actor.
- Stats giới hạn company scope; không gọi platform revenue reports từ doanh nghiệp.
- Số fixture không được hiển thị như data thật.

## Responsive và accessibility
- Giữ canvas reference cho desktop/mobile đã có. Với mobile bổ sung, thiết kế 390px và kiểm tra 360/768px; ghi variant mới.
- Sidebar/filter thành drawer/panel; table cuộn nội bộ hoặc row cards; labels/dữ liệu dài không gây tràn cả trang.
- Label thật, focus visible, tab order, icon accessible name; modal có Escape/trap/restore. Form giữ draft khi thất bại.
- Fixtures có nhãn, ảnh gốc đúng aspect ratio; chưa có quyền/availability thì thể hiện state đúng.

## Handoff bắt buộc
Feature/screen key, mode, token provenance, shell/component props, actor/permission, route/API/status matrix, asset paths, acceptance và bằng chứng hình thật nếu đã render.

## Acceptance riêng
- company unverified/no membership
- zero activity
- report API error
- employer permission subset
- mobile cards
