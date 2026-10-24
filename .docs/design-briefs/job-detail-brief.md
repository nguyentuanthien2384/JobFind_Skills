# Design brief · Chi tiết và external job

Feature ID: `job-detail` · Actor: PUBLIC, CANDIDATE

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Design source và mode
Stitch: https://stitch.withgoogle.com/projects/4225480897019041322. Mặc định match-reference; xem .stitch/DESIGN.md và token-observations.json. Với màn chưa có, ghi EXTENSION/PROPOSAL và dùng skeleton của actor tương ứng. Chuẩn hóa brand JobFind cần quyết định được ghi rõ.

## Màn/biến thể
| ID | Tên màn | Canvas | Source status |
| --- | --- | --- | --- |
| JF-010 | Job Detail - Senior Frontend Developer | 1280 × 2070 | source-mapped |
| JF-022 | Ứng tuyển: Bước 1 - Thông tin cá nhân | 1280 × 1053 | partial |
| JF-023 | Ứng tuyển: Senior UI/UX Designer | 390 × 1817 | partial |
| JF-024 | Ứng tuyển: Senior UI/UX Designer (Desktop) | 1280 × 1249 | partial |

## Cấu trúc màn và hierarchy
1. Job/company summary
2. Salary/location/type metadata
3. Description, requirements và benefits
4. Recruiter/company sidebar
5. Apply/save/share CTA
6. Related jobs và application modal

## Tương tác chính
| Control/action | Hành vi |
| --- | --- |
| Mở/nộp modal CV | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Lưu job | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Mở company | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |
| Trở lại kết quả tìm | Map tới route/service thật; disabled/busy/error theo quyền và dữ liệu |

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
- Ứng tuyển là modal trên /detail-job/:id; /apply chưa là route hiện hữu.
- Giữ job state/public visibility và company validity.
- Guest lưu apply intent qua auth theo source.
- External job route/provenance không đồng nhất với job local.
- Apply validation/draft/session/PDF giới hạn theo applications feature; fixtures 10MB/DOCX/portfolio trong ảnh không là contract đang có.

## Responsive và accessibility
- Giữ canvas reference cho desktop/mobile đã có. Với mobile bổ sung, thiết kế 390px và kiểm tra 360/768px; ghi variant mới.
- Sidebar/filter thành drawer/panel; table cuộn nội bộ hoặc row cards; labels/dữ liệu dài không gây tràn cả trang.
- Label thật, focus visible, tab order, icon accessible name; modal có Escape/trap/restore. Form giữ draft khi thất bại.
- Fixtures có nhãn, ảnh gốc đúng aspect ratio; chưa có quyền/availability thì thể hiện state đúng.

## Handoff bắt buộc
Feature/screen key, mode, token provenance, shell/component props, actor/permission, route/API/status matrix, asset paths, acceptance và bằng chứng hình thật nếu đã render.

## Acceptance riêng
- job không tồn tại/không public
- guest login intent
- đã ứng tuyển
- PDF lỗi
- expired job
- external link
