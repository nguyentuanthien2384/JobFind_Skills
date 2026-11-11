import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    generateMicroTestService,
    evaluateSituationalAnswerService,
    startMockInterviewService,
    submitMockInterviewService,
    getMyMockInterviewsService,
    updateCvStageTrackerService,
    createVerifiedCompanyReviewService,
    searchBlindCandidatesService,
    sendReverseJobInvitationService,
    getMyJobInvitationsService,
    respondToJobInvitationService,
    syncGithubPortfolioSkillsService,
    analyzeSkillGapAndAtsService
} from '../../service/differentiatorService';

const INDUSTRY_OPTIONS = [
    { code: 'SALES', label: 'Kinh doanh / Bán hàng / CSKH', sampleJob: 'Trưởng nhóm Kinh doanh B2B (Sales Manager)' },
    { code: 'MARKETING', label: 'Marketing / Truyền thông / Thương hiệu', sampleJob: 'Chuyên viên Digital Performance Marketing' },
    { code: 'ACCOUNTING_HR', label: 'Kế toán / Nhân sự / Hành chính', sampleJob: 'Kế toán Tổng hợp / Chuyên viên C&B' },
    { code: 'IT', label: 'Công nghệ thông tin / Phần mềm', sampleJob: 'Kỹ sư Phần mềm Full-stack / Backend' }
];

