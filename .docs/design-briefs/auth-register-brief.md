# Design brief · Chọn vai trò và đăng ký

Feature ID: `auth-register` · Actor: PUBLIC

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Design source và mode
Stitch: https://stitch.withgoogle.com/projects/4225480897019041322. Mặc định match-reference; xem .stitch/DESIGN.md và token-observations.json. Với màn chưa có, ghi EXTENSION/PROPOSAL và dùng skeleton của actor tương ứng. Chuẩn hóa brand JobFind cần quyết định được ghi rõ.

## Màn/biến thể
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-019 | Đăng ký - Chọn vai trò | 1280 × 1267 | source-mapped |
| JF-020 | Đăng Ký - Tuyển Dụng VN | 390 × 1348 | source-mapped |
| JF-028 | Registration - Premium Desktop | 1280 × 1409 | source-mapped |

## Cấu trúc màn và hierarchy
1. Role chooser JF-019
2. Personal/company-related input theo role hợp lệ
3. Credential step với validation
4. Provider signup và pending profile
5. Terms/link nội dung theo app source

## Tương tác chính
| Control/action | Hành vi |
| --- | --- |
| Chọn role | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Tiếp tục/back bước | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Submit signup | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Hoàn tất SSO onboarding | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |

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
- Signup chọn CANDIDATE hoặc EMPLOYER; không cho user tự đăng ký ADMIN/COMPANY.
- Giữ form 2 bước hiện có và validation server.
- SSO profile chưa hoàn tất phải vào onboarding đúng, không tự gộp account theo email.

## Responsive và accessibility
- Giữ canvas reference cho desktop/mobile đã có. Với mobile bổ sung, thiết kế 390px và kiểm tra 360/768px; ghi variant mới.
- Sidebar/filter thành drawer/panel; table cuộn nội bộ hoặc row cards; labels/dữ liệu dài không gây tràn cả trang.
- Label thật, focus visible, tab order, icon accessible name; modal có Escape/trap/restore. Form giữ draft khi thất bại.
- Fixtures có nhãn, ảnh gốc đúng aspect ratio; chưa có quyền/availability thì thể hiện state đúng.

## Handoff bắt buộc
Feature/screen key, mode, token provenance, shell/component props, actor/permission, route/API/status matrix, asset paths, acceptance và bằng chứng hình thật nếu đã render.

## Acceptance riêng
- duplicate identity/contact
- password policy
- invalid role payload
- input giữ khi lỗi
- SSO pending
- mobile signup
