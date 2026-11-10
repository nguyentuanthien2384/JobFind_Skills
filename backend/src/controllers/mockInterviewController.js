'use strict';

const differentiatorController = require('./differentiatorController');

module.exports = {
  startMockInterview: differentiatorController.handleStartMockInterview,
  submitMockInterview: differentiatorController.handleSubmitMockInterview,
  generateMicroTest: differentiatorController.handleGenerateMicroTest,
  evaluateSituationalAnswer: differentiatorController.handleEvaluateSituationalAnswer,
  analyzeSkillGapAndAts: differentiatorController.handleAnalyzeSkillGapAndAts
};
