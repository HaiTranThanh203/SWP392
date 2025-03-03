import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';
import Dashboard from '../components/homess';
import Header from '../components/Header.jsx';
import Sidebar from '../components/SideBar.jsx';
import Footer from '../components/Footer.jsx';
import ListFriends from '../components/ListFriends.jsx';
import ViewCommunity from '../components/ViewCommunity.jsx';
import PostDetail from '../components/PostDetail.jsx';
import CreatePost from '../components/CreatePost.jsx';
import ReportPost from '../components/ReportPost.jsx';
import Chat from '../components/Chat.jsx';
import AddFriends from '../components/AddFriends.jsx';
import SearchByCommunity from '../components/SearchByCommunity.jsx';
import EditPost from '../components/EditPost.jsx';
import Profile from '../components/Profile.jsx';

// Admin Components
import AdminLayout from '../components/admin/AdminLayout';
import ManagerNews from '../components/admin/ManagerNews';
import ManagerReport from '../components/admin/ManagerReport';
import ManagerUser from '../components/admin/ManagerUser';
import UserDetail from '../components/admin/UserDetail';
import UpdateNews from '../components/admin/UpdateNews';
import ViewNews from '../components/admin/ViewNews';
import CreateNew from '../components/admin/CreateNew';
import DetailNews from '../components/admin/DetailNews';
import AdminHome from '../components/admin/AdminHome';
import Home from '../pages/Home';

// Layout component (Ẩn Header, Sidebar, Footer ở trang login/signup)
const Layout = ({ children }) => {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/signup', '/forgotpassword'];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Header />}
      <div className="flex flex-1">
        {!hideLayout && <Sidebar />}
        <main className="flex-1 p-6">{children}</main>
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Route chính dành cho người dùng */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/listfriend" element={<Layout><ListFriends /></Layout>} />
        <Route path="/viewcommunity" element={<Layout><ViewCommunity /></Layout>} />
        <Route path="/postdetail" element={<Layout><PostDetail /></Layout>} />
        <Route path="/createpost" element={<Layout><CreatePost /></Layout>} />
        <Route path="/reportpost" element={<Layout><ReportPost /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/addfriends" element={<Layout><AddFriends /></Layout>} />
        <Route path="/searchbycommunity" element={<Layout><SearchByCommunity /></Layout>} />
        <Route path="/editpost" element={<Layout><EditPost /></Layout>} />

        {/* Route dành cho Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="manager-news" element={<ManagerNews />} />
          <Route path="manager-users" element={<ManagerUser />} />
          <Route path="manager-reports" element={<ManagerReport />} />
          <Route path="user-detail/:id" element={<UserDetail />} />
          <Route path="update-news/:id" element={<UpdateNews />} />
          <Route path="view-news" element={<ViewNews />} />
          <Route path="create-news" element={<CreateNew />} />
          <Route path="news-detail/:id" element={<DetailNews />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;