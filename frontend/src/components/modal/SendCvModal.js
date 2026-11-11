import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalFooter, ModalBody, Button } from 'reactstrap';
import { createNewCv } from '../../service/cvService';
import { notifyRewardWalletUpdated } from '../../service/rewardPaymentService';
import { applicationPdf, MAX_APPLICATION_PDF_BYTES, APPLICATION_PDF_TOO_LARGE, APPLICATION_PDF_INVALID } from '../../service/applicationPdf';
import CommonUtils from '../../util/CommonUtils';
import { readJsonStorage } from '../../util/storage';
import SessionContext from '../../auth/SessionContext';
import { SESSION_ENDED_EVENT } from '../../auth/sessionExpiry';
import PdfPreviewButton from '../documents/PdfPreviewButton';
import './modal.css';
import './SendCvModal.css';

const fileSizeLabel = size => size < 1024 * 1024 ? `${Math.max(1, Math.ceil(size / 1024))} KiB` : `${(size / (1024 * 1024)).toFixed(2)} MiB`;

function ApplicationForm({
    user,
    token,
    postId,
    jobTitle,
    hasMicroTest = false,
    microTestPrompt = '',
    microTestTimeLimit = 180,
    onHide,
    onSubmitted
}) {
    const [description, setDescription] = useState('');
    const [microTestAnswer, setMicroTestAnswer] = useState('');
    const [remainingSeconds, setRemainingSeconds] = useState(() => Number(microTestTimeLimit) > 0 ? Number(microTestTimeLimit) : 180);
    const [selectedFile, setFile] = useState(''), [fileName, setFileName] = useState('CV-ung-tuyen.pdf');
    const [fileSize, setFileSize] = useState(0), [fileError, setFileError] = useState('');
    const [reading, setReading] = useState(false), [isLoading, setIsLoading] = useState(false), [feedback, setFeedback] = useState('');
    const mounted = useRef(false), sending = useRef(false), fileVersion = useRef(0);
    const initialLimit = Number(microTestTimeLimit) > 0 ? Number(microTestTimeLimit) : 180;
    const current = () => mounted.current && localStorage.getItem('token_user') === token
        && Number(readJsonStorage('userData')?.id) === Number(user.id)
        && readJsonStorage('userData')?.roleCode === 'CANDIDATE';

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; fileVersion.current += 1; };
    }, []);

    // Đồng hồ đếm ngược 180 giây cho Bài kiểm tra tình huống ngắn (Micro-Assessment)
    useEffect(() => {
        if (!hasMicroTest) return undefined;
        const interval = window.setInterval(() => {
            setRemainingSeconds(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => window.clearInterval(interval);
    }, [hasMicroTest]);

    const chooseFile = async event => {
        if (sending.current) return;
        const input = event.target, selected = input.files?.[0], version = ++fileVersion.current;
        setFile(''); setFileName('CV-ung-tuyen.pdf'); setFileSize(0); setFileError(''); setFeedback('');
        const reject = message => { input.value = ''; setFileError(message); toast.error(message); };
        if (!selected) { setReading(false); return; }
        if (selected.size > MAX_APPLICATION_PDF_BYTES) { setReading(false); reject(APPLICATION_PDF_TOO_LARGE); return; }
        if (!/\.pdf$/i.test(selected.name) || !selected.size) { setReading(false); reject(APPLICATION_PDF_INVALID); return; }
        setReading(true);
        try {
            const value = applicationPdf(await CommonUtils.getBase64(selected));
            if (current() && version === fileVersion.current) { setFile(value.file); setFileSize(value.size); setFileName(selected.name); }
        } catch (failure) { if (current() && version === fileVersion.current) reject(failure.message || 'Không đọc được tệp PDF. Vui lòng chọn lại.'); }
        finally { if (current() && version === fileVersion.current) setReading(false); }
    };
    const submit = async () => {
        if (sending.current || reading || !selectedFile || !current()) return;
        if (!description.trim() || Array.from(description).length > 255) { toast.error('Nhập lời giới thiệu từ 1 đến 255 ký tự.'); return; }
        if (hasMicroTest && !microTestAnswer.trim()) {
            toast.error('Vui lòng nhập phương án xử lý cho câu hỏi tình huống ngắn của nhà tuyển dụng.');
            return;
        }
        try { applicationPdf(selectedFile); } catch (failure) { toast.error(failure.message); return; }
        sending.current = true; setIsLoading(true); setFeedback('');
        const payload = {
            userId: user.id,
            file: selectedFile,
            postId,
            description,
            ...(microTestAnswer.trim() ? {
                microTestAnswer: microTestAnswer.trim(),
                timeSpentSeconds: Math.max(1, initialLimit - remainingSeconds)
            } : {})
        };
        let response;
        try { response = await createNewCv(payload); } catch { response = null; }
        if (!current()) return;
        sending.current = false; setIsLoading(false);
        if (response?.errCode === 0 && !(response.httpStatus >= 400)) {
            notifyRewardWalletUpdated({ submittedPostId: postId });
            if (response.aiSituationalScore) {
                toast.success(`Đã gửi CV & chấm điểm tình huống AI: ${response.aiSituationalScore}/10!`);
            } else {
                toast.success('Đã gửi thành công');
            }
            onSubmitted?.();
            onHide();
            return;
        }
        const message = response?.errCode === 5 ? 'Bạn đã ứng tuyển tin này. Hãy kiểm tra CV trong Công việc đã nộp.'
            : !response || response.errCode === -1 || response.httpStatus >= 500
                ? 'Chưa xác nhận được việc nộp hồ sơ. Kiểm tra Công việc đã nộp trước khi gửi lại.' : response.errMessage || 'Gửi thất bại';
        setFeedback(message); toast.error(message);
    };

    const formatTimer = (sec) => {
        const m = String(Math.floor(sec / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    return <Modal isOpen className="booking-modal-container send-cv-modal" size="lg" centered scrollable aria-labelledby="send-cv-title">
        <ModalBody>
            <h2 id="send-cv-title">NỘP CV CỦA BẠN CHO NHÀ TUYỂN DỤNG</h2>
            <p>Ứng tuyển: <strong>{jobTitle || `Công việc #${postId}`}</strong></p>
            <fieldset disabled={isLoading}>
                <label htmlFor="application-introduction">Lời giới thiệu</label>
                <textarea id="application-introduction" placeholder="Giới thiệu sơ lược về bản thân để tăng sự yêu thích đối với nhà tuyển dụng"
                    name="description" maxLength={255} value={description} rows="3" onChange={event => setDescription(event.target.value)} />
                <p>Lời giới thiệu tối đa 255 ký tự. Tệp CV đã nộp được giữ riêng với CV đang lưu trong hồ sơ.</p>

                {/* TÍCH HỢP BÀI KIỂM TRA TÌNH HUỐNG NGẮN (MICRO-ASSESSMENT 3 PHÚT) */}
                {hasMicroTest && (
                    <section
                        aria-label="Bài kiểm tra tình huống ngắn"
                        style={{
                            marginTop: 12,
                            marginBottom: 14,
                            padding: 14,
                            borderRadius: 10,
                            background: '#eff6ff',
                            border: '1px solid #bfdbfe'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <strong style={{ color: '#1e40af' }}>🎯 Tình huống thực tế bắt buộc (Chống rải CV hàng loạt)</strong>
                            <span
                                style={{
                                    padding: '2px 10px',
                                    borderRadius: 999,
                                    fontWeight: 700,
                                    fontSize: 13,
                                    background: remainingSeconds <= 30 ? '#fee2e2' : '#dbeafe',
                                    color: remainingSeconds <= 30 ? '#b91c1c' : '#1d4ed8'
                                }}
                            >
                                ⏱ Thời gian: {formatTimer(remainingSeconds)}
                            </span>
                        </div>
                        <p style={{ fontSize: 13, color: '#1e293b', marginBottom: 8 }}>
                            <strong>Đề bài của HR:</strong> {microTestPrompt || 'Hãy trình bày ngắn gọn cách bạn xử lý một tình huống khó khăn nhất trong vị trí ứng tuyển này.'}
                        </p>
                        <textarea
                            id="application-micro-test-answer"
                            rows="4"
                            value={microTestAnswer}
                            onChange={e => setMicroTestAnswer(e.target.value)}
                            placeholder="Nhập phương án giải quyết tình huống thực tế của bạn (AI sẽ chấm điểm 1-10 và đính kèm tóm tắt 3 ý cho HR)..."
                            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #93c5fd', fontSize: 13 }}
                        />
                    </section>
                )}

                <div className="cv-file-picker">
                    <label htmlFor="application-cv-file">Chọn tệp CV</label>
                    <input id="application-cv-file" type="file" accept="application/pdf,.pdf" onChange={chooseFile}
                        aria-describedby={`application-cv-hint${fileError ? ' application-cv-error' : ''}`} aria-invalid={Boolean(fileError)} />
                    <p id="application-cv-hint">Định dạng PDF, tối đa 2 MiB. Bạn có thể xem trước CV trước khi gửi hồ sơ.</p>
                    {fileError && <p id="application-cv-error" className="cv-file-error" role="alert">{fileError}</p>}
                </div>
                {reading && <p role="status">Đang đọc tệp CV…</p>}
                {selectedFile && <section className="cv-selected-file" aria-label="CV sẽ gửi">
                    <div><p className="cv-selected-file-label">CV sẽ gửi cùng hồ sơ</p>
                        <strong>{fileName}</strong>
                        <p>{fileSizeLabel(fileSize)} · PDF</p>
                    </div>
                    <PdfPreviewButton source={selectedFile} fileName={fileName} label="Xem trước CV" disabled={isLoading} />
                </section>}
            </fieldset>
            {feedback && <p role="alert">{feedback} <a href="/candidate/cv-post">Xem Công việc đã nộp</a></p>}
            {isLoading && <p role="status">Đang gửi hồ sơ & chấm điểm tình huống AI…</p>}
        </ModalBody>
        <ModalFooter>
            <Button disabled={isLoading || reading || !selectedFile} onClick={submit}>Gửi hồ sơ</Button>
            <Button onClick={onHide}>Hủy</Button>
        </ModalFooter>
    </Modal>;
}

export default function SendCvModal(props) {
    const context = useContext(SessionContext), user = context === undefined ? readJsonStorage('userData') : context;
    const [ended, setEnded] = useState(false);
    useEffect(() => {
        const end = () => setEnded(true), storage = event => { if (event.key === null || ['token_user', 'userData'].includes(event.key)) end(); };
        window.addEventListener(SESSION_ENDED_EVENT, end); window.addEventListener('storage', storage);
        return () => { window.removeEventListener(SESSION_ENDED_EVENT, end); window.removeEventListener('storage', storage); };
    }, []);
    const token = localStorage.getItem('token_user');
    if (!props.isOpen || ended || !token || !user?.id || user.roleCode !== 'CANDIDATE') return null;
    return <ApplicationForm key={`${user.id}:${token}:${props.postId}`} {...props} user={user} token={token} />;
}
