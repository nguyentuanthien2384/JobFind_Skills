import express from "express";
import userController from "../controllers/userController";
import allcodeController from "../controllers/allcodeController";
import companyController from "../controllers/companyController";
import postController from "../controllers/postController";
import cvController from "../controllers/cvController";
import packageController from "../controllers/packageController";
import packageCvController from "../controllers/packageCvController";
import companyReviewController from "../controllers/companyReviewController";
import favoritePostController from "../controllers/favoritePostController";
import companyFollowController from "../controllers/companyFollowController";
import notificationController from "../controllers/notificationController";
import interviewController from "../controllers/interviewController";
import aiController from "../controllers/aiController";
import chatController from "../controllers/chatController";
import authController from "../controllers/authController";
import rewardController from "../controllers/rewardController";
import middlewareControllers from "../middlewares/jwtVerify";
import { PERMISSIONS, requirePermission } from "../middlewares/authorize";
import { registerDifferentiatorRoutes } from "./differentiatorRoutes";

let router = express.Router();

const protectedBy = (permission) => [
    middlewareControllers.verifyTokenUser,
    requirePermission(permission)
];

let initWebRoutes = (app) => {

    //====================== NO CAPCHA (PUBLIC) =============================//
    router.get("/api/get-all-code", allcodeController.getAllCode);
    router.get("/api/get-list-allcode", protectedBy(PERMISSIONS.SYSTEM_CATALOG_MANAGE), allcodeController.getListAllCode);
    router.get("/api/get-detail-all-code-by-code", protectedBy(PERMISSIONS.SYSTEM_CATALOG_MANAGE), allcodeController.getDetailAllCodeByCode);
    router.get("/api/get-list-job-count-post", allcodeController.getListJobTypeAndCountPost);
    router.get("/api/get-list-skill", protectedBy(PERMISSIONS.SKILL_MANAGE), allcodeController.getListSkill);
    router.get("/api/get-all-skill-by-job-code", allcodeController.getAllSkillByJobCode);
    router.get("/api/get-detail-skill-by-id", protectedBy(PERMISSIONS.SKILL_MANAGE), allcodeController.getDetailSkillById);

    router.get("/api/check-phonenumber-user", userController.checkUserPhone);
    router.post("/api/request-reset-password-otp", userController.requestResetPasswordOtp);
    router.post("/api/changepasswordbyPhone", userController.changePaswordByPhone);
    router.post("/api/create-new-user", middlewareControllers.optionalVerifyTokenUser, userController.handleCreateNewUser);
    router.post("/api/login", userController.handleLogin);
    router.get("/api/auth/oauth/providers", authController.handleListOAuthProviders);
    router.get("/api/auth/oauth/:provider/start", authController.handleStartOAuth);
    router.get("/api/auth/oauth/:provider/callback", authController.handleOAuthCallback);
    router.post("/api/auth/oauth/exchange", authController.handleExchangeOAuthResult);
    router.post("/api/auth/refresh", authController.handleRefreshSession);
    router.post("/api/auth/logout", authController.handleLogoutSession);
    router.get("/api/auth/identities", protectedBy(PERMISSIONS.ACCOUNT_SELF), authController.handleGetLinkedIdentities);
    router.post("/api/auth/oauth/:provider/link-start", protectedBy(PERMISSIONS.ACCOUNT_SELF), authController.handleStartOAuthLink);
    router.delete("/api/auth/identities/:provider", protectedBy(PERMISSIONS.ACCOUNT_SELF), authController.handleUnlinkIdentity);
    router.get("/api/auth/me", protectedBy(PERMISSIONS.ACCOUNT_SELF), userController.handleGetCurrentAuthorization);

    router.get("/api/get-filter-post", postController.getFilterPost);
    router.get("/api/get-detail-post-by-id", middlewareControllers.optionalVerifyTokenUser, postController.getDetailPostById);
    router.get("/api/get-statistical-post", protectedBy(PERMISSIONS.RECRUITMENT_READ), postController.getStatisticalTypePost);
    router.get("/api/get-related-post", postController.getRelatedPost);
    router.get("/api/get-recommended-post", protectedBy(PERMISSIONS.ACCOUNT_SELF), postController.getRecommendedPost);

    router.get("/api/get-detail-company-by-id", companyController.getDetailCompanyById);
    router.get("/api/get-list-company", companyController.getListCompany);

    //================== ALL CODE & SKILL (ADMIN) ====================//
    router.post("/api/create-new-all-code", protectedBy(PERMISSIONS.SYSTEM_CATALOG_MANAGE), allcodeController.handleCreateNewAllCode);
    router.put("/api/update-all-code", protectedBy(PERMISSIONS.SYSTEM_CATALOG_MANAGE), allcodeController.handleUpdateAllCode);
    router.delete("/api/delete-all-code", protectedBy(PERMISSIONS.SYSTEM_CATALOG_MANAGE), allcodeController.handleDeleteAllCode);

    router.post("/api/create-new-skill", protectedBy(PERMISSIONS.SKILL_MANAGE), allcodeController.handleCreateNewSkill);
    router.put("/api/update-skill", protectedBy(PERMISSIONS.SKILL_MANAGE), allcodeController.handleUpdateSkill);
    router.delete("/api/delete-skill", protectedBy(PERMISSIONS.SKILL_MANAGE), allcodeController.handleDeleteSkill);

    //================== USER API ================================//
    router.put("/api/update-user", protectedBy(PERMISSIONS.ACCOUNT_SELF), userController.handleUpdateUser);
    router.post("/api/ban-user", protectedBy(PERMISSIONS.USER_ADMIN_MANAGE), userController.handleBanUser);
    router.post("/api/unban-user", protectedBy(PERMISSIONS.USER_ADMIN_MANAGE), userController.handleUnbanUser);
    router.post("/api/changepassword", protectedBy(PERMISSIONS.ACCOUNT_SELF), userController.handleChangePassword);
    router.get("/api/get-all-user", protectedBy(PERMISSIONS.USER_ADMIN_MANAGE), userController.getAllUser);
    router.get("/api/get-detail-user-by-id", protectedBy(PERMISSIONS.ACCOUNT_SELF), userController.getDetailUserById);
    router.put("/api/setDataUserSetting", protectedBy(PERMISSIONS.ACCOUNT_SELF), userController.setDataUserSetting);

    //=================== COMPANY API =============================//
    router.post("/api/create-new-company", protectedBy(PERMISSIONS.COMPANY_ONBOARD), companyController.handleCreateNewCompany);
    router.put("/api/update-company", protectedBy(PERMISSIONS.COMPANY_MANAGE), companyController.handleUpdateCompany);
    router.put("/api/ban-company", protectedBy(PERMISSIONS.COMPANY_MODERATION), companyController.handleBanCompany);
    router.put("/api/unban-company", protectedBy(PERMISSIONS.COMPANY_MODERATION), companyController.handleUnBanCompany);
    router.put("/api/accecpt-company", protectedBy(PERMISSIONS.COMPANY_MODERATION), companyController.handleAccecptCompany);
    router.put("/api/add-user-company", protectedBy(PERMISSIONS.COMPANY_CREATE_EMPLOYER), companyController.handleAddUserCompany);
    router.get("/api/get-detail-company-by-userId", protectedBy(PERMISSIONS.RECRUITMENT_READ), companyController.getDetailCompanyByUserId);
    router.get("/api/get-all-user-by-companyId", protectedBy(PERMISSIONS.COMPANY_TEAM_READ), companyController.getAllUserByCompanyId);
    router.put("/api/quit-company", protectedBy(PERMISSIONS.RECRUITMENT_READ), companyController.handleQuitCompany);
    router.get("/api/get-all-company", protectedBy(PERMISSIONS.COMPANY_MODERATION), companyController.getAllCompanyByAdmin);

    //=================== POST API =============================//
    router.post("/api/create-new-post", protectedBy(PERMISSIONS.JOB_MANAGE), postController.handleCreateNewPost);
    router.post("/api/create-reup-post", protectedBy(PERMISSIONS.JOB_MANAGE), postController.handleReupPost);
    router.put("/api/update-post", protectedBy(PERMISSIONS.JOB_MANAGE), postController.handleUpdatePost);
    router.put("/api/ban-post", protectedBy(PERMISSIONS.POST_MODERATION), postController.handleBanPost);
    router.put("/api/active-post", protectedBy(PERMISSIONS.POST_MODERATION), postController.handleActivePost);
    router.put("/api/accept-post", protectedBy(PERMISSIONS.POST_MODERATION), postController.handleAcceptPost);
    router.get("/api/get-list-post-admin", protectedBy(PERMISSIONS.RECRUITMENT_READ), postController.getListPostByAdmin);
    router.get("/api/get-all-post-admin", protectedBy(PERMISSIONS.POST_MODERATION), postController.getAllPostByAdmin);
    router.get("/api/get-note-by-post", protectedBy(PERMISSIONS.RECRUITMENT_READ), postController.getListNoteByPost);

    //=================== CV API =============================//
    router.post("/api/create-new-cv", protectedBy(PERMISSIONS.CANDIDATE_APPLY), cvController.handleCreateNewCV);
    router.get("/api/get-all-list-cv-by-post", protectedBy(PERMISSIONS.RECRUITMENT_READ), cvController.getAllListCvByPost);
    router.get("/api/get-detail-cv-by-id", protectedBy(PERMISSIONS.ACCOUNT_SELF), cvController.getDetailCvById);
    router.get("/api/get-all-cv-by-userId", protectedBy(PERMISSIONS.ACCOUNT_SELF), cvController.getAllCvByUserId);
    router.get("/api/get-statistical-cv", protectedBy(PERMISSIONS.RECRUITMENT_READ), cvController.getStatisticalCv);
    router.get("/api/fillter-cv-by-selection", protectedBy(PERMISSIONS.CANDIDATE_SEARCH), cvController.fillterCVBySelection);
    router.get("/api/candidate-search-jobs", protectedBy(PERMISSIONS.CANDIDATE_SEARCH), cvController.listCandidateSearchJobs);
    router.get("/api/check-see-candiate", protectedBy(PERMISSIONS.CANDIDATE_SEARCH), cvController.checkSeeCandiate);

    //=================== PACKAGE POST API =============================//
    router.get("/api/get-package-by-type", protectedBy(PERMISSIONS.BILLING_POST), packageController.getPackageByType);
    router.get("/api/get-package-by-id", protectedBy(PERMISSIONS.BILLING_POST), packageController.getPackageById);
    router.get("/api/get-payment-link", protectedBy(PERMISSIONS.BILLING_POST), packageController.getPaymentLink);
    router.post("/api/payment-success", protectedBy(PERMISSIONS.BILLING_POST), packageController.paymentOrderSuccess);
    router.get("/api/get-all-package", protectedBy(PERMISSIONS.PACKAGE_MANAGE), packageController.getAllPackage);
    router.put("/api/set-active-package-post", protectedBy(PERMISSIONS.PACKAGE_MANAGE), packageController.setActiveTypePackage);
    router.post("/api/create-package-post", protectedBy(PERMISSIONS.PACKAGE_MANAGE), packageController.createPackagePost);
    router.put("/api/update-package-post", protectedBy(PERMISSIONS.PACKAGE_MANAGE), packageController.updatePackagePost);
    router.get("/api/get-statistical-package", protectedBy(PERMISSIONS.RECRUITMENT_ANALYTICS_ADMIN), packageController.getStatisticalPackage);
    router.get("/api/get-history-trade-post", protectedBy(PERMISSIONS.BILLING_POST), packageController.getHistoryTrade);
    router.get("/api/get-sum-by-year-post", protectedBy(PERMISSIONS.RECRUITMENT_ANALYTICS_ADMIN), packageController.getSumByYear);

    //=================== PACKAGE CV API =============================//
    router.get("/api/get-package-cv-by-id", protectedBy(PERMISSIONS.BILLING_VIEW_CV), packageCvController.getPackageById);
    router.get("/api/get-payment-cv-link", protectedBy(PERMISSIONS.BILLING_VIEW_CV), packageCvController.getPaymentLink);
    router.post("/api/payment-cv-success", protectedBy(PERMISSIONS.BILLING_VIEW_CV), packageCvController.paymentOrderSuccess);
    router.get("/api/get-all-package-cv", protectedBy(PERMISSIONS.PACKAGE_MANAGE), packageCvController.getAllPackage);
    router.get("/api/get-all-package-cv-filter", protectedBy(PERMISSIONS.BILLING_VIEW_CV), packageCvController.getAllToSelect);
    router.put("/api/set-active-package-cv", protectedBy(PERMISSIONS.PACKAGE_MANAGE), packageCvController.setActiveTypePackage);
    router.post("/api/create-package-cv", protectedBy(PERMISSIONS.PACKAGE_MANAGE), packageCvController.createPackagePost);
    router.put("/api/update-package-cv", protectedBy(PERMISSIONS.PACKAGE_MANAGE), packageCvController.updatePackagePost);
    router.get("/api/get-statistical-package-cv", protectedBy(PERMISSIONS.RECRUITMENT_ANALYTICS_ADMIN), packageCvController.getStatisticalPackage);
    router.get("/api/get-history-trade-cv", protectedBy(PERMISSIONS.BILLING_VIEW_CV), packageCvController.getHistoryTrade);
    router.get("/api/get-sum-by-year-cv", protectedBy(PERMISSIONS.RECRUITMENT_ANALYTICS_ADMIN), packageCvController.getSumByYear);

    //=================== COMPANY REVIEW API =============================//
    router.post("/api/create-company-review", protectedBy(PERMISSIONS.SOCIAL_INTERACT), companyReviewController.handleCreateReview);
    router.get("/api/get-review-by-company", companyReviewController.getReviewByCompany);
    router.delete("/api/delete-company-review", protectedBy(PERMISSIONS.SOCIAL_INTERACT), companyReviewController.handleDeleteReview);

    //=================== FAVORITE POST API =============================//
    router.post("/api/toggle-favorite-post", protectedBy(PERMISSIONS.SOCIAL_INTERACT), favoritePostController.handleToggleFavorite);
    router.get("/api/get-favorite-posts", protectedBy(PERMISSIONS.SOCIAL_INTERACT), favoritePostController.getFavoriteByUser);
    router.get("/api/check-favorite-post", protectedBy(PERMISSIONS.SOCIAL_INTERACT), favoritePostController.checkFavorite);

    //=================== COMPANY FOLLOW API =============================//
    router.post("/api/toggle-follow-company", protectedBy(PERMISSIONS.SOCIAL_INTERACT), companyFollowController.handleToggleFollow);
    router.get("/api/get-followed-companies", protectedBy(PERMISSIONS.SOCIAL_INTERACT), companyFollowController.getFollowedCompanies);
    router.get("/api/check-follow-company", companyFollowController.checkFollow);

    //=================== NOTIFICATION API =============================//
    router.get("/api/get-notifications", protectedBy(PERMISSIONS.NOTIFICATION_SELF), notificationController.getNotificationsByUser);
    router.put("/api/mark-notification-read", protectedBy(PERMISSIONS.NOTIFICATION_SELF), notificationController.markAsRead);
    router.put("/api/mark-all-notifications-read", protectedBy(PERMISSIONS.NOTIFICATION_SELF), notificationController.markAllAsRead);
    router.delete("/api/delete-notification", protectedBy(PERMISSIONS.NOTIFICATION_SELF), notificationController.deleteNotification);

    //=================== INTERVIEW SCHEDULE API =============================//
    router.post("/api/create-interview", protectedBy(PERMISSIONS.INTERVIEW_MANAGE), interviewController.handleCreateInterview);
    router.put("/api/update-interview-status", protectedBy(PERMISSIONS.ACCOUNT_SELF), interviewController.handleUpdateStatus);
    router.get("/api/get-interviews-by-company", protectedBy(PERMISSIONS.INTERVIEW_MANAGE), interviewController.getInterviewsByCompany);
    router.get("/api/get-interviews-by-candidate", protectedBy(PERMISSIONS.ACCOUNT_SELF), interviewController.getInterviewsByCandidate);
    router.delete("/api/delete-interview", protectedBy(PERMISSIONS.INTERVIEW_MANAGE), interviewController.handleDeleteInterview);

    //=================== AI INTEGRATED API (CV REVIEW, COVER LETTER, INTERVIEW, ROADMAP) =============================//
    router.post("/api/ai/review-cv", protectedBy(PERMISSIONS.ACCOUNT_SELF), aiController.handleReviewCv);
    router.post("/api/ai/generate-cover-letter", protectedBy(PERMISSIONS.ACCOUNT_SELF), aiController.handleGenerateCoverLetter);
    router.post("/api/ai/interview-questions", protectedBy(PERMISSIONS.ACCOUNT_SELF), aiController.handleGenerateInterviewQuestions);
    router.post("/api/ai/evaluate-answer", protectedBy(PERMISSIONS.ACCOUNT_SELF), aiController.handleEvaluateAnswer);
    router.post("/api/ai/career-roadmap", protectedBy(PERMISSIONS.ACCOUNT_SELF), aiController.handleCareerRoadmap);
    router.post("/api/ai/score-candidate-cv", protectedBy(PERMISSIONS.RECRUITMENT_READ), aiController.handleScoreCandidateCv);

    //=================== REAL-TIME CHAT API (UNG VIEN <-> NHA TUYEN DUNG) =============================//
    router.get("/api/chat/conversations", protectedBy(PERMISSIONS.CHAT_SELF), chatController.getConversations);
    router.get("/api/chat/messages", protectedBy(PERMISSIONS.CHAT_SELF), chatController.getMessages);
    router.post("/api/chat/send", protectedBy(PERMISSIONS.CHAT_SELF), chatController.sendMessage);
    router.put("/api/chat/mark-read", protectedBy(PERMISSIONS.CHAT_SELF), chatController.markAsRead);
    router.get("/api/chat/unread-count", protectedBy(PERMISSIONS.CHAT_SELF), chatController.getUnreadCount);
    router.get("/api/chat/user-brief", protectedBy(PERMISSIONS.CHAT_SELF), chatController.getUserBrief);

    //=================== REWARDS, POINTS, VNPAY & COMPETITION ANALYTICS =============================//
    router.get("/api/rewards/wallet", protectedBy(PERMISSIONS.ACCOUNT_SELF), rewardController.getWalletOverview);
    router.post("/api/rewards/redeem-employer", protectedBy(PERMISSIONS.RECRUITMENT_READ), rewardController.redeemEmployerPoints);
    router.post("/api/rewards/boost-application", protectedBy(PERMISSIONS.ACCOUNT_SELF), rewardController.boostCandidateApplication);
    router.get("/api/jobs/:postId/competition-stats", middlewareControllers.optionalVerifyTokenUser, rewardController.getJobCompetitionStats);
    router.post("/api/payment/vnpay/create-url", protectedBy(PERMISSIONS.ACCOUNT_SELF), rewardController.createVnpayPaymentUrl);
    router.post("/api/payment/vnpay/verify-return", protectedBy(PERMISSIONS.ACCOUNT_SELF), rewardController.verifyVnpayReturn);

    //=================== MULTI-INDUSTRY DIFFERENTIATOR API =============================//
    registerDifferentiatorRoutes(router, protectedBy, PERMISSIONS);

    return app.use("/", router);
}

module.exports = initWebRoutes;
