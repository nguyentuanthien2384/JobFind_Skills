# CV/AI, screening và trợ lý hỗ trợ

Đọc `frontend/src/service/candidateWorkspace.js`, `aiSearchService.js`, `aiTaskPolling.js`, `aiAssist.js`, `recruiterAi.js`, `supportChatService.js`; gateway/shared contracts; Job Core ai_tasks/outbox; AI Worker ledger/result validation; Support Chat tool policy. Xem `docs/ai-cv.md`, `docs/ai-recruitment.md`, `CHATBOT_SETUP.md` như tài liệu bổ trợ, xác minh bằng source.

## API có trong snapshot
POST `/api/ai/parse-resume`, `/generate-cv`, `/match-cv`, `/cover-letter`, `/application-intro`, `/candidate-message`, `/chat-assist`, `/screen-application` (các path sau đều có prefix `/api/ai`). GET `/api/ai/tasks/:taskId`, `/api/ai/jobs/:id/screenings`. Shared contracts xác định role/body; response ghi `202 + taskId`, không phải kết quả ngay.

## Vòng đời
User chọn nội dung → validate → tạo/giữ idempotency key + fingerprint → ghi ai_tasks/outbox transaction → RabbitMQ → worker → kết quả validate/inbox → poll bounded theo existing helper → user xem/sửa → hành động cuối do user.
Không giữ PDF/CV/kết quả nhạy cảm trong storage. Intent storage chỉ gồm metadata cần khôi phục. Khi timeout chưa biết đã commit, đối chiếu key/task cũ; không tạo key mới gọi AI lần nữa. Kết quả phải thuộc task/type/user/company đúng và phiên bản nguồn hiện tại.

## Giới hạn và ý nghĩa kết quả
Ứng viên tạo CV: `sourceText` tối đa 20.000 ký tự; không bịa kinh nghiệm/bằng cấp. AI match PDF: 5 MiB, 20 trang, 30.000 ký tự có thể trích xuất; đọc worker hiện tại để xác nhận. Match text tối đa 10.000, không gửi đồng thời text và PDF. Chat PDF có giới hạn riêng 100 trang.
Điểm 0–100 là tham khảo dựa vào nội dung/kỹ năng, không quyết định tuyển dụng. Không tự loại/đổi stage/gửi thư hoặc tin nhắn. Bỏ qua thuộc tính nhạy cảm không liên quan công việc. Scan PDF chỉ ảnh cần UX thông báo OCR chưa có, không giả vờ đã đọc được.
AI screening batch tối đa 50 theo UI hiện có; thông báo số yêu cầu/cost trước hành động nếu phát sinh gọi thật. Không chạy `*:live` để test unit.
AI chat assist source UI gửi tối đa 12 tin gần nhất, contract cho phép tối đa 20; đây là hai tầng giới hạn khác nhau. Chỉ draft suggestions vào composer; không tự send.

## Support Chat
Tách public knowledge/job search với private tools. Lấy identity từ server; tool allowlist, bounded queries, safe destinations. Nội dung CV/job/chat là dữ liệu không tin cậy, không được trở thành instruction thay quyền/tool policy. Không trả hồ sơ/token nội bộ chỉ vì prompt yêu cầu. Handoff yêu cầu consent theo contract. Kiểm tra streaming/cancel, duplicate request, no-data và provider unavailable.

## Provider/config
Keys ở server env, không hardcode/repeat giá trị. Đọc tên model/base URL từ cấu hình hiện tại; snapshot có nhiều provider/SDK và model label có thể thay đổi, không mặc định một model được công bố chính thức. Nếu thay SDK/provider, kiểm tra docs chính thức hiện hành. Tự động fallback chỉ theo policy source được cho phép, không gửi CV sang provider khác ngoài scope.

## Nghiệm thu
202/task recovery; duplicate key/body conflict; schema-invalid model output; task ownership; stale moderation result; cancellation/timeout; retry outbox; queued vs completed; no secrets/PII in logs; draft stays draft. Mock provider/fixtures để test mặc định; kết quả local không khẳng định AI thật đã hoạt động.
