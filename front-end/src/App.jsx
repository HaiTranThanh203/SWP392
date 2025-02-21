import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router
import Header from './components/Header.jsx';
import Sidebar from './components/SideBar.jsx';
import Footer from './components/Footer.jsx';
import ListFriends from './components/ListFriends.jsx';
import ViewCommunity from './components/ViewCommunity.jsx';
import PostDetail from './components/PostDetail.jsx';
import CreatePost from './components/CreatePost.jsx';
import ReportPost from './components/ReportPost.jsx';
import Chat from './components/Chat.jsx';
import AddFriends from './components/AddFriends.jsx';
import SearchByCommunity from './components/SearchByCommunity.jsx';
import EditPost from './components/EditPost.jsx'
const App = () => {
  return (
    <Router> {/* Đặt Router bao bọc toàn bộ ứng dụng */}
      <div className="flex flex-col min-h-screen">
      <Header/>
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes> {/* Routes chứa các route của ứng dụng */}
              <Route path="/listfriend" element={<ListFriends />} /> {/* Định nghĩa đường dẫn */}
              <Route path="/viewcommunity" element={<ViewCommunity />} /> {/* Định nghĩa đường dẫn */}
              <Route path="/postdetail" element={<PostDetail />} /> {/* Định nghĩa đường dẫn */}
              <Route path="/createpost" element={<CreatePost />} /> {/* Định nghĩa đường dẫn */}
              <Route path="/reportpost" element={<ReportPost />} /> {/* Định nghĩa đường dẫn */}
              <Route path="/chat" element={<Chat />} /> {/* Định nghĩa đường dẫn */}
              <Route path="/addfriends" element={<AddFriends />} /> {/* Định nghĩa đường dẫn */}
              <Route path="/searchbycommunity" element={<SearchByCommunity />} /> {/* Định nghĩa đường dẫn */}
              <Route path="/editpost" element={<EditPost />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
