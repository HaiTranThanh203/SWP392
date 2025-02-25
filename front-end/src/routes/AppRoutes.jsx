import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/Admin/AdminLayout';
import ManagerNews from '../components/admin/ManagerNews';
import ManagerReport from '../components/admin/ManagerReport';
import ManagerUser from '../components/admin/ManagerUser';
import UserDetail from '../components/admin/UserDetail';
import UpdateNews from '../components/admin/UpdateNews';
import ViewNews from '../components/admin/ViewNews';
import CreateNew from '../components/admin/CreateNew';
import DetailNews from '../components/admin/DetailNews';
import AdminHome from '../components/admin/AdminHome';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Route for Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Admin Home route */}
        <Route index element={<AdminHome />} />

        {/* Nested Routes for Admin */}
        <Route path="manager-news" element={<ManagerNews />} />
        <Route path="manager-users" element={<ManagerUser />} />
        <Route path="manager-reports" element={<ManagerReport />} />
        <Route path="user-detail/:id" element={<UserDetail />} />
        <Route path="update-news/:id" element={<UpdateNews />} /> {/* UpdateNews page with id param */}
        <Route path="view-news" element={<ViewNews />} /> {/* ViewNews page */}
        <Route path="create-news" element={<CreateNew />} /> {/* CreateNew page */}
        <Route path="news-detail/:id" element={<DetailNews />} /> {/* DetailNews page with id param */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
