import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import {
  FaHome,
  FaNewspaper,
  FaComments,
  FaGamepad,
  FaQuestionCircle,
  FaBook,
  FaCaretDown,
  FaUserFriends,
} from "react-icons/fa"; // Import các icon

import defaultLogo from "../assets/images/logo.png";

export default function Sidebar() {
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(false);
  const [user, setUser] = useState(null); // Lưu thông tin user
  const [communities, setCommunities] = useState([]); // Lưu danh sách cộng đồng của user
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;
  // 🛠 Toggle danh sách communities
  const toggleCommunities = () => {
    setIsCommunitiesOpen(!isCommunitiesOpen);
  };

  // 🛠 Gọi API lấy thông tin user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user")).token;

        // Lấy thông tin user
        const userResponse = await axios.get(
          `http://localhost:9999/api/v1/users/infor/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(userResponse.data.data);

        // Lấy các cộng đồng user làm moderator
        const moderatorCommunities = (
          userResponse.data.data.moderatorCommunities || []
        ).map((c) => ({
          ...c,
          role: "Moderator",
        }));

        // Lấy các cộng đồng user tham gia
        const memberCommunitiesResponse = await axios.get(
          `http://localhost:9999/api/v1/communities/getcommunity/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const memberCommunities = (
          memberCommunitiesResponse.data.data || []
        ).map((c) => ({
          ...c,
          role: "Member",
        }));

        // Kết hợp hai loại communities
        const combinedCommunities = [
          ...moderatorCommunities,
          ...memberCommunities,
        ];
        console.log("🚀 Communities:", combinedCommunities);
        
        setCommunities(combinedCommunities);
      } catch (error) {
        console.error(
          "🚨 Error fetching user data or communities:",
          error.response?.data || error
        );
        setCommunities([]);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <aside className="bg-white text-gray-800 w-64 p-6 space-y-8 shadow-md">
      <ul className="space-y-6">
        {/* Home */}
        <li className="flex items-center space-x-4">
          <FaHome className="text-xl" />
          <a href="/" className="text-lg hover:text-indigo-400">
            Home
          </a>
        </li>

        {/* News */}
        <li className="flex items-center space-x-4">
          <FaNewspaper className="text-xl" />
          <a href="/news" className="text-lg hover:text-indigo-400">
            News
          </a>
        </li>

        {/* Chat */}
        <li className="flex items-center space-x-4">
          <FaComments className="text-xl" />
          <a href="/chat" className="text-lg hover:text-indigo-400">
            Chat
          </a>
        </li>
        <li className="flex items-center space-x-4">
          <FaUserFriends className="text-xl" />
          <a href="/listfriend" className="text-lg hover:text-indigo-400">
            Friends
          </a>
        </li>

        {/* Đường kẻ giữa */}
        <li className="border-t border-gray-300 pt-4"></li>

        {/* Your Communities */}
        <li
          className="flex items-center space-x-4 cursor-pointer"
          onClick={toggleCommunities}
        >
          <span className="text-lg">Your Communities</span>
          <FaCaretDown
            className={`text-gray-600 ${
              isCommunitiesOpen ? "transform rotate-180" : ""
            }`}
          />
        </li>

        {/* Danh sách Communities */}
        {isCommunitiesOpen && (
          <ul className="pl-6 space-y-2">
            <li className="flex items-center space-x-4">
              <a
                href="/createcommunity"
                className="text-lg text-red-500 hover:text-red-600"
              >
                + Create Community
              </a>
            </li>

            {/* Hiển thị danh sách cộng đồng */}
            {communities.length > 0 ? (
              communities.map((community, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between space-x-2"
                >
                  <img
                    src={community.logo || defaultLogo}
                    alt={community.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <a
                    href={`/viewcommunity/${community._id}`}
                    className="text-lg hover:text-indigo-400 flex-1 truncate"
                  >
                    {community.name}
                  </a>
                  {community.role === "Moderator" && (
                    <span className="bg-green-100 text-green-600 text-xs font-semibold px-1 py-0.5 rounded whitespace-nowrap">
                      Moderator
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm">No communities found</li>
            )}

            <li className="flex items-center space-x-4">
              <FaGamepad className="text-xl" />
              <a href="#" className="text-lg hover:text-indigo-400">
                Games
              </a>
            </li>
            <li className="flex items-center space-x-4">
              <FaQuestionCircle className="text-xl" />
              <a href="#" className="text-lg hover:text-indigo-400">
                Q&A Questions
              </a>
            </li>
            <li className="flex items-center space-x-4">
              <FaBook className="text-xl" />
              <a href="#" className="text-lg hover:text-indigo-400">
                Education
              </a>
            </li>
          </ul>
        )}
      </ul>
    </aside>
  );
}
