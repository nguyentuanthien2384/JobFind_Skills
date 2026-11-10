# JobFind — Feature status ledger

Snapshot source presence không là completed implementation. Phiên này chỉ dựng bộ skills/spec.

| Feature | Native Stitch | Design status | Code status | Test status |
| --- | --- | --- | --- | --- |
| master-layout | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| home | JF-035 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| job-search | JF-036 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| job-detail | JF-010 (tích hợp EXT-JF-010-CANDIDATE-INSIGHTS), JF-022, JF-023, JF-024, EXT-JF-010-SKILL-GAP-ATS | reference/spec present; integrated & skill-gap mockups | EXT-JF-010-SKILL-GAP-ATS implemented (`differentiatorService.js`, `MultiIndustryDifferentiatorHub.js`); native JF-010 source mapped | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| companies | JF-006, JF-007, EXT-JF-006-VERIFIED-REVIEWS | reference/spec present; verified reviews mockup | EXT-JF-006-VERIFIED-REVIEWS implemented (`differentiatorService.createVerifiedReview`, `companyReview.js`); native JF-006/007 source mapped | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| auth-login | JF-015, JF-016, JF-017 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| auth-register | JF-019, JF-020, JF-028 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| auth-recovery-security | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| candidate-profile | JF-009, EXT-JF-009-PROOF-OF-SKILL | reference/spec present; proof-of-skill mockup | EXT-JF-009-PROOF-OF-SKILL implemented (`syncGithubPortfolioSkills`, `respondToJobInvitation`, `userSkill.js`); native JF-009 source mapped | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| candidate-cv-ai | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| applications | JF-018, JF-022, JF-023, JF-024, EXT-JF-024-MICRO-ASSESSMENT, EXT-JF-018-PIZZA-TRACKER | reference/spec present; pizza-tracker & assessment mockups | EXT-JF-024 & EXT-JF-018 implemented (`evaluateSituationalAnswer`, `updateCvStageWithTracker`, `cv.js`); native JF-018/022-024 source mapped | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| saved-jobs-follow | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| notifications | JF-033 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| chat | JF-030, JF-031 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| support-assistant | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| company-profile | JF-005 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| company-team | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| employer-dashboard | JF-034 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| job-posting | JF-021 | reference/spec present | Multi-Industry Micro-Test generator (`POST /api/ai/generate-micro-test`, `detailpost.js`) implemented; native JF-021 source mapped | PASS (`test-multi-industry-differentiator.cjs`) |
| candidate-search | JF-012, EXT-JF-012-REVERSE-RECRUITING | reference/spec present; reverse recruiting mockup | EXT-JF-012-REVERSE-RECRUITING implemented (`searchCandidatesWithBlindProtection`, `sendReverseJobInvitation`, `jobInvitation.js`, `userSetting.js`); native JF-012 source mapped | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| pipeline | JF-025 | reference/spec present | Stage tracker & SLA sync (`PUT /api/cv/stage`) implemented; native JF-025 source mapped | PASS (`test-multi-industry-differentiator.cjs`) |
| interviews-offers | JF-013, JF-014, EXT-JF-014-AI-MOCK-INTERVIEW | reference/spec present; ai mock interview mockup | EXT-JF-014-AI-MOCK-INTERVIEW implemented (`startMockInterview`, `submitMockInterview`, `mockInterviewSession.js`); native JF-013/014 source mapped | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| billing-packages | JF-003 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| admin-overview | JF-002 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| admin-users | JF-027 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| admin-jobs | JF-011 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| admin-companies | JF-008, JF-037 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| admin-packages | JF-026 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| admin-reports-audit | JF-029 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| recruitment-catalogs | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| system-proposals | JF-004, JF-013, JF-014, JF-003 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
