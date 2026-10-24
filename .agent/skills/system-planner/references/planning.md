# Mẫu kế hoạch theo lát tính năng

## Tài liệu đầu ra
Chọn feature ID theo yêu cầu và .docs/INDEX.md, không dùng mặc định master-layout cho mọi task. Nhiệm vụ nhiều lớp: liên kết .docs/ideas/<feature>-idea.md, design-briefs/<feature>-brief.md, frontend-plans/<feature>-plan.md, backend-plans/<feature>-plan.md, endpoint-apis/<feature>-endpoints.md và qa/<feature>-qa.md. Chỉ tạo/cập nhật các phần cần thiết; ghi không áp dụng khi một lớp không liên quan. Sửa nhỏ có thể giữ một plan ngắn tại vị trí user chỉ định. Hợp nhất khi tiếp tục cùng feature, không ghi đè/xóa lịch sử.

## Cấu trúc bắt buộc
1. **Yêu cầu và tiêu chí chấp nhận:** vai trò, tình huống đầu/cuối, dữ liệu và hành động mong muốn.
2. **Bằng chứng hiện trạng:** path + symbol/route; cái đã có, điểm cần sửa, điều chưa xác minh. Không chỉ trích README.
3. **Phạm vi:** sửa gì, phụ thuộc; phân biệt bug fix với feature mở rộng, thiết kế đề xuất với implementation hiện hữu.
4. **Contract UI/API:** frame/screen ID, URL thật, role/permission/company state; field + query/body + response/error + retry.
5. **Dữ liệu:** owner DB/model/migration; fields/types/nullability/index/constraint; transaction/outbox/namespace và compatibility.
6. **Frontend:** component có sẵn tái dùng, adapter, local/session state; loading/empty/error/success/pending/401/403; mobile, keyboard.
7. **Thứ tự thực hiện:** các task nhỏ có file thật, điều kiện vào/ra, tests; không task chung chung “hoàn thiện backend”.
8. **Kiểm tra:** test cụ thể theo rủi ro, lệnh đã tồn tại, môi trường cần; ghi test chưa chạy.
9. **Rollout/rollback:** chỉ khi có deploy/schema/flags; bảo toàn dữ liệu và ý định ghi chưa rõ kết quả.
10. **Điểm cần quyết định:** hỏi chỉ những điều chưa đủ mà materially đổi giải pháp; lựa chọn kỹ thuật thông thường tự giải quyết theo source.

## Tiêu chí một task tốt
“Sửa adapter X dùng contract Y, giữ key khi timeout; UI hiện pending; test lost response không tạo lần ghi thứ hai” đủ kiểm tra. “Làm API chuẩn enterprise” không đủ. Không ước lượng số giờ/ngày nếu chưa có dữ liệu.

## Brainstorm
Đưa 2–3 phương án chỉ khi có tradeoff thật. Với dự án có sẵn, ưu tiên mở rộng ít ảnh hưởng nhưng đủ nhu cầu; ghi lý do và tác động dữ liệu/quyền/runtime. Nếu người dùng yêu cầu làm luôn, không kết thúc ở brainstorm hoặc bắt xác nhận mọi bước. Nếu chỉ hỏi ý tưởng/kế hoạch, không tự code business logic.
