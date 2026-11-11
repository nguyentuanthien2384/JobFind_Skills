'use strict';

const differentiatorController = require('./differentiatorController');

module.exports = {
  startMockInterview: differentiatorController.handleStartMockInterview,
  submitMockInterview: differentiatorController.handleSubmitMockInterview,
  getMyMockInterviews: differentiatorController.handleGetMyMockInterviews,
  generateMicroTest: differentiatorController.handleGenerateMicroTest,
  evaluateSituationalAnswer: differentiatorController.handleEvaluateSituationalAnswer,
  analyzeSkillGapAndAts: differentiatorController.handleAnalyzeSkillGapAndAts
};
