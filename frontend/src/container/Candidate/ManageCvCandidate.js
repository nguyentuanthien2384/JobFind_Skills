import React, { useContext, useEffect, useState } from 'react';
import { getAllListCvByUserIdService } from '../../service/cvService';
import { getMyApplications } from '../../service/applicationService';
import { applicationProgressEnabled, progressByLegacyCv, applicationStage } from '../../service/applicationProgress';
import {
    PIZZA_TRACKER_STAGES,
    STAGE_LABELS_VI,
    getMyJobInvitationsService,
    respondToJobInvitationService
} from '../../service/differentiatorService';
import { PAGINATION } from '../../util/constant';
import { readJsonStorage } from '../../util/storage';
import SessionContext from '../../auth/SessionContext';
import { SESSION_ENDED_EVENT } from '../../auth/sessionExpiry';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import './ApplicationHistory.css';
import useListQuery, { clampListPage } from '../../util/useListQuery';
import StableList from '../../components/common/StableList';

function resolvePizzaStage(cv) {
    if (cv?.applicationStage && PIZZA_TRACKER_STAGES.includes(cv.applicationStage)) {
        return cv.applicationStage;
    }
    if (Number(cv?.isChecked) === 1) return 'HR_VIEWED';
    return 'SUBMITTED';
}

function PizzaTrackerBar({ cv }) {
    const currentStage = resolvePizzaStage(cv);
    const isRejected = currentStage === 'REJECTED';
    const activeStages = ['SUBMITTED', 'AI_SCREENED', 'HR_VIEWED', 'INTERVIEW_INVITED', 'INTERVIEWED', 'OFFERED'];
    const currentIndex = activeStages.indexOf(currentStage);

    return (
        <div style={{ minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', marginBottom: '6px' }}>
                {activeStages.map((stageKey, idx) => {
                    const reached = !isRejected && currentIndex >= idx;
                    const isCurrent = !isRejected && currentStage === stageKey;
                    return (
                        <span
                            key={stageKey}
                            style={{
                                fontSize: '11px',
                                padding: '2px 7px',
                                borderRadius: '999px',
                                fontWeight: isCurrent ? 700 : 500,
                                background: isCurrent ? '#4B49AC' : reached ? '#e0e7ff' : '#f1f5f9',
                                color: isCurrent ? '#fff' : reached ? '#3730a3' : '#64748b',
                                border: isCurrent ? '1px solid #312e81' : '1px solid transparent'
                            }}
                        >
                            {idx + 1}. {STAGE_LABELS_VI[stageKey] || stageKey}
                        </span>
                    );
                })}
                {isRejected && (
                    <span
                        style={{
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            fontWeight: 700,
                            background: '#fee2e2',
                            color: '#991b1b',
                            border: '1px solid #fca5a5'
                        }}
                    >
                        {STAGE_LABELS_VI.REJECTED}
                    </span>
                )}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: '12px', color: '#475569' }}>
                {cv.aiSituationalScore != null && (
                    <span style={{ background: '#ecfdf5', color: '#065f46', padding: '1px 7px', borderRadius: '6px', fontWeight: 600 }}>
                        🎯 Điểm Micro-Test AI: {cv.aiSituationalScore}/10
                    </span>
                )}
                {cv.hrViewedAt && (
                    <span style={{ color: '#0369a1' }}>
                        👁️ HR mở CV: {moment(cv.hrViewedAt).format('DD/MM HH:mm')}
                    </span>
                )}
                {cv.postCvData?.companyPostData?.avgResponseHours != null && (
                    <span style={{ color: '#047857' }}>
                        ⏱️ SLA công ty: ~{cv.postCvData.companyPostData.avgResponseHours}h ({cv.postCvData.companyPostData.responseRate ?? 100}%)
                    </span>
                )}
            </div>
            {cv.aiFeedbackForCandidate && (
                <details style={{ marginTop: '6px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#92400e' }}>
                        💡 Thư góp ý cải thiện lộ trình nghề nghiệp từ AI Coach
                    </summary>
                    <div style={{ whiteSpace: 'pre-wrap', marginTop: '6px', color: '#78350f' }}>
                        {cv.aiFeedbackForCandidate}
                    </div>
                </details>
            )}
        </div>
    );
}

