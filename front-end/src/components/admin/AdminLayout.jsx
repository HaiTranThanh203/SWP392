import { Outlet } from 'react-router-dom'; // Import Outlet to render child routes
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';
import SidebarAdmin from './SidebarAdmin';

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderAdmin />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-60 bg-gray-800 text-white">
          <SidebarAdmin />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <Outlet /> {/* Render child routes here */}
        </div>
      </div>

      {/* Footer */}
      <FooterAdmin />
    </div>
  );
};

export default AdminLayout;
