# JobFind · Figma handoff

Thiết kế: https://www.figma.com/design/aASrpnjI0sgztK3QB3fxtd

Đây là thiết kế mục tiêu chuẩn hóa 37 screen Stitch về thương hiệu JobFind; không phải bằng chứng source đã triển khai UI mới. Các trang: Start here, Foundations, Components, Khám phá, Xác thực, Ứng viên, Doanh nghiệp, Tin nhắn, Quản trị, Đề xuất, Trạng thái.

Tìm frame theo mã JF-001…JF-037 trong screen-map của code-ui. Đọc route/component/API và ghi chú trước khi code. Node và URL lấy từ Figma hiện tại; không suy đoán ID.

Lấy design context và screenshot của frame được giao bằng plugin Figma theo skill tương ứng. Dùng component/token hiện có nếu tương thích; dịch design token sang CSS variables scope JobFind. Không nhập Tailwind CDN vào CRA. Thiết kế giả lập dữ liệu; không đưa số liệu minh họa vào màn production.

Các màn recurring billing, system settings và lịch tổng hợp nằm trong trang Đề xuất. Lập kế hoạch backend, quyền và route trước khi triển khai. Auth hiển thị Google/GitHub/Auth0 theo provider được server bật; không tuyên bố live SSO chỉ từ bản thiết kế.
