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
      <Route path="/" element={<AdminLayout />}>
        {/* Admin Home route */}
        <Route path="admin" element={<AdminHome />} />

        {/* Nested Routes for /admin */}
        <Route path="admin/managernews" element={<ManagerNews />} />
        <Route path="admin/managerusers" element={<ManagerUser />} />
        <Route path="admin/managerreports" element={<ManagerReport />} />
        <Route path="admin/user-detail/:id" element={<UserDetail />} />
        <Route path="admin/updatenews/:id" element={<UpdateNews />} /> {/* UpdateNews page with id param */}
        <Route path="admin/viewnews" element={<ViewNews />} /> {/* ViewNews page */}
        <Route path="admin/createnews" element={<CreateNew />} /> {/* CreateNew page */}
        <Route path="admin/news-detail/:id" element={<DetailNews />} /> {/* DetailNews page with id param */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