const MultiIndustryDifferentiatorHub = () => {
    const [activeTab, setActiveTab] = useState('MICRO_TEST');
    const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRY_OPTIONS[0]);
    const [microPrompts, setMicroPrompts] = useState([]);
    const [candidateAnswer, setCandidateAnswer] = useState('');
    const [evaluationResult, setEvaluationResult] = useState(null);
    const [mockSession, setMockSession] = useState(null);
    const [myMockHistory, setMyMockHistory] = useState([]);
    const [blindCandidates, setBlindCandidates] = useState([]);
    const [myInvitations, setMyInvitations] = useState([]);
    const [githubUsername, setGithubUsername] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    const [githubReport, setGithubReport] = useState(null);
    const [skillGapReport, setSkillGapReport] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        getMyJobInvitationsService()
            .then((res) => {
                if (res?.errCode === 0) setMyInvitations(res.data || []);
            })
            .catch(() => {});
        getMyMockInterviewsService()
            .then((res) => {
                if (res?.errCode === 0) setMyMockHistory(res.data || []);
            })
            .catch(() => {});
    }, []);

    const handleGeneratePrompts = async () => {
        const res = await generateMicroTestService({
            jobTitle: selectedIndustry.sampleJob,
            categoryCode: selectedIndustry.code
        });
        if (res?.errCode === 0) {
            setMicroPrompts(res.data?.prompts || []);
            setStatusMessage(`Đã sinh 3 câu hỏi tình huống sát ngành: ${res.data?.industryLabel}`);
        }
    };

    const handleEvaluateSituational = async (cvId = 1) => {
        const res = await evaluateSituationalAnswerService({
            cvId,
            microTestAnswer: candidateAnswer
        });
        if (res?.errCode === 0) {
            setEvaluationResult(res.data);
            setStatusMessage('AI đã chấm điểm tình huống và cập nhật trạng thái AI_SCREENED!');
            toast.success('Đã chấm điểm tình huống bằng AI!');
        }
    };

    const handleStartMock = async (postId = 1) => {
        const res = await startMockInterviewService({ postId });
        if (res?.errCode === 0) {
            setMockSession(res.data);
            toast.info('Đã khởi tạo phòng phỏng vấn thử AI (5 câu hỏi sát JD)!');
        }
    };

    const handleSubmitMock = async () => {
        if (!mockSession?.id) return;
        const res = await submitMockInterviewService(mockSession.id, {
            answers: (mockSession.questions || []).map((q) => ({
                questionId: q.id,
                answer: 'Áp dụng mô hình STAR giải quyết vấn đề thực tế tại doanh nghiệp và đạt 120% KPI quý.'
            }))
        });
        if (res?.errCode === 0) {
            setMockSession(res.data);
            getMyMockInterviewsService().then((r) => {
                if (r?.errCode === 0) setMyMockHistory(r.data || []);
            }).catch(() => {});
            toast.success(`Hoàn thành phỏng vấn thử: ${res.data?.overallScore}/10 điểm!`);
        }
    };

    const handleLoadBlindPool = async () => {
        const res = await searchBlindCandidatesService({});
        if (res?.errCode === 0) {
            setBlindCandidates(res.data || []);
        }
        const invRes = await getMyJobInvitationsService();
        if (invRes?.errCode === 0) {
            setMyInvitations(invRes.data || []);
        }
    };

    const handleRespondInvitation = async (invitationId, action) => {
        const res = await respondToJobInvitationService(invitationId, { action });
        if (res?.errCode === 0) {
            toast.success(res.errMessage);
            handleLoadBlindPool();
        } else {
            toast.error(res?.errMessage || 'Không thể phản hồi lời mời');
        }
    };

    const handleSyncGithub = async () => {
        const res = await syncGithubPortfolioSkillsService({
            githubUsername,
            portfolioUrl
        });
        if (res?.errCode === 0) {
            setGithubReport(res.data);
            toast.success(res.errMessage || 'Đã xác thực kỹ năng thành công!');
        }
    };

    const handleCheckSkillGap = async (postId = 1) => {
        const res = await analyzeSkillGapAndAtsService({ postId });
        if (res?.errCode === 0) {
            setSkillGapReport(res.data);
        }
    };

    return (
        <div className="container py-4">
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h4 className="fw-bold mb-1">Trung tâm Tính năng Đột phá Đa ngành (DALN_JobFind)</h4>
                    <p className="text-muted mb-3">
                        Đánh giá tình huống nghề nghiệp (Sales, Marketing, Kế toán/Nhân sự, IT) • Pizza-Tracker & SLA Phản hồi • Tuyển dụng ngược Blind Profile & Salary Bidding
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                        <button type="button" className={`btn btn-sm ${activeTab === 'MICRO_TEST' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveTab('MICRO_TEST')}>
                            1. Situational Micro-Assessment & AI Mock Interview
                        </button>
                        <button type="button" className={`btn btn-sm ${activeTab === 'PIZZA_SLA' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveTab('PIZZA_SLA')}>
                            2. Pizza-Tracker, SLA 72h & Verified Review
                        </button>
                        <button type="button" className={`btn btn-sm ${activeTab === 'BLIND_BIDDING' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => { setActiveTab('BLIND_BIDDING'); handleLoadBlindPool(); }}>
                            3. Blind Profile & Salary Bidding (Offer-First)
                        </button>
                        <button type="button" className={`btn btn-sm ${activeTab === 'PROOF_SKILL' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => { setActiveTab('PROOF_SKILL'); handleSyncGithub(); handleCheckSkillGap(); }}>
                            4. Proof-of-Skill & Skill Gap ATS
                        </button>
                    </div>
                </div>
            </div>

            {statusMessage && (
                <div className="alert alert-info py-2">{statusMessage}</div>
            )}

            {activeTab === 'MICRO_TEST' && (
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="fw-bold">Bài kiểm tra tình huống ngắn (Micro-Assessment 3 phút) & Luyện phỏng vấn AI đa ngành</h5>
                        <div className="d-flex flex-wrap gap-2 my-3">
                            {INDUSTRY_OPTIONS.map((item) => (
                                <button
                                    key={item.code}
                                    type="button"
                                    className={`btn btn-sm ${selectedIndustry.code === item.code ? 'btn-dark' : 'btn-outline-secondary'}`}
                                    onClick={() => setSelectedIndustry(item)}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button type="button" className="btn btn-sm btn-success ms-auto" onClick={handleGeneratePrompts}>
                                AI Gợi ý 3 câu hỏi tình huống sát ngành
                            </button>
                        </div>

                        {microPrompts.map((p) => (
                            <div key={p.id} className="border rounded p-3 mb-2 bg-light">
                                <div className="fw-bold text-primary">{p.title}</div>
                                <div className="small mt-1">{p.question}</div>
                                <div className="text-muted small mt-1">Tiêu chí chấm: {p.criteria}</div>
                            </div>
                        ))}

                        <div className="mt-3">
                            <label className="form-label fw-semibold">Câu trả lời tình huống của ứng viên (Giới hạn 180 giây):</label>
                            <textarea
                                className="form-control mb-2"
                                rows={3}
                                value={candidateAnswer}
                                onChange={(e) => setCandidateAnswer(e.target.value)}
                                placeholder="Nhập phương án giải quyết tình huống thực tế của bạn..."
                            />
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-primary btn-sm" onClick={() => handleEvaluateSituational(1)}>
                                    Chấm điểm tình huống bằng AI (Thang 1–10)
                                </button>
                                <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => handleStartMock(1)}>
                                    Khởi tạo phòng AI Mock Interview 5 câu hỏi
                                </button>
                                {mockSession && (
                                    <button type="button" className="btn btn-warning btn-sm" onClick={handleSubmitMock}>
                                        Nộp bài phỏng vấn thử & Nhận góp ý CV
                                    </button>
                                )}
                            </div>
                        </div>

                        {evaluationResult && (
                            <div className="alert alert-success mt-3 mb-0">
                                <strong>Điểm tình huống AI: {evaluationResult.aiSituationalScore}/10</strong> (Trạng thái: {evaluationResult.applicationStage})
                                <ul className="mb-0 mt-1 small">
                                    <li><strong>Độ hiểu nghiệp vụ:</strong> {evaluationResult.aiEvaluationSummary?.understanding}</li>
                                    <li><strong>Tư duy giải quyết vấn đề:</strong> {evaluationResult.aiEvaluationSummary?.problemSolving}</li>
                                    <li><strong>Mức độ phù hợp JD:</strong> {evaluationResult.aiEvaluationSummary?.fitLevel}</li>
                                </ul>
                            </div>
                        )}

                        {myMockHistory.length > 0 && (
                            <div className="mt-3 border-top pt-3">
                                <h6 className="fw-bold">Lịch sử Phỏng vấn thử AI đã đồng bộ ({myMockHistory.length} phiên):</h6>
                                {myMockHistory.slice(0, 3).map((item) => (
                                    <div key={item.id} className="small text-muted mb-1">
                                        • Phiên #{item.id} (Tin #{item.postId}) — Trạng thái: <strong>{item.status}</strong>
                                        {item.overallScore ? ` — Điểm: ${item.overallScore}/10` : ''}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'PIZZA_SLA' && (
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="fw-bold">Anti-Ghosting Pizza-Tracker (7 bước), Chỉ số SLA 72h & Đánh giá xác thực</h5>
                        <p className="small text-muted">
                            Trạng thái thời gian thực: SUBMITTED → AI_SCREENED → HR_VIEWED → SHORTLISTED → INTERVIEW_SCHEDULED → OFFERED / REJECTED (kèm thư góp ý nhân văn bằng AI).
                        </p>
                        <div className="d-flex gap-2">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => updateCvStageTrackerService({ cvId: 1, newStage: 'HR_VIEWED' })}
                            >
                                Mô phỏng HR mở xem CV (Bắn socket cv:stage_updated)
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => updateCvStageTrackerService({ cvId: 1, newStage: 'REJECTED', hrNote: 'Thiếu kinh nghiệm chạy Ads ngân sách lớn' })}
                            >
                                Từ chối kèm thư góp ý nhân văn bằng AI
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-success"
                                onClick={() => createVerifiedCompanyReviewService({ companyId: 1, star: 5, interviewExperienceRating: 5, content: 'HR phản hồi đúng SLA 48h, đề phỏng vấn sát JD thực tế.' })}
                            >
                                Gửi đánh giá xác thực (Verified Candidate Review)
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'BLIND_BIDDING' && (
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="fw-bold">Tuyển dụng ngược ẩn danh (Blind Profile) & Đấu giá lương (Offer-First)</h5>
                        <p className="small text-muted">
                            Chặn công ty hiện tại trong blockedCompanyIds; HR chỉ bị trừ 1 lượt mở khóa CV (orderPackageCv) và tự động tạo phòng chat khi ứng viên bấm Chấp nhận (ACCEPTED).
                        </p>
                        <div className="d-flex gap-2 mb-3">
                            <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={async () => {
                                    await sendReverseJobInvitationService({
                                        candidateId: 2,
                                        postId: 1,
                                        offeredSalaryMin: 25,
                                        offeredSalaryMax: 35,
                                        pitchMessage: 'Mời bạn tham gia phỏng vấn vị trí Kế toán trưởng / Trưởng phòng Kinh doanh.'
                                    });
                                    handleLoadBlindPool();
                                }}
                            >
                                Gửi lời mời Offer-First (25 - 35 triệu)
                            </button>
                        </div>
                        <div className="small mb-3">Số hồ sơ đang bật tìm việc (đã lọc chặn công ty cũ): <strong>{blindCandidates.length}</strong></div>

                        {myInvitations.length > 0 && (
                            <div className="border-top pt-3">
                                <h6 className="fw-bold">Danh sách Lời mời Offer-First đồng bộ ({myInvitations.length}):</h6>
                                {myInvitations.map((inv) => (
                                    <div key={inv.id} className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Lời mời #{inv.id}</strong> • Khung lương cam kết: <span className="text-success fw-bold">{inv.offeredSalaryMin} – {inv.offeredSalaryMax} triệu VNĐ</span>
                                            <div className="small text-muted">{inv.pitchMessage}</div>
                                            <span className="badge bg-secondary">{inv.status}</span>
                                        </div>
                                        {inv.status === 'PENDING' && (
                                            <div className="d-flex gap-2">
                                                <button type="button" className="btn btn-sm btn-success" onClick={() => handleRespondInvitation(inv.id, 'ACCEPTED')}>
                                                    Chấp nhận & Mở Chat
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRespondInvitation(inv.id, 'DECLINED')}>
                                                    Từ chối
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'PROOF_SKILL' && (
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="fw-bold">Xác thực kỹ năng thực tế Đa ngành (GitHub / Portfolio / Chứng chỉ) & Skill Gap ATS</h5>
                        <div className="row g-2 my-2">
                            <div className="col-md-5">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="GitHub Username (cho ngành IT)"
                                    value={githubUsername}
                                    onChange={(e) => setGithubUsername(e.target.value)}
                                />
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="url"
                                    className="form-control form-control-sm"
                                    placeholder="Link Portfolio / Chứng chỉ (Sales, Marketing, Kế toán, Thiết kế...)"
                                    value={portfolioUrl}
                                    onChange={(e) => setPortfolioUrl(e.target.value)}
                                />
                            </div>
                            <div className="col-md-2">
                                <button type="button" className="btn btn-sm btn-primary w-100" onClick={handleSyncGithub}>
                                    Xác thực ngay
                                </button>
                            </div>
                        </div>
                        {githubReport && (
                            <div className="alert alert-success small mb-2 mt-2">
                                <strong>✓ {githubReport.verifiedLabel}:</strong> {githubReport.publicRepos} Public Repos • {githubReport.commitsLastYear} Commits/năm
                            </div>
                        )}
                        {skillGapReport && (
                            <div className="small mt-2">
                                <strong>Điểm tương thích ATS:</strong> <span className="badge bg-primary">{skillGapReport.atsScore}%</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiIndustryDifferentiatorHub;
