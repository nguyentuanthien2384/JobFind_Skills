# Chỉ mục modern API — 71 operations

Được tính trực tiếp từ shared operations.js snapshot. Đọc file source và schemas cho payload chi tiết; các operation internal không phải API trình duyệt.

| Operation | Service | Method | Public path / internal | Permission |
|---|---|---|---|---|
| `supportTurn` | support | POST | `/api/support/turn` | `None` |
| `supportKnowledge` | support | GET | `/api/support/knowledge` | `None` |
| `supportList` | support | GET | `/api/support/conversations` | `None` |
| `supportGet` | support | GET | `/api/support/conversations/:id` | `None` |
| `supportDelete` | support | DELETE | `/api/support/conversations/:id` | `None` |
| `supportFeedback` | support | POST | `/api/support/conversations/:id/messages/:messageId/feedback` | `None` |
| `supportHandoff` | support | POST | `/api/support/conversations/:id/handoff` | `support:chat:use` |
| `supportPrivate` | support | GET | `/api/support/private/:name` | `support:chat:use` |
| `supportQueue` | support | GET | `/api/support/handoffs` | `support:manage` |
| `supportTicket` | support | GET | `/api/support/handoffs/:id` | `support:manage` |
| `supportClaim` | support | POST | `/api/support/handoffs/:id/claim` | `support:manage` |
| `supportResolve` | support | POST | `/api/support/handoffs/:id/resolve` | `support:manage` |
| `jobCreate` | jobs | POST | `/api/jobs` | `job:manage` |
| `jobRepost` | jobs | POST | `/api/jobs/:id/repost` | `job:manage` |
| `jobUpdate` | jobs | PUT | `/api/jobs/:id` | `job:manage` |
| `jobDelete` | jobs | DELETE | `/api/jobs/:id` | `job:manage` |
| `jobManageList` | jobs | GET | `/api/jobs/manage` | `job:manage` |
| `jobReviewGet` | jobs | GET | `/api/jobs/:id/review` | `job:manage` |
| `jobGet` | jobs | GET | `/api/jobs/:id` | `None` |
| `jobManageGet` | jobs | GET | `/api/jobs/:id/manage` | `job:manage` |
| `aiParseResume` | jobs | POST | `/api/ai/parse-resume` | `ai:candidate:use` |
| `aiGenerateCv` | jobs | POST | `/api/ai/generate-cv` | `ai:candidate:use` |
| `aiMatchCv` | jobs | POST | `/api/ai/match-cv` | `['ai:candidate:use', 'ai:recruiter:use']` |
| `aiCoverLetter` | jobs | POST | `/api/ai/cover-letter` | `ai:candidate:use` |
| `aiApplicationIntro` | jobs | POST | `/api/ai/application-intro` | `ai:candidate:use` |
| `aiCandidateMessage` | jobs | POST | `/api/ai/candidate-message` | `ai:recruiter:use` |
| `aiChatAssist` | jobs | POST | `/api/ai/chat-assist` | `['ai:candidate:use', 'ai:recruiter:use']` |
| `aiScreenApplication` | jobs | POST | `/api/ai/screen-application` | `ai:recruiter:use` |
| `aiJobScreenings` | jobs | GET | `/api/ai/jobs/:id/screenings` | `ai:recruiter:use` |
| `aiTaskGet` | jobs | GET | `/api/ai/tasks/:taskId` | `['ai:candidate:use', 'ai:recruiter:use']` |
| `jobIndexList` | jobs | GET | `INTERNAL: /internal/jobs` | `None` |
| `jobIndexGet` | jobs | GET | `INTERNAL: /internal/jobs/:id` | `None` |
| `profileGet` | identity | GET | `/api/profile` | `profile:self` |
| `profileUpdate` | identity | PUT | `/api/profile` | `profile:self` |
| `cvList` | identity | GET | `/api/profile/cvs` | `cv:self:manage` |
| `cvCreate` | identity | POST | `/api/profile/cvs` | `cv:self:manage` |
| `cvUpdate` | identity | PUT | `/api/profile/cvs/:cvId` | `cv:self:manage` |
| `cvDelete` | identity | DELETE | `/api/profile/cvs/:cvId` | `cv:self:manage` |
| `cvImport` | identity | POST | `/api/profile/cvs/import` | `cv:self:manage` |
| `searchJobs` | search | GET | `/api/search/jobs` | `None` |
| `searchSuggest` | search | GET | `/api/search/suggest` | `None` |
| `searchFacets` | search | GET | `/api/search/facets` | `None` |
| `searchRelated` | search | GET | `/api/search/related/:id` | `None` |
| `searchReindex` | search | POST | `INTERNAL: /internal/reindex` | `None` |
| `applicationStages` | applications | GET | `/api/applications/stages` | `application:manage` |
| `applicationBoard` | applications | GET | `/api/applications/board` | `application:manage` |
| `applicationFunnel` | applications | GET | `/api/applications/funnel` | `application:manage` |
| `applicationList` | applications | GET | `/api/applications` | `application:manage` |
| `applicationGet` | applications | GET | `/api/applications/:id` | `application:manage` |
| `applicationMove` | applications | PATCH | `/api/applications/:id/stage` | `application:manage` |
| `applicationDecision` | applications | POST | `/api/applications/:id/decision-notification` | `application:manage` |
| `applicationInterview` | applications | POST | `/api/applications/:id/interview-invitation` | `application:manage` |
| `applicationRating` | applications | PATCH | `/api/applications/:id/rating` | `application:manage` |
| `applicationNote` | applications | POST | `/api/applications/:id/notes` | `application:manage` |
| `myApplications` | applications | GET | `/api/my-applications` | `application:self:read` |
| `talentList` | applications | GET | `/api/talent-pool` | `talent-pool:manage` |
| `talentSave` | applications | POST | `/api/talent-pool` | `talent-pool:manage` |
| `talentDelete` | applications | DELETE | `/api/talent-pool/:candidateId` | `talent-pool:manage` |
| `applicationSync` | applications | POST | `INTERNAL: /internal/sync` | `None` |
| `reportOverview` | admin | GET | `/api/admin/reports/overview` | `admin:read` |
| `reportTimeseries` | admin | GET | `/api/admin/reports/timeseries` | `admin:read` |
| `reportDistribution` | admin | GET | `/api/admin/reports/distribution` | `admin:read` |
| `reportFunnel` | admin | GET | `/api/admin/reports/funnel` | `admin:read` |
| `reportActivity` | admin | GET | `/api/admin/reports/activity` | `admin:read` |
| `auditList` | admin | GET | `/api/admin/audit` | `admin:read` |
| `auditTarget` | admin | GET | `/api/admin/audit/target/:type/:id` | `admin:read` |
| `masterList` | admin | GET | `/api/admin/master-data` | `admin:read` |
| `masterSave` | admin | POST | `/api/admin/master-data` | `admin:write` |
| `masterDelete` | admin | DELETE | `/api/admin/master-data/:id` | `admin:write` |
| `auditIngest` | admin | POST | `INTERNAL: /internal/audit-action` | `None` |
| `aliasMap` | admin | GET | `INTERNAL: /internal/alias-map` | `None` |
