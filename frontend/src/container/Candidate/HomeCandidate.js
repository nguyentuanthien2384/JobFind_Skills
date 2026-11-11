import React, { useContext } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import ManageCvCandidate from './ManageCvCandidate';
import CandidateInfo from './CandidateInfo';
import ChangePassword from '../system/User/ChangePassword';
import LinkedAccounts from '../system/User/LinkedAccounts';
import SettingUser from './SettingUser';
import FavoriteJobs from './FavoriteJobs';
import FollowedCompanies from './FollowedCompanies';
import MyInterviews from './MyInterviews';
import AiAssistant from './AiAssistant';
import AiCvWorkspace from './AiCvWorkspace';
import CandidateDetailCv from './CandidateDetailCv';
import MultiIndustryDifferentiatorHub from './MultiIndustryDifferentiatorHub';
import Header from '../header/Header';
import SessionContext from '../../auth/SessionContext';
import { hasPermission, PERMISSIONS } from '../../auth/accessControl';
import { readJsonStorage } from '../../util/storage';
import { candidateAiEnabled, candidateInterviewsEnabled } from '../../service/candidateWorkspace';

const RequireCandidatePermission = ({ user, permission, children }) => {
    if (!hasPermission(user, permission)) {
        return <Navigate to="/candidate/info" replace />;
    }
    return children;
};

const HomeCandidate = () => {
    const sessionUser = useContext(SessionContext);
    const currentUser = sessionUser === undefined ? readJsonStorage('userData') : sessionUser;
    const canManageSelf = hasPermission(currentUser, PERMISSIONS.MANAGE_SELF_ACCOUNT);
    const canApplyToJob = hasPermission(currentUser, PERMISSIONS.APPLY_TO_JOB);
    const canSocialInteract = hasPermission(currentUser, PERMISSIONS.SOCIAL_INTERACT);
    const showInterviews = candidateInterviewsEnabled();
    const showAi = candidateAiEnabled();

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
                    <ul className="nav">
                        {canManageSelf && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/candidate/info" >
                                    <i className="far fa-user menu-icon"></i>
                                    <span className="menu-title">Thông tin cá nhân</span>
                                </Link>
                            </li>
                        )}
                        {canManageSelf && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/candidate/usersetting" >
                                    <i className="fa-solid fa-user-gear menu-icon"></i>
                                    <span className="menu-title">Cài đặt nâng cao & Blind</span>
                                </Link>
                            </li>
                        )}
                        {canApplyToJob && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/candidate/cv-post/" >
                                    <i className="fa-solid fa-file-lines menu-icon"></i>
                                    <span className="menu-title">Công việc đã nộp (Pizza)</span>
                                </Link>
                            </li>
                        )}
                        {canManageSelf && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/candidate/differentiator" >
                                    <i className="fas fa-bolt menu-icon" style={{ color: '#0d6efd' }}></i>
                                    <span className="menu-title">Đột phá Đa ngành & Offer</span>
                                </Link>
                            </li>
                        )}
                        {canSocialInteract && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/candidate/favorite-jobs" >
                                    <i className="far fa-heart menu-icon"></i>
                                    <span className="menu-title">Việc làm đã lưu</span>
                                </Link>
                            </li>
                        )}
                        {canSocialInteract && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/candidate/followed-companies" >
                                    <i className="far fa-building menu-icon"></i>
                                    <span className="menu-title">Công ty theo dõi</span>
                                </Link>
                            </li>
                        )}
                        {canApplyToJob && showInterviews && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/candidate/interviews" >
                                    <i className="far fa-calendar-check menu-icon"></i>
                                    <span className="menu-title">Lịch phỏng vấn</span>
                                </Link>
                            </li>
                        )}
                        {canManageSelf && showAi && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/candidate/ai-cv" >
                                    <i className="fas fa-file-signature menu-icon" style={{ color: '#6f42c1' }}></i>
                                    <span className="menu-title">CV & Thư ứng tuyển AI</span>
                                </Link>
                            </li>
                        )}
                        {canManageSelf && showAi && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/candidate/ai-assistant" >
                                    <i className="fas fa-robot menu-icon" style={{ color: '#6f42c1' }}></i>
                                    <span className="menu-title">Trợ lý nghề nghiệp AI</span>
                                </Link>
                            </li>
                        )}
                        {canManageSelf && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/candidate/changepassword/" >
                                    <i className="fa-solid fa-key menu-icon"></i>
                                    <span className="menu-title">Đổi mật khẩu</span>
                                </Link>
                            </li>
                        )}
                        {canManageSelf && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/candidate/linked-accounts" >
                                    <i className="fa-solid fa-link menu-icon"></i>
                                    <span className="menu-title">Tài khoản liên kết</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <Routes>
                            <Route index element={<Navigate to="/candidate/info" replace />} />
                            <Route
                                path="info"
                                element={
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.MANAGE_SELF_ACCOUNT}>
                                        <CandidateInfo />
                                    </RequireCandidatePermission>
                                }
                            />
                            <Route
                                path="usersetting"
                                element={
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.MANAGE_SELF_ACCOUNT}>
                                        <SettingUser />
                                    </RequireCandidatePermission>
                                }
                            />
                            <Route
                                path="changepassword"
                                element={
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.MANAGE_SELF_ACCOUNT}>
                                        <ChangePassword />
                                    </RequireCandidatePermission>
                                }
                            />
                            <Route
                                path="linked-accounts"
                                element={
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.MANAGE_SELF_ACCOUNT}>
                                        <LinkedAccounts />
                                    </RequireCandidatePermission>
                                }
                            />
                            <Route
                                path="cv-post"
                                element={
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.APPLY_TO_JOB}>
                                        <ManageCvCandidate />
                                    </RequireCandidatePermission>
                                }
                            />
                            <Route
                                path="differentiator"
                                element={
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.MANAGE_SELF_ACCOUNT}>
                                        <MultiIndustryDifferentiatorHub />
                                    </RequireCandidatePermission>
                                }
                            />
                            <Route
                                path="favorite-jobs"
                                element={
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.SOCIAL_INTERACT}>
                                        <FavoriteJobs />
                                    </RequireCandidatePermission>
                                }
                            />
                            <Route
                                path="followed-companies"
                                element={
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.SOCIAL_INTERACT}>
                                        <FollowedCompanies />
                                    </RequireCandidatePermission>
                                }
                            />
                            <Route
                                path="interviews"
                                element={showInterviews ? (
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.APPLY_TO_JOB}>
                                        <MyInterviews />
                                    </RequireCandidatePermission>
                                ) : <Navigate to="/candidate/info" replace />}
                            />
                            <Route
                                path="ai-cv"
                                element={showAi ? (
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.MANAGE_SELF_ACCOUNT}>
                                        <AiCvWorkspace />
                                    </RequireCandidatePermission>
                                ) : <Navigate to="/candidate/info" replace />}
                            />
                            <Route
                                path="ai-assistant"
                                element={showAi ? (
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.MANAGE_SELF_ACCOUNT}>
                                        <AiAssistant />
                                    </RequireCandidatePermission>
                                ) : <Navigate to="/candidate/info" replace />}
                            />
                            <Route
                                path="cv-detail/:id"
                                element={
                                    <RequireCandidatePermission user={currentUser} permission={PERMISSIONS.APPLY_TO_JOB}>
                                        <CandidateDetailCv />
                                    </RequireCandidatePermission>
                                }
                            />
                            <Route path="*" element={<Navigate to="/candidate/info" replace />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeCandidate
