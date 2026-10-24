# <feature> — Endpoint contracts
For each operation list exact method/publicPath/source owner/caller/schema/response/status/error/permission/tenant.
## Request and response
Use actual source fields and sample synthetic fixtures; mark PROPOSAL fields.
## Compatibility
Legacy errCode, response.data interceptor, modern envelope, IDs, flags, pagination/cancellation.
## Write safety
Idempotency where supported, draft retention, uncertain timeout; no automatic write replay after refresh.
## Acceptance
Contract tests and source evidence; do not expose internal endpoints as public paths.
