import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/Admin/AdminLayout';
import ManagerNews from '../components/admin/ManagerNews';
import ManagerReport from '../components/admin/ManagerReport';
import ManagerUser from '../components/admin/ManagerUser';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Route for Admin Layout */}
      <Route path="/" element={<AdminLayout />}>
        {/* Nested Routes */}
        <Route path="managernew" element={<ManagerNews />} />
        <Route path="manageruser" element={<ManagerUser />} />
        <Route path="managerreport" element={<ManagerReport />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
