import React, { useEffect } from 'react'
import Header from './container/header/Header'
import Footer from './container/footer/Footer'
import Home from './container/home/home'
import JobPage from './container/JobPage/JobPage'
import DetailCompany from './container/Company/DetailCompany'
import JobDetail from './container/JobDetail/JobDetail'
import ListCompany from './container/Company/ListCompany'
import Login from './container/login/Login'
import Register from './container/login/Register'
import OAuthCallback from './container/login/OAuthCallback'
import ForgetPassword from './container/login/ForgetPassword'
import HomeAdmin from './container/system/HomeAdmin'
import HomeCandidate from './container/Candidate/HomeCandidate'
import ChatPage from './container/Chat/ChatPage'
import ProtectedRoute from './auth/ProtectedRoute'
import SessionProvider from './auth/SessionProvider'
import { PERMISSIONS } from './auth/accessControl'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";
import { installSessionExpiryListeners } from './auth/sessionExpiry';

function PublicLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

function ChatLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

function App() {
  useEffect(() => installSessionExpiryListeners(), []);
  return (
    <Router>
      <SessionProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/job" element={<JobPage />} />
            <Route path="/company" element={<ListCompany />} />
            <Route path="/detail-company/:id" element={<DetailCompany />} />
            <Route path="/detail-job/:id" element={<JobDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/oauth/callback" element={<OAuthCallback />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                allowedRoles={['CANDIDATE', 'EMPLOYER', 'COMPANY']}
                requiredPermissions={[PERMISSIONS.USE_CHAT]}
                forbiddenMessage="Trò chuyện chỉ dành cho ứng viên và nhà tuyển dụng"
              >
                <ChatLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat/:partnerId" element={<ChatPage />} />
          </Route>
          <Route
            path="/candidate/*"
            element={
              <ProtectedRoute
                allowedRoles={['CANDIDATE']}
                requiredPermissions={[PERMISSIONS.ACCESS_CANDIDATE_WORKSPACE]}
                forbiddenRedirect="/admin"
                forbiddenMessage="Khu vực này chỉ dành cho ứng viên"
              >
                <HomeCandidate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                allowedRoles={['ADMIN', 'EMPLOYER', 'COMPANY']}
                requiredPermissions={[PERMISSIONS.ACCESS_WORKSPACE]}
                forbiddenRedirect="/"
                forbiddenMessage="Tài khoản ứng viên không có quyền truy cập khu vực quản trị"
              >
                <HomeAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </SessionProvider>
    </Router>
  );
}

export default App;
