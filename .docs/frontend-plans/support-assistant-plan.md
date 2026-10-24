# Frontend plan · Trợ lý hỗ trợ và handoff

Feature ID: `support-assistant` · Actor: PUBLIC, CANDIDATE, COMPANY, EMPLOYER, ADMIN

Snapshot static 05/10/2026. Trạng thái: **có kế hoạch/đặc tả; chưa nghiệm thu implementation theo bộ này**. Source hiện hành có ưu tiên khi khác snapshot.

## Source và ranh giới
| Nguồn | Ý nghĩa |
| --- | --- |
| frontend/src/container/Chat/ChatPage.js | File hiện có, đọc khi triển khai để tránh drift |
| microservices/support-chat-service/package.json | File hiện có, đọc khi triển khai để tránh drift |
| microservices/shared/contracts/operations.js | File hiện có, đọc khi triển khai để tránh drift |

## Router và guard
Tra ui-mockups/route-coverage.json theo feature_id `support-assistant`. Đọc cả router cha và accessControl; không suy ra quyền public từ parser. Screen variant dùng cùng route thì giữ chung container; modal không tự thành route mới.

## Component tree mục tiêu
1. Support entry/help
2. Assistant thread với evidence
3. Pending/failure/tool status
4. Handoff ticket và staff queue
5. Feedback

## State/data ownership
- Session/actor lấy từ auth context/source guards; tenant từ server authorization.
- Server lists/tasks qua adapter/hook, UI controls/drafts ở component/hook phù hợp; URL state khi feature có filters/history.
- Dữ liệu schema và DTO đọc endpoint contract; interceptor đã trả response.data và có thể resolve error object.

## Task triển khai
1. Đối chiếu reference và source, chọn variant/mode; ghi khoảng cách cần sửa.
2. Reuse shell/components và tách blocks có props/event callbacks; scoped CSS/SCSS theo tokens reference.
3. Nối actions qua service/hook hiện có, giữ flags và ID namespace.
4. Bổ sung đầy đủ states và validation; khóa submit lặp, giữ draft và rollback optimistic update.
5. Giải quyết responsive/keyboard/PDF/media phù hợp với feature.
6. Chạy focused test/lint/build phù hợp; so screenshot/interaction và cập nhật QA/context.

## Quy tắc không thể bỏ qua
- Public/private tools có boundary, ownership và session scope riêng.
- Handoff management chỉ role được SUPPORT_MANAGE.
- Retrieved content không có quyền yêu cầu agent gửi thư hoặc quyết định tuyển dụng.

## API mapping
| Endpoint | Owner | Permission | Shape | Status | Consistency |
| --- | --- | --- | --- | --- | --- |
| POST /api/support/turn | modern/support | None | body SupportTurn; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/support/knowledge | modern/support | None | body none; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/support/conversations | modern/support | None | body none; response Record | 200 | companyRequired=False; idempotency=False |
| POST /api/support/conversations/:id/handoff | modern/support | support:chat:use | body SupportHandoff; response Record | 200 | companyRequired=False; idempotency=False |
| GET /api/support/handoffs | modern/support | support:manage | body none; response Record | 200 | companyRequired=False; idempotency=False |

## Kiểm tra behavior
- tool private unauthenticated
- provider unavailable
- stream interrupted
- handoff forbidden
- prompt injection
- conversation ownership

## Kết quả cần lưu
Component/container/hook/CSS patch, route mapping, API/error normalization, snapshot render đúng viewport và verification; chỉ gắn implemented/verified sau bằng chứng riêng.
