import { HiOutlineUsers, HiOutlineExclamationCircle, HiOutlineDocument } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-white text-black p-4 space-y-6">
        <ul className="space-y-4">
          {/* Manager News section */}
          <li className="text-lg">
            <div className="flex items-center space-x-2">
              <HiOutlineDocument className="text-xl" />
              <Link to="/admin/manager-news" className="text-lg hover:text-orange-500">
                Manager News
              </Link>
            </div>
          </li>

          {/* Manager Users */}
          <li className="flex items-center space-x-2 text-lg">
            <HiOutlineUsers className="text-xl" />
            <Link to="/admin/manager-users" className="hover:text-orange-500">Manager Users</Link>
          </li>

          {/* Manager Reports */}
          <li className="flex items-center space-x-2 text-lg">
            <HiOutlineExclamationCircle className="text-xl" />
            <Link to="/admin/manager-reports" className="hover:text-orange-500">Manager Reports</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
    </div>
  );
};

export default SidebarAdmin;
