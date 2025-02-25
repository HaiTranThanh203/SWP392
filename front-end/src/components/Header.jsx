import React, { useState } from 'react';
import { FaSearch, FaBell, FaUserAlt, FaBars, FaCaretDown } from 'react-icons/fa'; // Import các icon
import logo from '../assets/images/logo.png'; 

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Quản lý dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white p-4 shadow-md flex items-center justify-between w-full">
      {/* Logo và tên ứng dụng */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-8" />
        <h1 className="text-orange-500 text-xl font-semibold">FPT Student Space</h1>
      </div>

      {/* Thanh tìm kiếm với viền */}
      <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full p-2 w-96 mx-auto">
        <FaCaretDown 
          className="text-gray-600 text-2xl cursor-pointer"
          onClick={toggleDropdown} 
        />
        <input 
          type="text" 
          placeholder="Search" 
          className="bg-transparent border-none outline-none placeholder-gray-400 text-gray-600 w-full"
        />
        <FaSearch className="text-gray-400 text-xl cursor-pointer" /> {/* Icon kính lúp ở cuối */}
        
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-md w-40 mx-auto">
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100">Friends</li>
              <li className="px-4 py-2 hover:bg-gray-100">Communities</li>
            </ul>
          </div>
        )}
      </div>

      {/* Các nút khác: Thông báo, Tạo bài viết, Log out */}
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 text-xl cursor-pointer" />
        
        {/* Nút Create Post */}
        <button className="bg-white border border-gray-400 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300">
          Create Post
        </button>
        <div className="relative">
              <FaUserAlt className="text-gray-600 text-xl cursor-pointer" onClick={toggleDropdown} />
              
            </div>

        {/* Nút Log out */}
        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">Log out</button>
      </div>
    </header>
  );
}
