# Gateway, CQRS, event và rollout

## Đọc trước khi sửa
`microservices/package.json`, `docker-compose.yml`, `compose.local.yml`, `compose.runtime.yml`; gateway app và middleware; shared `contracts/operations.js`, `contracts/schemas.js`, `contracts/eventCatalog.js`, `eventEnvelope.js`, `outboxPublisher.js`, `confirmedPublisher.js`, `consumeDelivery.js`; store/outbox/inbox của service.
Tài liệu đối chiếu: `microservices/docs/http-contracts.md`, `event-contracts.md`, `client-sync.md`, `feature-rollout-handoff.md`, `flags-off-acceptance.md`, `release-preparation.md`.

## Quy tắc
1. Một API có owner và nguồn dữ liệu chính. Search đọc projection; ghi phải qua Job Core/legacy theo mode hợp lệ, không ghi thẳng Elasticsearch.
2. Nghiệp vụ+outbox cùng DB transaction; confirm sau broker, consumer idempotent. Có thể delivery lại; không tuyên bố exactly-once SMTP.
3. Event giữ ID/envelope/version/correlation của source, kiểm schema; stale result có revision fence. Không đổi routing key/type chỉ ở một producer.
4. Browser chỉ gateway. Xóa forged identity headers, chặn encoded/dot/internal paths. Service xác minh gateway secret trước tin header, rồi permission/tenant.
5. Internal operations không đưa vào public contract/client. Rate limit/circuit breaker cần giữ semantics lỗi/timeout, không tự fallback mutation sang backend khác.
6. Dữ liệu giữa MySQL/Mongo/PostgreSQL có mapping rõ; không giả transaction xuyên mọi DB. Đồng bộ eventual cần UX waiting/error rõ.

## Cờ frontend có thật
| Flag | Source kiểm tra | Giá trị cần đọc |
|---|---|---|
| REACT_APP_JOB_SEARCH_MODE | `service/searchWorkspace.js` | core hoặc legacy behavior |
| REACT_APP_JOB_CREATE_MODE | `service/jobCreateAttempt.js` | legacy/core, invalid fail closed |
| REACT_APP_JOB_EDIT_MODE | `service/jobEditSession.js` | legacy/core |
| REACT_APP_JOB_REPOST_MODE | `service/jobRepostAttempt.js` | legacy/core |
| REACT_APP_JOB_WORKSPACE_MODE | `service/jobWorkspaceService.js` | legacy/core |
| REACT_APP_CANDIDATE_AI_ENABLED | `service/candidateWorkspace.js` | chuỗi true |
| REACT_APP_PREPARED_CV_APPLICATION_ENABLED | cùng file | chuỗi true |
| REACT_APP_APPLICATION_PROGRESS_ENABLED | `service/applicationProgress.js` | chuỗi true |

Đây là danh sách key, không là giá trị runtime hiện tại. Cờ CRA được bake khi build; sửa env rồi reload chưa chắc có tác dụng. Đối chiếu backend/gateway capability, deployment image và DB migration trước bật. Không bật tất cả flag để demo UI.

## Rollout
Chuẩn bị compatibility matrix writer/reader/event/schema, flag off/on, migration expand, backup/restore đã diễn tập, quan sát queue lag/error/DLQ và cách rollback app+flags. Ghi command dự kiến cùng target; áp dụng chỉ khi trong phạm vi được phép. `docker compose down -v`, reset DB/queue và restore không phải bước cài mặc định.
Regenerate HTTP/event contracts bằng `npm --prefix microservices run contracts:generate` khi sửa nguồn; `contracts:check` để phát hiện drift. Test route gateway, direct service denial, duplicate/out-of-order event, broker outage/reconnect và flags off. Khởi động Docker/paid APIs không bắt buộc cho thay đổi tài liệu.
