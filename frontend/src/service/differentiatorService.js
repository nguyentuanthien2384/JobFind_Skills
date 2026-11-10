import axios from '../axios';

// 1. Situational Micro-Assessment & AI Mock Interview (Đa ngành)
export const generateMicroTestService = (payload) => {
    return axios.post('/api/ai/generate-micro-test', payload);
};

export const evaluateSituationalAnswerService = (payload) => {
    return axios.post('/api/ai/evaluate-situational-answer', payload);
};

export const analyzeSkillGapAndAtsService = (payload) => {
    return axios.post('/api/ai/skill-gap-simulator', payload);
};

export const startMockInterviewService = (payload) => {
    return axios.post('/api/mock-interview/start', payload);
};

export const submitMockInterviewService = (sessionId, payload) => {
    return axios.post(`/api/mock-interview/${sessionId}/submit`, payload);
};

// 2. Anti-Ghosting Pizza-Tracker, SLA Phản hồi & Verified Candidate Reviews
export const updateCvStageTrackerService = (payload) => {
    return axios.put('/api/cv/stage', payload);
};

export const createVerifiedCompanyReviewService = (payload) => {
    return axios.post('/api/company-reviews/verified', payload);
};

// 3. Tuyển dụng ngược ẩn danh (Blind Profile & Salary Bidding Offer-First)
export const searchBlindCandidatesService = (params) => {
    return axios.get('/api/candidates/blind-search', { params });
};

export const sendReverseJobInvitationService = (payload) => {
    return axios.post('/api/job-invitations', payload);
};

export const respondToJobInvitationService = (invitationId, payload) => {
    return axios.post(`/api/job-invitations/${invitationId}/respond`, payload);
};

// 4. Proof-of-Skill qua GitHub API
export const syncGithubPortfolioSkillsService = (payload) => {
    return axios.post('/api/profile/proof-of-skill/sync-github', payload);
};