function History({ user, token }) {
    const [rows, setRows] = useState([]), [count, setCount] = useState(0);
    const [{ page }, setQuery] = useListQuery({ page: 0 });
    const [loading, setLoading] = useState(true), [error, setError] = useState(''), [refresh, setRefresh] = useState(0);
    const [progress, setProgress] = useState(new Map()), [progressError, setProgressError] = useState(''), [progressLoading, setProgressLoading] = useState(false);
    const [settledRequest, setSettledRequest] = useState(''), [rowsPage, setRowsPage] = useState(page);
    const [invitations, setInvitations] = useState([]);
    const [invitationsLoading, setInvitationsLoading] = useState(false);
    const [respondingId, setRespondingId] = useState(null);

    const requestKey = JSON.stringify([user.id, token, page, refresh]);
    const busy = loading || settledRequest !== requestKey;
    const enabled = applicationProgressEnabled() && user.roleCode === 'CANDIDATE';

    useEffect(() => {
        let active = true;
        const current = () => active && localStorage.getItem('token_user') === token;
        setLoading(true); setError('');
        (async () => {
            try {
                const response = await getAllListCvByUserIdService({ userId: user.id, limit: PAGINATION.pagerow, offset: page * PAGINATION.pagerow });
                if (!current()) return;
                if (response?.errCode !== 0 || response.httpStatus >= 400 || !Array.isArray(response.data)
                    || !Number.isSafeInteger(response.count) || response.count < 0
                    || response.data.some(row => !row || !Number.isSafeInteger(Number(row.id)) || Number(row.id) <= 0 || (row.userId != null && Number(row.userId) !== Number(user.id)))) throw Error('Không tải được danh sách hồ sơ đã nộp.');
                const validPage = clampListPage(page, response.count, PAGINATION.pagerow);
                if (validPage !== page) { setQuery({ page: validPage }, { replace: true }); return; }
                setRows(response.data); setRowsPage(page); setCount(response.count);
            } catch (failure) { if (current()) { setError('Không tải được danh sách hồ sơ đã nộp.'); setRows([]); } }
            finally { if (current()) { setLoading(false); setSettledRequest(requestKey); } }
        })();
        return () => { active = false; };
    }, [user.id, token, page, refresh, requestKey, setQuery]);

    useEffect(() => {
        let active = true;
        setInvitationsLoading(true);
        (async () => {
            try {
                const res = await getMyJobInvitationsService();
                if (active && res?.errCode === 0 && Array.isArray(res.data)) {
                    setInvitations(res.data);
                }
            } catch {
                // Non-blocking if invitations endpoint is unavailable
            } finally {
                if (active) setInvitationsLoading(false);
            }
        })();
        return () => { active = false; };
    }, [user.id, token, refresh]);

    useEffect(() => {
        let active = true;
        setProgress(new Map()); setProgressError('');
        if (enabled) {
            setProgressLoading(true);
            (async () => {
                try { const data = progressByLegacyCv(await getMyApplications()); if (active && localStorage.getItem('token_user') === token) setProgress(data); }
                catch (failure) { if (active) setProgressError(failure.message || 'Không tải được tiến trình tuyển dụng.'); }
                finally { if (active) setProgressLoading(false); }
            })();
        }
        return () => { active = false; };
    }, [enabled, token, refresh]);

    const handleRespondInvitation = async (invitationId, action) => {
        setRespondingId(invitationId);
        try {
            const res = await respondToJobInvitationService(invitationId, { action });
            if (res?.errCode === 0) {
                toast.success(res.errMessage || (action === 'ACCEPTED' ? 'Đã chấp nhận lời mời và mở khóa liên hệ 2 chiều!' : 'Đã từ chối lời mời.'));
                setRefresh(v => v + 1);
            } else {
                toast.error(res?.errMessage || 'Không thể phản hồi lời mời.');
            }
        } catch {
            toast.error('Lỗi kết nối khi phản hồi lời mời.');
        } finally {
            setRespondingId(null);
        }
    };

    return <div className="col-12 grid-margin application-history">
        {/* Hộp thư Lời mời săn đầu người Offer-First Bidding */}
        <div className="card mb-4" style={{ border: '1px solid #c7d2fe', background: '#f8fafc' }}>
            <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                        <h4 className="card-title mb-1" style={{ color: '#312e81' }}>
                            ⚡ Hộp thư Lời mời Săn đầu người (Offer-First Bidding)
                        </h4>
                        <p className="text-muted mb-2" style={{ fontSize: '13px' }}>
                            Nhà tuyển dụng gửi lời mời kèm mức lương cam kết. Thông tin cá nhân của bạn chỉ mở khóa khi bạn bấm <b>Đồng ý</b>.
                        </p>
                    </div>
                    <Link to="/candidate/differentiator" className="btn btn-sm btn-outline-primary">
                        Mở Trung tâm AI & Đa ngành →
                    </Link>
                </div>
                {invitationsLoading ? (
                    <p style={{ fontSize: '13px', color: '#64748b' }}>Đang tải lời mời Offer-First…</p>
                ) : invitations.length === 0 ? (
                    <p style={{ fontSize: '13px', color: '#64748b', marginBottom: 0 }}>
                        Chưa có lời mời Offer-First nào. Bạn có thể bật <b>Hồ sơ Ẩn danh (Blind Profile)</b> trong mục <Link to="/candidate/usersetting">Cài đặt nâng cao</Link> để nhận lời mời đấu giá lương từ HR.
                    </p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-sm table-bordered bg-white mb-0">
                            <thead>
                                <tr>
                                    <th>Mã lời mời</th>
                                    <th>Mức lương cam kết (VNĐ)</th>
                                    <th>Thông điệp từ HR</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invitations.map(inv => (
                                    <tr key={inv.id}>
                                        <td><strong>#{inv.id}</strong> (Công ty #{inv.companyId})</td>
                                        <td style={{ color: '#047857', fontWeight: 700 }}>
                                            {Number(inv.offeredSalaryMin || 0).toLocaleString('vi-VN')} - {Number(inv.offeredSalaryMax || 0).toLocaleString('vi-VN')} đ
                                        </td>
                                        <td>{inv.message || 'Mời bạn tham gia phỏng vấn vị trí phù hợp.'}</td>
                                        <td>
                                            <span style={{
                                                padding: '2px 8px',
                                                borderRadius: '999px',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                background: inv.status === 'ACCEPTED' ? '#dcfce7' : inv.status === 'REJECTED' ? '#fee2e2' : '#fef3c7',
                                                color: inv.status === 'ACCEPTED' ? '#166534' : inv.status === 'REJECTED' ? '#991b1b' : '#92400e'
                                            }}>
                                                {inv.status === 'ACCEPTED' ? '✓ Đã chấp nhận (Đã mở khóa 2 chiều)' : inv.status === 'REJECTED' ? 'Đã từ chối' : '⏳ Chờ phản hồi'}
                                            </span>
                                        </td>
                                        <td>
                                            {inv.status === 'PENDING' ? (
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-success"
                                                        disabled={respondingId === inv.id}
                                                        onClick={() => handleRespondInvitation(inv.id, 'ACCEPTED')}
                                                    >
                                                        Đồng ý & Mở khóa
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        disabled={respondingId === inv.id}
                                                        onClick={() => handleRespondInvitation(inv.id, 'REJECTED')}
                                                    >
                                                        Từ chối
                                                    </button>
                                                </div>
                                            ) : (
                                                <small className="text-muted">Đã xử lý</small>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>

        <div className="card"><div className="card-body">
            <h4 className="card-title">Danh sách Công Việc Đã Nộp & Pizza-Tracker Realtime</h4>
            <p><Link to="/candidate/interviews">Xem lịch phỏng vấn của tôi</Link></p>
            <button type="button" className="history-refresh" disabled={busy || progressLoading} onClick={() => setRefresh(value => value + 1)}>Tải lại hồ sơ</button>
            {enabled && <p>Tiến trình do nhà tuyển dụng cập nhật và có thể hiển thị chậm. “Đã xem” là trạng thái đọc CV, không phải quyết định tuyển dụng.</p>}
            {enabled && progressError && <p role="alert">{progressError} Hồ sơ đã nộp vẫn được giữ nguyên; dùng Tải lại hồ sơ để kiểm tra lại.</p>}
            <StableList busy={busy} resetKey={user.id} label="Đang tải hồ sơ đã nộp…">
                {error && <p role="alert">{error}</p>}
                {!busy && !error && rows.length === 0 && <p>Chưa có hồ sơ trên trang này.</p>}
                <div className="table-responsive pt-2"><table className="table table-bordered"><thead><tr>
                    {['STT', 'Công việc', 'Thời gian nộp', 'Trạng thái đọc', 'Pizza-Tracker (7 bước & SLA 72h)', ...(enabled ? ['Tiến trình tuyển dụng'] : []), 'Thao tác'].map(label => <th key={label}>{label}</th>)}
                </tr></thead><tbody>{rows.map((cv, index) => {
                    const post = cv.postCvData, detail = post?.postDetailData;
                    return <tr key={cv.id}><td data-label="STT">{index + 1 + rowsPage * PAGINATION.pagerow}</td>
                        <td data-label="Công việc"><strong>{detail?.name || 'Tin tuyển dụng không còn thông tin'}</strong><small>
                            {[detail?.jobTypePostData?.value, detail?.jobLevelPostData?.value, detail?.provincePostData?.value].filter(Boolean).join(' · ') || 'Chưa có thông tin phân loại'}</small></td>
                        <td data-label="Thời gian nộp">{cv.createdAt && moment(cv.createdAt).isValid() ? moment(cv.createdAt).format('DD-MM-YYYY HH:mm:ss') : 'Chưa xác định'}</td>
                        <td data-label="Trạng thái đọc">{Number(cv.isChecked) === 0 ? 'Chưa xem' : Number(cv.isChecked) === 1 ? 'Đã xem' : 'Chưa xác định'}</td>
                        <td data-label="Pizza-Tracker">
                            <PizzaTrackerBar cv={cv} />
                        </td>
                        {enabled && <td data-label="Tiến trình tuyển dụng">{progressLoading ? 'Đang tải tiến trình…' : progressError ? 'Chưa tải được tiến trình' : applicationStage(cv, progress)}</td>}
                        <td data-label="Thao tác">{post?.id && <><Link style={{ color: '#4B49AC' }} to={`/detail-job/${post.id}/`}>Xem công việc</Link>{' · '}</>}
                            <Link style={{ color: '#4B49AC' }} to={`/candidate/cv-detail/${cv.id}`}>Xem CV đã nộp</Link></td></tr>;
                })}</tbody></table></div>
            </StableList>
            <ReactPaginate forcePage={page} pageCount={Math.max(page + 1, Math.ceil(count / PAGINATION.pagerow))} previousLabel="Quay lại" nextLabel="Tiếp" breakLabel="…"
                containerClassName="pagination justify-content-center pb-3" pageClassName="page-item" pageLinkClassName="page-link" previousClassName="page-item" previousLinkClassName="page-link"
                nextClassName="page-item" nextLinkClassName="page-link" activeClassName="active" onPageChange={value => setQuery({ page: value.selected })} />
        </div></div>
    </div>;
}
export default function ManageCvCandidate() {
    const context = useContext(SessionContext), user = context === undefined ? readJsonStorage('userData') : context;
    const [ended, setEnded] = useState(false);
    useEffect(() => {
        const end = () => setEnded(true), storage = event => { if (event.key === null || ['token_user', 'userData'].includes(event.key)) end(); };
        window.addEventListener(SESSION_ENDED_EVENT, end); window.addEventListener('storage', storage);
        return () => { window.removeEventListener(SESSION_ENDED_EVENT, end); window.removeEventListener('storage', storage); };
    }, []);
    const token = localStorage.getItem('token_user');
    if (ended || !token || !user?.id || !['CANDIDATE', 'ADMIN'].includes(user.roleCode)) return <p role="alert">Đăng nhập bằng tài khoản ứng viên để xem hồ sơ đã nộp.</p>;
    return <History key={`${user.id}:${token}`} user={user} token={token} />;
}
