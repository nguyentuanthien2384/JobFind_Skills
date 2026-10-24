# Dữ liệu, migration và ownership

## Nguồn schema
Legacy: `backend/src/models/*.js`, `backend/src/migrations/*.js`, `backend/src/models/index.js`, `backend/.sequelizerc` và script migrate hiện có. Đọc cả model lẫn migration/constraint: ORM association không chứng minh DB có FK/index.
Modern: `microservices/*/migrations/`, các lớp store/model của service và startup schema, shared contracts. Không áp dụng Sequelize cho PostgreSQL/MongoDB một cách máy móc.

| Miền | Nguồn dữ liệu | Quy tắc |
|---|---|---|
| Người dùng/công ty/quyền | MySQL Users/Accounts/Companies | companyId trusted từ user; role/status reloaded |
| Tin tuyển dụng | Posts + DetailPosts và Job Core MySQL | Giữ tên trường/association legacy; core outbox cùng transaction |
| CV đã nộp | MySQL `Cv` (model) / bảng thực tế do Sequelize và migration quyết định | `userId`, `postId`, BLOB file, `description`, `isChecked`; unique application theo migration |
| CV chuẩn bị | Identity MongoDB | `_id` khác CV legacy, private owner |
| Pipeline | Application PostgreSQL | mapping `legacy_cv_id`; stage/history/outbox cùng transaction |
| Gói và lượt | Company allowances, order/package/candidate-view/payment records | Lock/quota/idempotency; không trừ lại khi retry |
| Chat/media | MySQL ChatMessages/ChatAttachments | attachment riêng tư, receiver chỉ đọc sau send |
| Search | Elasticsearch | Projection, không dùng làm nguồn ghi/ủy quyền |

## Trình tự migration
1. Xác định data owner, kiểu ID, record count/duplicates/nulls cần đo; không đọc BLOB CV hoặc dump dữ liệu cá nhân để thống kê schema.
2. Thêm migration mới theo naming/order thật. Không đổi migration đã chạy; không rename bảng/column chỉ để đẹp.
3. Với dữ liệu cũ, triển khai expand → backfill có kiểm soát → constraint → đổi reader/writer. Ghi precondition, retry/resume, rollback dữ liệu và ứng dụng riêng.
4. MySQL DDL không có rollback transaction như DML. Không hứa migration atomic; xử lý chạy lại khi một phần DDL hoàn tất. Kiểm tra `SequelizeMeta` với database nhập từ SQL.
5. Auth dùng `npm run auth:migrate`; chat dùng `npm run chat:migrate`; catalog dùng `npm run catalog:migrate` sau đọc scripts. Các script có backup và tác động DB; xác định môi trường trước khi chạy.
6. Không `sync({force:true})`, drop, seed/restore, reset/deduplicate bản ghi thật để vượt lỗi. Chỉ sửa nghiệp vụ trong scope và giữ dữ liệu cũ.

## Kỷ luật transaction
Nghiệp vụ + outbox cùng connection/transaction. Publisher confirm không là exactly-once; consumer có inbox/ledger khi cần. Lock theo account/company/resource nhất quán để tránh deadlock. Dùng parameterized query/ORM; filter/sort allowlist; không interpolate client input vào SQL.
Lưu ý case-sensitive path `packageCV.js`/`orderPackageCv.js` và alias như `postDetailData`, `postCvData`; không suy luận từ cách viết PascalCase.

## Kết quả cần bàn giao
Migration + model/store + adapter/contract liên quan; bảng field/type/default/null/PK/FK/index trước/sau; dữ liệu ảnh hưởng; chiến lược backfill/retry; test migration trên DB dùng một lần nếu được phép; bằng chứng dữ liệu cũ/constraint đúng. Nếu chưa chạy DB, nói rõ chỉ kiểm tra tĩnh.
