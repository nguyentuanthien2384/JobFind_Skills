# Route ownership — kiểm tra source bổ sung

Snapshot 05/10/2026. Đã đọc declarations trong App, HomeCandidate, HomeAdmin; đối chiếu component và adapter cho các route trong bảng. Đã kiểm tra static ownership, chưa chạy runtime JobFind.

`feature_id` chọn bộ tài liệu chính; `related_features` giữ nghiệp vụ dùng chung view. Route references là các màn native đúng route; feature references là biến thể của feature, không chứng minh màn đó khớp route cụ thể. Các field permission từ parser chỉ là inventory: luôn đọc parent guard, accessControl và server middleware/service.

| Route | Tài liệu chính | Nghiệp vụ liên quan | Kết luận từ source |
| --- | --- | --- | --- |
| `/candidate/saved-jobs` | `saved-jobs-follow` |  | SavedJobs là danh sách favorite của actor CANDIDATE; không phải shell chung. |
| `/candidate/recommended-jobs` | `notifications` | job-search, candidate-profile | NotificationJobs source=recommended gọi getNotificationJobs; GET /api/get-notification-jobs scope bằng session. Đây là danh sách personalized, không phải API search chung. |
| `/candidate/followed-jobs` | `saved-jobs-follow` | notifications, companies | Cùng NotificationJobs nhưng source=followed; danh sách việc đang tuyển của công ty theo dõi, khác danh sách favorite posts. |
| `/candidate/cv-detail/:id` | `applications` |  | UserCv xem bản CV đã nộp khi ứng tuyển qua getDetailCvService(id, role). id thuộc legacy Cv, không phải Mongo prepared-CV _id hay application.id. |
| `/admin/add-job-level` | `recruitment-catalogs` |  | AddJobLevel dùng MANAGE_REFERENCE_DATA; xếp cùng nghề, kỹ năng, work/salary/experience types. |
| `/admin/list-job-level` | `recruitment-catalogs` |  | ManageJobLevel dùng MANAGE_REFERENCE_DATA; đây là danh mục cấp bậc tuyển dụng. |
| `/admin/edit-job-level/:id` | `recruitment-catalogs` |  | AddJobLevel ở edit mode đọc id; không đổi sang param :code của job-type/skill. |
| `/admin/history-post` | `billing-packages` |  | HistoryTradePost dùng VIEW_TRANSACTIONS; lịch sử mua gói đăng tin thuộc billing, không phải CRUD tin tuyển dụng. |
| `/admin/history-cv` | `billing-packages` |  | HistoryTradeCv dùng VIEW_TRANSACTIONS; lịch sử mua gói CV thuộc billing, không phải pipeline ứng viên. |
| `/admin/note/:id` | `job-posting` | admin-jobs | NotePost dùng any(MANAGE_POSTS, MODERATE_POSTS), chọn legacy getListNoteByPost hoặc core getManagedJobReview theo workspace. Ghi chú thủ công không phải toàn bộ lịch sử AI review. |
| `/admin/add-user` | `admin-users` | company-team | AddUser dùng any(MANAGE_USERS, MANAGE_TEAM). ADMIN và COMPANY được phép theo readiness; COMPANY gửi companyId và có tập role khác. UI filtering chưa chứng minh server an toàn: kiểm tra service actor/tenant. |
| `/admin/edit-user/:id` | `admin-users` | company-team | AddUser edit dùng cùng guard any(MANAGE_USERS, MANAGE_TEAM). Luồng platform user và company member dùng chung view nhưng phải giữ target ownership/role rules khác nhau. |
| `/admin/user-info` | `master-layout` | auth-recovery-security | UserInfo đọc getDetailUserById(userData.id), sửa hồ sơ của actor hiện tại; guard MANAGE_PROFILE nằm trong admin shell. ADMIN/COMPANY/EMPLOYER được vào shell theo state; không phải danh sách platform users và không phải candidate-only profile. |
| `/admin/` | `admin-overview` | employer-dashboard | Home dùng VIEW_ADMIN_HOME cho ADMIN và COMPANY/EMPLOYER đủ S1+CS1. Chọn dashboard variant theo actor và dữ liệu; tên prefix /admin không chứng minh ADMIN-only. |
| `/admin/edit-post/:id` | `job-posting` | admin-jobs | AddPost edit dùng any(MANAGE_POSTS, MODERATE_POSTS). Giữ workspace/ownership và admin moderation path theo actor. |
| `/admin/list-cv/:id` | `pipeline` | applications, admin-jobs | ManageCv dùng any(MANAGE_CANDIDATES, MODERATE_POSTS). Đây là danh sách hồ sơ của tin; đọc adapter để phân biệt post id, legacy CV id và application id, không suy từ tên route. |
| `/admin/user-cv/:id` | `pipeline` | applications, admin-jobs | UserCv là viewer CV đã nộp (legacy Cv.id) với any(MANAGE_CANDIDATES, MODERATE_POSTS). Không dùng id này cho prepared-CV hoặc application-detail API. |

