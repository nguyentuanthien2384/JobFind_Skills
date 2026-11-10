'use strict';

const differentiatorController = require('../controllers/differentiatorController');

/**
 * Đăng ký các route tính năng khác biệt đa ngành (Multi-Industry Differentiator)
 * vào router Express của backend/src/routes/web.js.
 *
 * @param {import('express').Router} router
 * @param {Function} protectedBy - Hàm bọc middleware xác thực & phân quyền: protectedBy(PERMISSIONS.X)
 * @param {Object} PERMISSIONS - Bảng hằng số quyền từ backend/src/middlewares/authorize.js
 */
const registerDifferentiatorRoutes = (router, protectedBy, PERMISSIONS) => {
  const guard = (perm) => (typeof protectedBy === 'function' && perm ? protectedBy(perm) : []);

  // 1. Situational Micro-Assessment & AI Mock Interview (Đa ngành)
  router.post(
    '/api/ai/generate-micro-test',
    ...guard(PERMISSIONS?.JOB_MANAGE),
    differentiatorController.handleGenerateMicroTest
  );
  router.post(
    '/api/ai/evaluate-situational-answer',
    ...guard(PERMISSIONS?.CANDIDATE_APPLY),
    differentiatorController.handleEvaluateSituationalAnswer
  );
  router.post(
    '/api/ai/skill-gap-simulator',
    ...guard(PERMISSIONS?.ACCOUNT_SELF),
    differentiatorController.handleAnalyzeSkillGapAndAts
  );
  router.post(
    '/api/mock-interview/start',
    ...guard(PERMISSIONS?.ACCOUNT_SELF),
    differentiatorController.handleStartMockInterview
  );
  router.post(
    '/api/mock-interview/:sessionId/submit',
    ...guard(PERMISSIONS?.ACCOUNT_SELF),
    differentiatorController.handleSubmitMockInterview
  );

  // 2. Anti-Ghosting Pizza-Tracker, SLA Phản hồi & Verified Candidate Reviews
  router.put(
    '/api/cv/stage',
    ...guard(PERMISSIONS?.RECRUITMENT_READ),
    differentiatorController.handleUpdateCvStage
  );
  router.post(
    '/api/cv/stage',
    ...guard(PERMISSIONS?.RECRUITMENT_READ),
    differentiatorController.handleUpdateCvStage
  );
  router.post(
    '/api/company-reviews/verified',
    ...guard(PERMISSIONS?.SOCIAL_INTERACT),
    differentiatorController.handleCreateVerifiedReview
  );

  // 3. Tuyển dụng ngược ẩn danh (Blind Profile & Salary Bidding Offer-First)
  router.get(
    '/api/candidates/blind-search',
    ...guard(PERMISSIONS?.CANDIDATE_SEARCH),
    differentiatorController.handleSearchBlindCandidates
  );
  router.post(
    '/api/job-invitations',
    ...guard(PERMISSIONS?.CANDIDATE_SEARCH),
    differentiatorController.handleSendJobInvitation
  );
  router.post(
    '/api/job-invitations/:invitationId/respond',
    ...guard(PERMISSIONS?.ACCOUNT_SELF),
    differentiatorController.handleRespondJobInvitation
  );

  // 4. Proof-of-Skill qua GitHub API
  router.post(
    '/api/profile/proof-of-skill/sync-github',
    ...guard(PERMISSIONS?.ACCOUNT_SELF),
    differentiatorController.handleSyncGithubPortfolio
  );

  return router;
};

module.exports = {
  registerDifferentiatorRoutes
};
