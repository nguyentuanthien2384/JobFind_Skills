import React, { useContext } from 'react'
import Header from './Header';
import Menu from './Menu';
import Home from './Home';
import Footer from './Footer';
import ManageUser from './User/ManageUser';
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import AddUser from './User/AddUser';
import UserInfo from './User/UserInfo';
import ChangePassword from './User/ChangePassword';
import LinkedAccounts from './User/LinkedAccounts';
import AddCompany from './Company/AddCompany';
import ManageJobType from './JobType/ManageJobType';
import AddJobType from './JobType/AddJobType';
import ManageJobLevel from './JobLevel/ManageJobLevel';
import AddJobLevel from './JobLevel/AddJobLevel';
import ManageWorkType from './WorkType/ManageWorkType';
import AddWorkType from './WorkType/AddWorkType';
import ManageSalaryType from './SalaryType/ManageSalaryType';
import AddSalaryType from './SalaryType/AddSalaryType';
import ManageExpType from './ExpType/ManageExpType';
import AddExpType from './ExpType/AddExpType';
import ManageCompany from './Company/ManageCompany';
import AddPost from './Post/AddPost';
import ManagePost from './Post/ManagePost';
import ManageCv from './Cv/ManageCv';
import FilterCv from './Cv/FilterCv';
import UserCv from './Cv/UserCv';
import BuyPost from './Post/BuyPost';
import PaymentSuccess from './Post/PaymentSuccess';
import BuyCv from './Cv/BuyCv';
import PaymentSuccessCv from './Cv/PaymentSuccessCv';
import HistoryTradePost from './HistoryTrade/HistoryTradePost';
import HistoryTradeCv from './HistoryTrade/HistoryTradeCv';
import ChartPost from './Chart/ChartPost';
import ChartCv from './Chart/ChartCv';
import ManagePackagePost from './Package/ManagePackagePost';
import AddpackagePost from './Package/AddpackagePost';
import ManagePackageCv from './Package/ManagePackageCv';
import AddPackageCv from './Package/AddPackageCv';
import AddEmployer from './Company/AddEmployer';
import ManageEmployer from './Company/ManageEmployer';
import ManageSkill from './Skill/ManageSkill';
import AddJobSkill from './Skill/AddJobSkill';
import DetailFilterUser from './Cv/DetailFilterUser';
import ManageInterview from './Interview/ManageInterview';
import EmployerRewardsPage from './Rewards/EmployerRewardsPage';
import MultiIndustryDifferentiatorHub from '../Candidate/MultiIndustryDifferentiatorHub';
import SessionContext from '../../auth/SessionContext';
import { getDefaultWorkspaceRoute, hasPermission, PERMISSIONS } from '../../auth/accessControl';
import { readJsonStorage } from '../../util/storage';

const Guard = ({ user, permission, children }) => {
    if (!hasPermission(user, permission)) {
        return <Navigate to={getDefaultWorkspaceRoute(user)} replace />;
    }
    return children;
};

