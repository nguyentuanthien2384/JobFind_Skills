'use strict';

const differentiatorService = require('../services/differentiatorService');

const handleGenerateMicroTest = async (req, res) => {
  try {
    const data = await differentiatorService.generateMicroTestPrompts(req.body || {});
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleEvaluateSituationalAnswer = async (req, res) => {
  try {
    const io = req.app?.get ? req.app.get('io') : null;
    const userId = req.user?.id || req.body?.userId;
    const data = await differentiatorService.evaluateSituationalAnswer({
      ...req.body,
      userId,
      io
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleStartMockInterview = async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.userId;
    const data = await differentiatorService.startMockInterview({
      userId,
      postId: req.body?.postId
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleSubmitMockInterview = async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.userId;
    const data = await differentiatorService.submitMockInterview({
      sessionId: req.params?.sessionId || req.body?.sessionId,
      userId,
      answers: req.body?.answers
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleGetMyMockInterviews = async (req, res) => {
  try {
    const userId = req.user?.id || req.query?.userId;
    const data = await differentiatorService.getMyMockInterviewSessions({
      userId,
      postId: req.query?.postId
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleAnalyzeSkillGapAndAts = async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.userId;
    const data = await differentiatorService.analyzeSkillGapAndAts({
      userId,
      postId: req.body?.postId || req.query?.postId,
      candidateSkills: req.body?.candidateSkills
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleUpdateCvStage = async (req, res) => {
  try {
    const io = req.app?.get ? req.app.get('io') : null;
    const data = await differentiatorService.updateCvStageWithTracker({
      ...req.body,
      io
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleCreateVerifiedReview = async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.userId;
    const data = await differentiatorService.createVerifiedReview({
      ...req.body,
      userId
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleSearchBlindCandidates = async (req, res) => {
  try {
    const companyId = req.authorization?.companyId || req.user?.companyId || req.query?.companyId;
    const data = await differentiatorService.searchCandidatesWithBlindProtection({
      ...req.query,
      companyId
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleSendJobInvitation = async (req, res) => {
  try {
    const io = req.app?.get ? req.app.get('io') : null;
    const recruiterId = req.user?.id || req.body?.recruiterId;
    const companyId = req.authorization?.companyId || req.user?.companyId || req.body?.companyId;
    const data = await differentiatorService.sendReverseJobInvitation({
      ...req.body,
      recruiterId,
      companyId,
      io
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleRespondJobInvitation = async (req, res) => {
  try {
    const io = req.app?.get ? req.app.get('io') : null;
    const candidateId = req.user?.id || req.body?.candidateId;
    const data = await differentiatorService.respondToJobInvitation({
      ...req.body,
      candidateId,
      invitationId: req.params?.invitationId || req.body?.invitationId,
      io
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleGetMyJobInvitations = async (req, res) => {
  try {
    const userId = req.user?.id || req.query?.userId;
    const companyId = req.authorization?.companyId || req.user?.companyId || req.query?.companyId;
    const roleCode =
      req.authorization?.roleCode || req.user?.userAccountData?.roleCode || req.query?.roleCode || 'CANDIDATE';
    const data = await differentiatorService.getMyJobInvitations({
      userId,
      companyId,
      roleCode
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

const handleSyncGithubPortfolio = async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.userId;
    const data = await differentiatorService.syncGithubPortfolioSkills({
      userId,
      githubUsername: req.body?.githubUsername,
      portfolioUrl: req.body?.portfolioUrl,
      certificateLink: req.body?.certificateLink
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errCode: -1, errMessage: 'Error from server' });
  }
};

module.exports = {
  handleGenerateMicroTest,
  handleEvaluateSituationalAnswer,
  handleStartMockInterview,
  handleSubmitMockInterview,
  handleGetMyMockInterviews,
  handleAnalyzeSkillGapAndAts,
  handleUpdateCvStage,
  handleCreateVerifiedReview,
  handleSearchBlindCandidates,
  handleSendJobInvitation,
  handleRespondJobInvitation,
  handleGetMyJobInvitations,
  handleSyncGithubPortfolio
};
