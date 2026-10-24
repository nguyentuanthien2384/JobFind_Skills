# JobFind — Styleguide

## Hai chế độ
match-reference mặc định: chọn một trong 37 screen, giữ fonts/colors/radii và section order của chính screen đó. jobfind-normalized chỉ khi user yêu cầu đồng nhất thương hiệu; ghi mọi token/label thay đổi. Các thương hiệu còn trong ảnh gốc không tự đổi chỉ vì tên project là JobFind.

## Tokens có bằng chứng
Xem ui-mockups/token-observations.json, screen-map và từng code.html. Canvas dùng 1280 desktop/390 mobile; PNG raster có tỷ lệ khác, xem raster metadata. Không dùng một màu primary chung để thay mọi variant. Material Symbols/font CDN trong mockup cần thay bằng assets/component convention khi code CRA.

## Component và state
Public header/footer/search/job-card/filter; candidate profile/application/CV/status; employer shell/job wizard/Kanban/candidate drawer/calendar/offer; admin table/moderation/package/report. Mỗi control cần default/focus/disabled/invalid/submitting khi liên quan. Loading/empty/error/forbidden/success cần data contract thật.

## Responsive và accessibility
3 ảnh mobile native là reference cho đúng login/signup/apply variants. Các màn mobile khác là extension: mô tả sidebar→drawer, filters→sheet, table→cards, Kanban scroll/stage selector, sticky CTA, keyboard/focus and live errors. Contrast, spacing, touch target và reduced motion bổ sung phải ghi proposed/extension nếu khác ảnh.

## Code handoff
React JS/CRA/CSS-SCSS scoped, reuse Ant Design/Reactstrap theo source. Không import Tailwind CDN vào app. Map frame→role/route→component→service→API/schema; giữ business/session/tenant/ID flags. Ghi screenshot đúng viewport và states, không chỉ build pass.
