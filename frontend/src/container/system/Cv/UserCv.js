import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailCvService } from '../../../service/cvService';
import {
    PIZZA_TRACKER_STAGES,
    STAGE_LABELS_VI,
    updateCvStageTrackerService,
    evaluateSituationalAnswerService
} from '../../../service/differentiatorService';
import { readJsonStorage } from '../../../util/storage';
import { SESSION_ENDED_EVENT } from '../../../auth/sessionExpiry';
import PdfPreviewButton from '../../../components/documents/PdfPreviewButton';
import { isPdfSource } from '../../../components/documents/documentSource';
import { toast } from 'react-toastify';
import './UserCv.css';

const UserCv = () => {
    const user = readJsonStorage('userData');
    const role = user?.roleCode, token = localStorage.getItem('token_user');
    const { id } = useParams();
    const navigate = useNavigate();
    const scope = JSON.stringify([id, user?.id, role, token]);
    const [state, setState] = useState(null), [refresh, setRefresh] = useState(0);
    const [ended, setEnded] = useState(false);
    const [selectedStage, setSelectedStage] = useState('HR_VIEWED');
    const [hrNote, setHrNote] = useState('');
    const [updatingStage, setUpdatingStage] = useState(false);
    const [reGradingAi, setReGradingAi] = useState(false);

    const data = state?.scope === scope && !ended ? state.data : null;
    const file = data?.file;
    const isRecruiterOrAdmin = ['COMPANY', 'EMPLOYER', 'ADMIN'].includes(role);

    useEffect(() => {
        const end = () => setEnded(true);
        const storage = event => { if (event.key === null || ['userData', 'token_user'].includes(event.key)) end(); };
        window.addEventListener(SESSION_ENDED_EVENT, end); window.addEventListener('storage', storage);
        return () => { window.removeEventListener(SESSION_ENDED_EVENT, end); window.removeEventListener('storage', storage); };
    }, []);

    useEffect(() => {
        let active = true;
        setState({ scope, loading: true });
        const load = async () => {
            try {
                if (!id || !role || ended) throw new Error('Bạn cần đăng nhập để xem hồ sơ.');
                const response = await getDetailCvService(id, role);
                if (!active || localStorage.getItem('token_user') !== token) return;
                if (response?.errCode !== 0 || response.httpStatus >= 400 || !response.data) {
                    throw new Error(response?.errMessage || 'Không tải được hồ sơ. Vui lòng thử lại.');
                }
                setState({ scope, loading: false, data: response.data });
                if (response.data.applicationStage) {
                    setSelectedStage(response.data.applicationStage);
                }
            } catch (error) {
                if (active) setState({ scope, loading: false, error: error.message || 'Không tải được hồ sơ.' });
            }
        };
        load();
        return () => { active = false; };
    }, [id, role, token, scope, ended, refresh]);

    const handleUpdateStage = async () => {
        if (!data?.id || updatingStage) return;
        setUpdatingStage(true);
        try {
            const res = await updateCvStageTrackerService({
                cvId: data.id,
                nextStage: selectedStage,
                hrNote
            });
            if (res?.errCode === 0) {
                toast.success(res.errMessage || `Đã cập nhật trạng thái Pizza-Tracker sang ${STAGE_LABELS_VI[selectedStage] || selectedStage}!`);
                setRefresh(v => v + 1);
            } else {
                toast.error(res?.errMessage || 'Không thể cập nhật tiến trình CV.');
            }
        } catch {
            toast.error('Lỗi kết nối khi cập nhật tiến trình CV.');
        } finally {
            setUpdatingStage(false);
        }
    };

    const handleReEvaluateMicroTest = async () => {
        if (!data?.id || !data?.microTestAnswer || reGradingAi) return;
        setReGradingAi(true);
        try {
            const res = await evaluateSituationalAnswerService({
                cvId: data.id,
                postId: data.postId,
                microTestAnswer: data.microTestAnswer
            });
            if (res?.errCode === 0) {
                toast.success(`Đã chấm điểm AI: ${res.data?.aiSituationalScore}/10`);
                setRefresh(v => v + 1);
            } else {
                toast.error(res?.errMessage || 'Không thể chấm lại bài Micro-Test.');
            }
        } catch {
            toast.error('Lỗi kết nối khi chấm bài Micro-Test.');
        } finally {
            setReGradingAi(false);
        }
    };

    const hasPdfSource = isPdfSource(file);
    let parsedSummary = [];
    if (data?.aiEvaluationSummary) {
        try {
            const parsed = JSON.parse(data.aiEvaluationSummary);
            parsedSummary = Array.isArray(parsed) ? parsed : [String(data.aiEvaluationSummary)];
        } catch {
            parsedSummary = String(data.aiEvaluationSummary).split('\n').filter(Boolean);
        }
    }

    return <div className="col-12 grid-margin submitted-cv-view"><div className="card"><div className="card-body">
        <button type="button" className="cv-back" onClick={() => navigate(-1)}>Quay lại</button>
        {ended ? <p role="alert">Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại để xem hồ sơ.</p>
            : state?.scope !== scope || state.loading ? <p role="status">Đang tải hồ sơ…</p>
                : state.error ? <div role="alert"><p>{state.error}</p><button type="button" onClick={() => setRefresh(value => value + 1)}>Tải lại hồ sơ</button></div>
                    : data && <>
                        <h4 className="card-title">Giới thiệu bản thân</h4>
                        <blockquote className="blockquote blockquote-primary">
                            <p>{data.description || 'Hồ sơ không có lời giới thiệu.'}</p>
                            <footer className="blockquote-footer"><cite>{[data.userCvData?.firstName, data.userCvData?.lastName].filter(Boolean).join(' ') || 'Thông tin ứng viên không còn khả dụng'}</cite></footer>
                        </blockquote>

                        {/* Kết quả Bài kiểm tra Tình huống 3 phút (Micro-Test AI) */}
                        {(data.microTestAnswer || data.aiSituationalScore != null) && (
                            <div className="card mb-4" style={{ border: '1px solid #a7f3d0', background: '#f0fdf4' }}>
                                <div className="card-body">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                        <h5 className="mb-1" style={{ color: '#065f46', fontWeight: 700 }}>
                                            🎯 Kết quả Bài kiểm tra Tình huống 3 phút (AI Pre-Screening)
                                        </h5>
                                        {data.aiSituationalScore != null && (
                                            <span style={{ background: '#059669', color: '#fff', padding: '4px 12px', borderRadius: '999px', fontWeight: 700, fontSize: '14px' }}>
                                                Điểm AI: {data.aiSituationalScore} / 10
                                            </span>
                                        )}
                                    </div>
                                    {data.microTestAnswer && (
                                        <div className="mt-2 p-3 bg-white rounded border">
                                            <strong style={{ fontSize: '13px', color: '#334155' }}>Câu trả lời của ứng viên:</strong>
                                            <p className="mb-0 mt-1" style={{ whiteSpace: 'pre-wrap', fontSize: '13.5px', color: '#1e293b' }}>
                                                {data.microTestAnswer}
                                            </p>
                                        </div>
                                    )}
                                    {parsedSummary.length > 0 && (
                                        <div className="mt-3">
                                            <strong style={{ fontSize: '13px', color: '#065f46' }}>Nhận xét 3 gạch đầu dòng từ AI:</strong>
                                            <ul className="mb-0 mt-1" style={{ fontSize: '13px', color: '#064e3b' }}>
                                                {parsedSummary.map((line, idx) => (
                                                    <li key={idx}>{line}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {isRecruiterOrAdmin && data.microTestAnswer && (
                                        <div className="mt-2">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-success"
                                                disabled={reGradingAi}
                                                onClick={handleReEvaluateMicroTest}
                                            >
                                                {reGradingAi ? 'Đang chấm điểm AI…' : 'Chấm lại bằng AI'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Bảng điều khiển Tiến trình Pizza-Tracker & SLA 72h */}
                        <div className="card mb-4" style={{ border: '1px solid #c7d2fe', background: '#f8fafc' }}>
                            <div className="card-body">
                                <h5 className="mb-2" style={{ color: '#312e81', fontWeight: 700 }}>
                                    🍕 Tiến trình Tuyển dụng Pizza-Tracker (7 bước) & Phản hồi SLA 72h
                                </h5>
                                <p className="mb-2" style={{ fontSize: '13px', color: '#475569' }}>
                                    Trạng thái hiện tại: <strong style={{ color: '#4B49AC' }}>{STAGE_LABELS_VI[data.applicationStage] || data.applicationStage || 'Đã nộp CV'}</strong>
                                    {data.hrViewedAt ? ` • Mở xem lúc: ${new Date(data.hrViewedAt).toLocaleString('vi-VN')}` : ''}
                                </p>
                                {isRecruiterOrAdmin && (
                                    <div className="row align-items-end">
                                        <div className="col-md-4 mb-2">
                                            <label className="form-label" style={{ fontSize: '12px', fontWeight: 600 }}>Chuyển bước tuyển dụng</label>
                                            <select
                                                className="form-control"
                                                value={selectedStage}
                                                onChange={e => setSelectedStage(e.target.value)}
                                            >
                                                {PIZZA_TRACKER_STAGES.map(stageKey => (
                                                    <option key={stageKey} value={stageKey}>
                                                        {STAGE_LABELS_VI[stageKey] || stageKey}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-5 mb-2">
                                            <label className="form-label" style={{ fontSize: '12px', fontWeight: 600 }}>
                                                Ghi chú của HR (Nếu chọn Từ chối, AI sẽ tự soạn thư góp ý lịch sự + gợi ý 3 việc làm)
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="VD: Cần thêm kinh nghiệm thực chiến về KPI ngành..."
                                                value={hrNote}
                                                onChange={e => setHrNote(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-3 mb-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary w-100"
                                                disabled={updatingStage}
                                                onClick={handleUpdateStage}
                                            >
                                                {updatingStage ? 'Đang cập nhật…' : 'Cập nhật & Báo ứng viên'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {data.aiFeedbackForCandidate && (
                                    <div className="mt-3 p-3 rounded" style={{ background: '#fffbeb', border: '1px solid #fde68a', fontSize: '13px', color: '#78350f', whiteSpace: 'pre-wrap' }}>
                                        <strong>💡 Thư phản hồi xây dựng từ AI đã gửi cho ứng viên:</strong>
                                        <div className="mt-1">{data.aiFeedbackForCandidate}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <h4 className="card-title">FILE CV</h4>
                        {hasPdfSource ? <>
                            <div className="cv-file-actions">
                                <PdfPreviewButton key={scope} source={file} fileName={`CV-${id}.pdf`} label="Xem CV đã nộp" />
                            </div>
                            <p>Đây là bản CV đã nộp khi ứng tuyển. Bạn có thể xem từng trang, phóng to và tải xuống trong trình xem PDF.</p>
                        </> : <p>Hồ sơ này không còn tệp PDF hợp lệ để xem.</p>}
                    </>}
    </div></div></div>;
};
export default UserCv;
