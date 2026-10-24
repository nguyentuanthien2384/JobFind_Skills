# Design brief · Hồ sơ cá nhân ứng viên

Feature ID: `candidate-profile` · Actor: CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Design source và mode
Stitch: https://stitch.withgoogle.com/projects/4225480897019041322. Mặc định match-reference; xem .stitch/DESIGN.md và token-observations.json. Với màn chưa có, ghi EXTENSION/PROPOSAL và dùng skeleton của actor tương ứng. Chuẩn hóa brand JobFind cần quyết định được ghi rõ.

## Màn/biến thể
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-009 | Hồ Sơ Của Tôi - Tuyển Dụng VN | 1280 × 1749 | source-mapped |

## Cấu trúc màn và hierarchy
1. Header và candidate navigation
2. Avatar/profile completion
3. Personal/contact info
4. Education/experience/skills theo fields thật
5. Preferences/CV section
6. Save và validation feedback

## Tương tác chính
| Control/action | Hành vi |
| --- | --- |
| Edit/save profile | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Đổi avatar/CV theo cơ chế source | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Mở CV workspace | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Cập nhật preferences | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |

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
- Legacy user profile và identity profile cần adapter đúng mode.
- Completion score nếu chưa có backend phải được ghi là derived UI/fixture.
- Chỉ cập nhật fields whitelist và ownership từ session.

## Responsive và accessibility
- Giữ canvas reference cho desktop/mobile đã có. Với mobile bổ sung, thiết kế 390px và kiểm tra 360/768px; ghi variant mới.
- Sidebar/filter thành drawer/panel; table cuộn nội bộ hoặc row cards; labels/dữ liệu dài không gây tràn cả trang.
- Label thật, focus visible, tab order, icon accessible name; modal có Escape/trap/restore. Form giữ draft khi thất bại.
- Fixtures có nhãn, ảnh gốc đúng aspect ratio; chưa có quyền/availability thì thể hiện state đúng.

## Handoff bắt buộc
Feature/screen key, mode, token provenance, shell/component props, actor/permission, route/API/status matrix, asset paths, acceptance và bằng chứng hình thật nếu đã render.

## Acceptance riêng
- missing optional fields
- invalid phone/link
- save error preserves draft
- actor khác
- long Vietnamese name
- mobile
