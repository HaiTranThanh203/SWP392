import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom"; // Import useNavigate để chuyển trang
import { FaSearch, FaBell, FaUserAlt, FaCaretDown } from "react-icons/fa";
import logo from "../assets/images/logo.png";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook để chuyển trang

  // Xử lý logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    navigate("/login"); // Chuyển hướng về trang login
  };

  return (
    <header className="bg-white p-4 shadow-md flex items-center justify-between w-full">
      {/* Logo và tên ứng dụng */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-8" />
        <h1 className="text-orange-500 text-xl font-semibold">FPT Student Space</h1>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full p-2 w-96 mx-auto">
        <FaCaretDown className="text-gray-600 text-2xl cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border-none outline-none placeholder-gray-400 text-gray-600 w-full"
        />
        <FaSearch className="text-gray-400 text-xl cursor-pointer" />
      </div>

      {/* Các nút khác */}
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 text-xl cursor-pointer" />

        <button className="bg-white border border-gray-400 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300">
          Create Post
        </button>

        <Link to="/profile"> {/* Thay đổi đường dẫn đến trang profile hoặc trang bạn muốn */}
          <FaUserAlt className="text-gray-600 text-xl cursor-pointer" />
        </Link>

        {/* Nút Log out */}
        <button
          onClick={handleLogout} // Gọi hàm logout khi click
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
