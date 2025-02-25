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

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Các trang không cần Header, Sidebar, Footer
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
      <Layout>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listfriend" element={<ListFriends />} />
          <Route path="/viewcommunity" element={<ViewCommunity />} />
          <Route path="/postdetail" element={<PostDetail />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/reportpost" element={<ReportPost />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/addfriends" element={<AddFriends />} />
          <Route path="/searchbycommunity" element={<SearchByCommunity />} />
          <Route path="/editpost" element={<EditPost />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