const HomeAdmin = () => {
    const sessionUser = useContext(SessionContext);
    const currentUser = sessionUser === undefined ? readJsonStorage('userData') : sessionUser;
    const isSystemAdmin = currentUser && currentUser.roleCode === 'ADMIN';

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <Menu />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <Routes>
                            <Route
                                index
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.VIEW_DASHBOARD}>
                                        <Home />
                                    </Guard>
                                }
                            />

                            {/* Quản trị tài khoản nội bộ */}
                            <Route
                                path="user-info"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SELF_ACCOUNT}>
                                        <UserInfo />
                                    </Guard>
                                }
                            />
                            <Route
                                path="changepassword"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SELF_ACCOUNT}>
                                        <ChangePassword />
                                    </Guard>
                                }
                            />
                            <Route
                                path="linked-accounts"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SELF_ACCOUNT}>
                                        <LinkedAccounts />
                                    </Guard>
                                }
                            />

                            {/* Trung tâm Tính năng Đột phá Đa ngành (HR / Company / Admin) */}
                            <Route
                                path="differentiator"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.VIEW_DASHBOARD}>
                                        <MultiIndustryDifferentiatorHub />
                                    </Guard>
                                }
                            />

                            {/* Quản trị người dùng (ADMIN) */}
                            <Route
                                path="list-user"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_USERS}>
                                        <ManageUser />
                                    </Guard>
                                }
                            />
                            <Route
                                path="add-user"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_USERS}>
                                        <AddUser />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-user/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_USERS}>
                                        <AddUser />
                                    </Guard>
                                }
                            />

                            {/* Quản trị danh mục hệ thống (ADMIN) */}
                            <Route
                                path="list-job-type"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <ManageJobType />
                                    </Guard>
                                }
                            />
                            <Route
                                path="add-job-type"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <AddJobType />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-job-type/:code"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <AddJobType />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-job-skill"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SKILLS}>
                                        <ManageSkill />
                                    </Guard>
                                }
                            />
                            <Route
                                path="add-job-skill"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SKILLS}>
                                        <AddJobSkill />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-job-skill/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SKILLS}>
                                        <AddJobSkill />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-job-level"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <ManageJobLevel />
                                    </Guard>
                                }
                            />
                            <Route
                                path="add-job-level"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <AddJobLevel />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-job-level/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <AddJobLevel />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-work-type"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <ManageWorkType />
                                    </Guard>
                                }
                            />
                            <Route
                                path="add-work-type"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <AddWorkType />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-work-type/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <AddWorkType />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-salary-type"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <ManageSalaryType />
                                    </Guard>
                                }
                            />
                            <Route
                                path="add-salary-type"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <AddSalaryType />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-salary-type/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <AddSalaryType />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-exp-type"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <ManageExpType />
                                    </Guard>
                                }
                            />
                            <Route
                                path="add-exp-type"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <AddExpType />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-exp-type/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_SYSTEM_CATALOG}>
                                        <AddExpType />
                                    </Guard>
                                }
                            />

                            {/* Công ty & đội ngũ */}
                            <Route
                                path="add-company"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.COMPANY_ONBOARD}>
                                        <AddCompany />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-company"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.COMPANY_EDIT}>
                                        <AddCompany />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-company-admin/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MODERATE_COMPANIES}>
                                        <AddCompany />
                                    </Guard>
                                }
                            />
                            <Route
                                path="recruitment"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.TEAM_INVITE_EMPLOYER}>
                                        <AddEmployer />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-employer"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.TEAM_VIEW}>
                                        <ManageEmployer />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-company-admin/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MODERATE_COMPANIES}>
                                        <ManageCompany />
                                    </Guard>
                                }
                            />

                            {/* Tin tuyển dụng */}
                            <Route
                                path="add-post"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.JOB_CREATE}>
                                        <AddPost />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-post/:id"
                                element={
                                    <Guard
                                        user={currentUser}
                                        permission={isSystemAdmin ? PERMISSIONS.MODERATE_POSTS : PERMISSIONS.JOB_EDIT}
                                    >
                                        <AddPost />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-post/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.JOB_VIEW}>
                                        <ManagePost />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-post-admin/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MODERATE_POSTS}>
                                        <ManagePost />
                                    </Guard>
                                }
                            />

                            {/* Mua gói đăng tin & xem CV */}
                            <Route
                                path="buy-post/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.BILLING_POST}>
                                        <BuyPost />
                                    </Guard>
                                }
                            />
                            <Route
                                path="payment/success"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.BILLING_POST}>
                                        <PaymentSuccess />
                                    </Guard>
                                }
                            />
                            <Route
                                path="buy-cv/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.BILLING_VIEW_CV}>
                                        <BuyCv />
                                    </Guard>
                                }
                            />
                            <Route
                                path="paymentCv/success"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.BILLING_VIEW_CV}>
                                        <PaymentSuccessCv />
                                    </Guard>
                                }
                            />

                            {/* Quản trị gói dịch vụ (ADMIN) */}
                            <Route
                                path="add-package-post/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_PACKAGES}>
                                        <AddpackagePost />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-package-post/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_PACKAGES}>
                                        <AddpackagePost />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-package-post/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_PACKAGES}>
                                        <ManagePackagePost />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-package-cv/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_PACKAGES}>
                                        <ManagePackageCv />
                                    </Guard>
                                }
                            />
                            <Route
                                path="add-package-cv/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_PACKAGES}>
                                        <AddPackageCv />
                                    </Guard>
                                }
                            />
                            <Route
                                path="edit-package-cv/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.MANAGE_PACKAGES}>
                                        <AddPackageCv />
                                    </Guard>
                                }
                            />

                            {/* Hồ sơ ứng tuyển & tìm ứng viên */}
                            <Route
                                path="list-cv/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.CV_VIEW}>
                                        <ManageCv />
                                    </Guard>
                                }
                            />
                            <Route
                                path="list-candiate/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.CANDIDATE_SEARCH}>
                                        <FilterCv />
                                    </Guard>
                                }
                            />
                            <Route
                                path="candiate/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.CANDIDATE_SEARCH}>
                                        <DetailFilterUser />
                                    </Guard>
                                }
                            />
                            <Route
                                path="user-cv/:id"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.CV_VIEW}>
                                        <UserCv />
                                    </Guard>
                                }
                            />

                            {/* Lịch sử giao dịch & thống kê */}
                            <Route
                                path="history-post/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.BILLING_POST}>
                                        <HistoryTradePost />
                                    </Guard>
                                }
                            />
                            <Route
                                path="history-cv/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.BILLING_VIEW_CV}>
                                        <HistoryTradeCv />
                                    </Guard>
                                }
                            />
                            <Route
                                path="chart-post/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.VIEW_SYSTEM_REVENUE}>
                                        <ChartPost />
                                    </Guard>
                                }
                            />
                            <Route
                                path="chart-cv/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.VIEW_SYSTEM_REVENUE}>
                                        <ChartCv />
                                    </Guard>
                                }
                            />

                            {/* Lịch phỏng vấn */}
                            <Route
                                path="interviews/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.INTERVIEW_MANAGE}>
                                        <ManageInterview />
                                    </Guard>
                                }
                            />

                            {/* Quỹ điểm & Đổi lượt nhà tuyển dụng */}
                            <Route
                                path="rewards/"
                                element={
                                    <Guard user={currentUser} permission={PERMISSIONS.VIEW_DASHBOARD}>
                                        <EmployerRewardsPage />
                                    </Guard>
                                }
                            />

                            <Route path="*" element={<Navigate to={getDefaultWorkspaceRoute(currentUser)} replace />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default HomeAdmin
