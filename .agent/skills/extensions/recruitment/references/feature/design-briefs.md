# Design brief · Kanban, đánh giá và AI tuyển dụng

Feature ID: `pipeline` · Actor: COMPANY, EMPLOYER

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Design source và mode
Stitch: https://stitch.withgoogle.com/projects/4225480897019041322. Mặc định match-reference; xem .stitch/DESIGN.md và token-observations.json. Với màn chưa có, ghi EXTENSION/PROPOSAL và dùng skeleton của actor tương ứng. Chuẩn hóa brand JobFind cần quyết định được ghi rõ.

## Màn/biến thể
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-025 | Phễu Tuyển Dụng - Senior Frontend Developer | 1280 × 1024 | source-mapped |

## Cấu trúc màn và hierarchy
1. Recruiter shell/job selector
2. 6 Kanban columns
3. Candidate cards với state thật
4. Detail drawer/rating/notes/history
5. Actions phỏng vấn/offer
6. AI screening panel và readiness

## Tương tác chính
| Control/action | Hành vi |
| --- | --- |
| Move stage | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Mở candidate detail | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Rate/note | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Yêu cầu screening | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Mở interview/decision form | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |

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
- Dùng 6 stage keys source thay vì labels tiếng Anh mẫu.
- application.id khác legacy_cv_id; mỗi action dùng đúng ID.
- Stage history/notes/rating/outbox cần tenant và transaction; AI chỉ hỗ trợ review.

## Responsive và accessibility
- Giữ canvas reference cho desktop/mobile đã có. Với mobile bổ sung, thiết kế 390px và kiểm tra 360/768px; ghi variant mới.
- Sidebar/filter thành drawer/panel; table cuộn nội bộ hoặc row cards; labels/dữ liệu dài không gây tràn cả trang.
- Label thật, focus visible, tab order, icon accessible name; modal có Escape/trap/restore. Form giữ draft khi thất bại.
- Fixtures có nhãn, ảnh gốc đúng aspect ratio; chưa có quyền/availability thì thể hiện state đúng.

## Handoff bắt buộc
Feature/screen key, mode, token provenance, shell/component props, actor/permission, route/API/status matrix, asset paths, acceptance và bằng chứng hình thật nếu đã render.

## Acceptance riêng
- unauthorized job
- stale optimistic update
- duplicate move
- AI failure
- CV mapping mismatch
- keyboard/mobile drag alternative
