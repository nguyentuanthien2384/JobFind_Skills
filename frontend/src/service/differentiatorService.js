import axios from '../axios';

export const PIZZA_TRACKER_STAGES = [
    { key: 'SUBMITTED', label: 'Đã nộp CV', shortLabel: 'Đã nộp' },
    { key: 'AI_SCREENED', label: 'AI đã chấm tình huống', shortLabel: 'AI Sàng lọc' },
    { key: 'HR_VIEWED', label: 'HR đang xem CV', shortLabel: 'HR đã mở' },
    { key: 'SHORTLISTED', label: 'Vào danh sách rút gọn', shortLabel: 'Rút gọn' },
    { key: 'INTERVIEW_SCHEDULED', label: 'Đã xếp lịch phỏng vấn', shortLabel: 'Phỏng vấn' },
    { key: 'OFFERED', label: 'Đề nghị nhận việc (Offer)', shortLabel: 'Nhận Offer' },
    { key: 'REJECTED', label: 'Chưa phù hợp (Có góp ý AI)', shortLabel: 'Phản hồi AI' }
];

export const STAGE_LABELS_VI = {
    SUBMITTED: 'Đã nộp hồ sơ',
    AI_SCREENED: 'AI đã chấm điểm tình huống',
    HR_VIEWED: 'Nhà tuyển dụng đang mở xem CV',
    SHORTLISTED: 'Vào danh sách rút gọn (Shortlisted)',
    INTERVIEW_SCHEDULED: 'Đã đặt lịch phỏng vấn',
    OFFERED: 'Đã gửi đề nghị nhận việc (Offer)',
    REJECTED: 'Chưa phù hợp (Phản hồi xây dựng từ AI)'
};

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

export const getMyMockInterviewsService = (params = {}) => {
    return axios.get('/api/mock-interview/my', { params });
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

export const getMyJobInvitationsService = (params = {}) => {
    return axios.get('/api/job-invitations/my', { params });
};

export const respondToJobInvitationService = (invitationId, payload) => {
    return axios.post(`/api/job-invitations/${invitationId}/respond`, payload);
};

// 4. Proof-of-Skill qua GitHub API & Portfolio Đa ngành
export const syncGithubPortfolioSkillsService = (payload) => {
    return axios.post('/api/profile/proof-of-skill/sync-github', payload);
};

// Aliases đồng bộ cho các container gọi theo quy ước *Api
export const generateMicroTestPromptsApi = generateMicroTestService;
export const evaluateSituationalAnswerApi = evaluateSituationalAnswerService;
export const analyzeSkillGapAndAtsApi = analyzeSkillGapAndAtsService;
export const startMockInterviewApi = startMockInterviewService;
export const submitMockInterviewApi = submitMockInterviewService;
export const updateCvStageTrackerApi = updateCvStageTrackerService;
export const createVerifiedCompanyReviewApi = createVerifiedCompanyReviewService;
export const blindSearchCandidatesApi = searchBlindCandidatesService;
export const sendJobInvitationApi = sendReverseJobInvitationService;
export const respondToJobInvitationApi = respondToJobInvitationService;
export const syncProofOfSkillGithubApi = syncGithubPortfolioSkillsService;
