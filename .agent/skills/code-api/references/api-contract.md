# Viết và nối API theo đúng hợp đồng

## Chọn đường đi
Legacy routes ở `backend/src/routes/web.js`, controller ở `controllers/`, nghiệp vụ ở `services/`. Modern source contract ở `microservices/shared/contracts/operations.js`, `schemas.js`, `responses.js`; cập nhật service chủ quản và gateway boundary cùng nhau. Frontend adapter ở `frontend/src/service/`.
Không tạo `/api/v1` hay đổi tên endpoint legacy nếu không có migration contract trong yêu cầu. Public admin API có `/api/admin`; internal route không được đưa vào browser.

## Checklist contract trước patch
Ghi method/path, owner service, permission/tenant, params/query/body, giới hạn dữ liệu, response thành công/lỗi, status, retry/idempotency, pagination và event phát sinh. Trích field từ source, không suy đoán từ nhãn UI.
Legacy và modern có thể khác envelope. `frontend/src/axios.js` đã unwrap HTTP `response.data`. `normalizeApiError` có thể resolve lỗi; kiểm tra `errCode`, `httpStatus`, `errorType` và hình dạng dữ liệu trước render, không chỉ dùng catch.
Query số trong shared schemas giữ dạng chuỗi; không bật coerce/default/removeAdditional tùy tiện. Dùng validator hiện có, không thêm Zod/Joi chỉ vì ví dụ mẫu.

## Implement
1. Tái sử dụng protectedBy/authorize hoặc requirePermission/trusted gateway; lấy user/company từ identity server.
2. Validate trước mutation, kiểm tra ownership trên object thật, dùng transaction và outbox nếu đã có trong miền.
3. Response mutation phải phân biệt rejected, committed, pending/unknown. Lỗi timeout sau commit không được tự tạo request mới.
4. Job create/repost/AI giữ idempotency key; edit giữ `expectedRevision` và xung đột 409 theo contract. Không fallback core write sang legacy khi core lỗi.
5. Client adapter giữ mode flag và serializer hiện hành: `jobFormAdapter.js`, `jobPostingService.js`, `jobCreateAttempt.js`, `jobRepostAttempt.js`, `jobEditSession.js`, `jobWorkspaceService.js`, `searchWorkspace.js`.
6. Lấy dữ liệu public chỉ tin/công ty được phép hiển thị; pending/banned/expired không lọt qua query/projection.

## Ví dụ tích hợp response
Đọc adapter tương ứng trước khi viết. Nếu response legacy công bố `errCode===0`, kiểm tra điều đó trước khi set state; nếu data không đúng shape thì inline error, không biến thành danh sách rỗng để che lỗi. Hủy/ignore request cũ khi filter/user đổi. Refresh interceptor chỉ tự replay GET.

## Validation
Test malformed input, unknown field, missing auth, wrong permission, wrong tenant, not found, duplicate write, stale revision, downstream timeout; một flow đi từ UI adapter đến boundary; `contracts:check` cho modern change. Contract-generated docs là sản phẩm của generator; sửa nguồn rồi regenerate, không edit generated spec riêng.