## Source cần đọc khi tiếp tục

- `/candidate/saved-jobs`: `frontend/src/container/Candidate/SavedJobs.js`
- `/candidate/recommended-jobs`: `frontend/src/container/Candidate/NotificationJobs.js`, `frontend/src/service/notificationJobsService.js`
- `/candidate/followed-jobs`: `frontend/src/container/Candidate/NotificationJobs.js`, `frontend/src/service/notificationJobsService.js`
- `/candidate/cv-detail/:id`: `frontend/src/container/system/Cv/UserCv.js`, `frontend/src/service/cvService.js`
- `/admin/add-job-level`: `frontend/src/container/system/JobLevel/AddJobLevel.js`
- `/admin/list-job-level`: `frontend/src/container/system/JobLevel/ManageJobLevel.js`
- `/admin/edit-job-level/:id`: `frontend/src/container/system/JobLevel/AddJobLevel.js`
- `/admin/history-post`: `frontend/src/container/system/HistoryTrade/HistoryTradePost.js`
- `/admin/history-cv`: `frontend/src/container/system/HistoryTrade/HistoryTradeCv.js`
- `/admin/note/:id`: `frontend/src/container/system/Post/NotePost.js`, `frontend/src/service/jobWorkspaceService.js`
- `/admin/add-user`: `frontend/src/container/system/User/AddUser.js`, `frontend/src/auth/accessControl.js`
- `/admin/edit-user/:id`: `frontend/src/container/system/User/AddUser.js`, `frontend/src/auth/accessControl.js`
- `/admin/user-info`: `frontend/src/container/system/User/UserInfo.js`, `frontend/src/auth/accessControl.js`
- `/admin/`: `frontend/src/container/system/Home.js`, `frontend/src/auth/accessControl.js`
- `/admin/edit-post/:id`: `frontend/src/container/system/Post/AddPost.js`, `frontend/src/auth/accessControl.js`
- `/admin/list-cv/:id`: `frontend/src/container/system/Cv/ManageCv.js`, `frontend/src/service/cvService.js`
- `/admin/user-cv/:id`: `frontend/src/container/system/Cv/UserCv.js`, `frontend/src/service/cvService.js`

## Nghiệm thu mapping

- History post/CV đều chọn billing docs; job-level CRUD chọn recruitment-catalogs.
- SavedJobs khác followed/recommended lists; personalized list gọi notificationJobsService với đúng source.
- Hai UserCv routes dùng CV đã nộp; giữ legacy CV namespace và server ownership.
- AddUser có platform/team scopes; own UserInfo không chọn platform-user management.
- Home và NotePost chọn actor/workspace đúng; permission và tenant được xác minh từ source, không suy từ prefix.
- Layout/about/contact/user-info không tự kế thừa native 404 screen chỉ vì cùng master-layout.
