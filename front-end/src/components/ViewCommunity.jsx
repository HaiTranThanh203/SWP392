import React, { useState } from 'react';
import { FaEllipsisV, FaThumbsUp, FaThumbsDown, FaComment, FaCalendarAlt, FaGlobeAmericas } from 'react-icons/fa'; // Icons for like, dislike, comment, calendar, globe
import avatar1 from '../assets/images/avatar1.png';
import avatar2 from '../assets/images/avatar2.png';
import avatar3 from '../assets/images/avatar3.png';
import bag from '../assets/images/bag.png';

const ViewCommunity = () => {
  // Tạo state để quản lý dropdown của từng bài viết
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Hàm mở/đóng dropdown của từng bài viết
  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gray-300 p-8 flex items-center justify-between">
        {/* Avatar and Community Name */}
        <div className="flex items-center space-x-4">
          <img src={avatar1} alt="Group Avatar" className="h-24 w-24 rounded-full border-4 border-white" />
          <h1 className="font-semibold text-lg">FU Market</h1>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-white border-2 border-gray-600 text-gray-800 py-2 px-4 rounded-md text-sm hover:bg-gray-100 transition duration-300">
            + Create Post
          </button>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-md text-sm hover:bg-orange-500 transition duration-300">
            + Join
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Post Section */}
        <div className="flex-1 p-6 space-y-6">
          {/* Post 1 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <img src={avatar2} alt="User Avatar" className="h-12 w-12 rounded-full" />
              <div>
                <h2 className="font-semibold text-lg">funny</h2>
                <p className="text-xs text-gray-500">2 hr ago</p>
              </div>
              <div className="ml-auto relative">
                <FaEllipsisV
                  className="text-gray-600 cursor-pointer rotate-90"
                  onClick={() => toggleDropdown(0)} // Mở hoặc đóng dropdown cho bài viết 1
                />
                {dropdownOpen === 0 && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 text-sm text-gray-700">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Save post
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Report post
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <p className="mt-2 text-gray-700">I’m looking for this bag. Contact me via this account.</p>
            <img src={bag} alt="Bag" className="mt-4 w-32 h-32 object-cover" />
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-1 text-gray-500">
                <FaThumbsUp className="text-lg" />
                <span className="text-sm">15K</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <FaThumbsDown className="text-lg" />
                <span className="text-sm">1K</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <FaComment className="text-lg" />
                <span className="text-sm">80</span>
              </div>
            </div>
          </div>

          {/* Post 2 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <img src={avatar3} alt="User Avatar" className="h-12 w-12 rounded-full" />
              <div>
                <h2 className="font-semibold text-lg">Emmy</h2>
                <p className="text-xs text-gray-500">3 hr ago</p>
              </div>
              <div className="ml-auto relative">
                <FaEllipsisV
                  className="text-gray-600 cursor-pointer rotate-90"
                  onClick={() => toggleDropdown(1)} // Mở hoặc đóng dropdown cho bài viết 2
                />
                {dropdownOpen === 1 && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 text-sm text-gray-700">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Save post
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Report post
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <p className="mt-2 text-gray-700">I’ve got an eatery near the university. I hope you’ll go there and try some dishes.</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-1 text-gray-500">
                <FaThumbsUp className="text-lg" />
                <span className="text-sm">10K</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <FaThumbsDown className="text-lg" />
                <span className="text-sm">955</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <FaComment className="text-lg" />
                <span className="text-sm">78</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-200 p-6 shadow-md space-y-8">
          <h2 className="font-semibold text-xl text-gray-800">FU Market - 52M Members</h2>
          <p className="text-sm text-gray-500 mb-6">You can share and search for the item you are looking for.</p>

          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <FaCalendarAlt className="text-base" />
            <span>Created 24/01/2025</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <FaGlobeAmericas className="text-base" />
            <span>Public</span>
          </div>

          <h3 className="font-semibold text-xl mt-8 text-gray-800">RULES</h3>
          <ul className="text-sm text-gray-600 mt-4 space-y-4">
            <li>1. Rule 1: No personal info</li>
            <li>2. Rule 2: Do not use rude words</li>
            <li>3. Rule 3: Don’t kick war</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewCommunity;
