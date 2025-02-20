
import { HiOutlineUsers, HiOutlineExclamationCircle, HiOutlineDocument } from 'react-icons/hi';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

const SidebarAdmin = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-white text-black p-4 space-y-6">
        <ul className="space-y-4">
          <li className="flex items-center space-x-2 text-lg">
            <HiOutlineDocument className="text-xl" />
            <Link to="/managernew" className="hover:text-orange-500">Manager News</Link>
          </li>
          <li className="flex items-center space-x-2 text-lg">
            <HiOutlineUsers className="text-xl" />
            <Link to="/manageruser" className="hover:text-orange-500">Manager Users</Link>
          </li>
          <li className="flex items-center space-x-2 text-lg">
            <HiOutlineExclamationCircle className="text-xl" />
            <Link to="/managerreport" className="hover:text-orange-500">Manager Reports</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
    </div>
  );
};

export default SidebarAdmin;
