# JobFind — Feature status ledger

Snapshot source presence không là completed implementation. Các phân hệ đã tích hợp full-stack (Backend + Frontend) và kiểm thử tự động được ghi nhận kèm bằng chứng bên dưới.

| Feature | Native Stitch | Design status | Code status | Test status |
| --- | --- | --- | --- | --- |
| master-layout | Extension/Figma catalog | reference/spec present | Navigation routes integrated (`App.js`, `HomeCandidate.js`, `HomeAdmin.js`) | PASS (`verify_bundle.py`) |
| home | JF-035 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| job-search | JF-036 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| job-detail | JF-010 (tích hợp EXT-JF-010-CANDIDATE-INSIGHTS), JF-022, JF-023, JF-024, EXT-JF-010-SKILL-GAP-ATS | reference/spec present; integrated & skill-gap mockups | Full-stack implemented (`JobDetail.js`, `SendCvModal.js`, `postService.js`, `differentiatorService.js`) | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| companies | JF-006, JF-007, EXT-JF-006-VERIFIED-REVIEWS | reference/spec present; verified reviews mockup | Full-stack implemented (`DetailCompany.js`, `CompanyReview.js`, `companyService.js`, `companyReviewService.js`) | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| auth-login | JF-015, JF-016, JF-017 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| auth-register | JF-019, JF-020, JF-028 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| auth-recovery-security | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| candidate-profile | JF-009, EXT-JF-009-PROOF-OF-SKILL | reference/spec present; proof-of-skill mockup | Full-stack implemented (`CandidateInfo.js`, `SettingUser.js`, `userService.js`, `differentiatorService.js`) | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| candidate-cv-ai | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| applications | JF-018, JF-022, JF-023, JF-024, EXT-JF-024-MICRO-ASSESSMENT, EXT-JF-018-PIZZA-TRACKER | reference/spec present; pizza-tracker & assessment mockups | Full-stack implemented (`ManageCvCandidate.js`, `SendCvModal.js`, `UserCv.js`, `cvService.js`, `legacyApplication.js`) | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| saved-jobs-follow | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| notifications | JF-033 | reference/spec present | Realtime Socket.IO emitter integrated (`config/socket.js`) | PASS (`test-multi-industry-differentiator.cjs`) |
| chat | JF-030, JF-031 | reference/spec present | Auto-open chat room on Offer-First acceptance integrated (`differentiatorService.js`) | PASS (`test-multi-industry-differentiator.cjs`) |
| support-assistant | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| company-profile | JF-005 | reference/spec present | SLA 72h metrics integrated (`companyService.js`, `DetailCompany.js`) | PASS (`test-multi-industry-differentiator.cjs`) |
| company-team | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| employer-dashboard | JF-034 | reference/spec present | Sidebar & hub integrated (`HomeAdmin.js`, `MultiIndustryDifferentiatorHub.js`) | PASS (`test-multi-industry-differentiator.cjs`) |
| job-posting | JF-021 | reference/spec present | Full-stack Micro-Test configuration & AI generator implemented (`AddPost.js`, `jobFormAdapter.js`, `postService.js`, `jobEdit.js`) | PASS (`test-multi-industry-differentiator.cjs`) |
| candidate-search | JF-012, EXT-JF-012-REVERSE-RECRUITING | reference/spec present; reverse recruiting mockup | Full-stack Blind Talent Pool & Offer-First Bidding implemented (`FilterCv.js`, `ManageCvCandidate.js`, `cvService.js`, `differentiatorService.js`) | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| pipeline | JF-025 | reference/spec present | Full-stack Pizza-Tracker Stage Controller & Constructive AI Rejection (`UserCv.js`, `cvService.js`, `differentiatorService.js`) | PASS (`test-multi-industry-differentiator.cjs`) |
| interviews-offers | JF-013, JF-014, EXT-JF-014-AI-MOCK-INTERVIEW | reference/spec present; ai mock interview mockup | Full-stack AI Mock Interviewer implemented (`JobDetail.js`, `MultiIndustryDifferentiatorHub.js`, `mockInterviewController.js`) | PASS (`test-multi-industry-differentiator.cjs`) + design verified browser |
| billing-packages | JF-003 | reference/spec present | CV quota deduction on Offer-First acceptance integrated (`differentiatorService.js`) | PASS (`test-multi-industry-differentiator.cjs`) |
| admin-overview | JF-002 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| admin-users | JF-027 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| admin-jobs | JF-011 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| admin-companies | JF-008, JF-037 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| admin-packages | JF-026 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| admin-reports-audit | JF-029 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| recruitment-catalogs | Extension/Figma catalog | reference/spec present | source mapped; changes not implemented | NOT_RUN |
| system-proposals | JF-004, JF-013, JF-014, JF-003 | reference/spec present | source mapped; changes not implemented | NOT_RUN |
