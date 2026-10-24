# <feature> — Error matrix
| Failure | Transport/envelope | User-facing state | Draft/retry | Test/evidence |
|---|---|---|---|---|
| Validation | actual field/status | field error | retain values | NOT_RUN |
| Unauthorized | 401/session object | re-auth | preserve draft; no write replay | NOT_RUN |
| Forbidden | 403/permission | unavailable with reason | no escalation | NOT_RUN |
| Timeout | unknown result | check status/readiness | idempotency if contract supports | NOT_RUN |
