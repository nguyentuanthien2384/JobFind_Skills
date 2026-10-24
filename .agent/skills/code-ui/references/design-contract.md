# Hợp đồng thiết kế và source

## Nguồn chính
- Stitch JobFind exact: https://stitch.withgoogle.com/projects/4225480897019041322
- Dự án mẫu gốc: https://stitch.withgoogle.com/projects/11086475323725615160
- Có 37 screen thật: 34 desktop 1280px và 3 mobile 390px; tên/kích thước bản sao đã được đối chiếu với mẫu.
- Figma V2 mở rộng: https://www.figma.com/design/aASrpnjI0sgztK3QB3fxtd?node-id=46-647. Catalog V2 có 192 screen/state mục tiêu, gồm 145 desktop và 47 mobile. Đây là bộ độc lập; duplicate prototype không nằm trong số 192.

## Chọn mode
**match-reference** mặc định cho yêu cầu giống bộ Stitch: giữ section order, màu, typography, assets và từng variant. Reference còn tên Tuyển Dụng VN/TalentArch/Career Architect/The Ledger; chỉ tên project mới là JobFind. Không tự đổi branding bên trong khi user yêu cầu y hệt.
**jobfind-normalized** khi user yêu cầu đồng nhất thương hiệu: giữ workflow/data contract, ghi token/brand/label đổi, nhận diện Figma V2 là mục tiêu riêng.

## Giữ sự thật
- PNG raster và canvas có thể khác tỷ lệ. Dùng canvas.width/height cho frame; raster.width/height cho đối chiếu ảnh.
- UID JF-001…JF-037 là local catalog ID, không phải Stitch screen ID. Chưa truy xuất ID màn thật thì để null, tìm màn theo title + dimensions; không dựng deep link.
- 37 màn là bộ reference hoàn chỉnh, không có nghĩa bao phủ mọi route app. Dùng route-coverage và extension backlog khi vẽ tiếp.
- Font/color observations trích từ từng code.html. Các spacing/states/a11y bổ sung phải gắn label extension/proposal.
- Trong React CRA, dịch HTML Tailwind sang JSX/CSS-SCSS scoped; không chép CDN/scripts của mockup vào app.
- Fixtures thiết kế không là dữ liệu live. Google/GitHub/Auth0 theo readiness; LinkedIn trong mẫu không chứng minh provider source.
- Calendar global/settings/recurring billing là phần cần plan source. Các form interview/offer, gói post/CV hiện có được giữ và mapping riêng.

## Handoff bắt buộc
Feature/screen/variant, source URL và assets, mode, actor/permissions, route status, component files, adapter/API/schema, UI states, responsive behavior, gap/proposal, acceptance và evidence.

## Quy tắc công cụ
Discover tool có thật trước gọi; theo skill plugin bắt buộc cho Figma. Dùng secure auth khi cần, chỉ trả link đã mở xác minh. Khi blocker, giữ prompt/spec offline và nêu đúng phần chưa hoàn thành.
