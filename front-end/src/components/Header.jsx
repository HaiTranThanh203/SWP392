import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaBell, FaUserAlt, FaCaretDown } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import { searchCommunities, searchUsers } from "../services/SeachService";

export default function Header() {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Community");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!query) return;

    let results = [];
    let path = "";

    if (selectedFilter === "Community") {
      path = "/search-community";
      results = await searchCommunities(query);
    } else if (selectedFilter === "Friends") {
      path = "/addfriends";
      results = await searchUsers(query);
    }

    console.log("Search results:", results); // Debug xem có dữ liệu không

    if (results && results.data) {
      navigate(`${path}?query=${query}`, { state: { results: results.data } }); // Truyền kết quả qua state
    }
  };


  return (
    <header className="bg-white p-4 shadow-md flex items-center justify-between w-full">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-8" />
        <h1 className="text-orange-500 text-xl font-semibold">FPT Student Space</h1>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="flex items-center space-x-4 mx-auto">

        <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full p-2 w-96">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { // Thêm xử lý sự kiện onKeyDown
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="bg-transparent border-none outline-none placeholder-gray-400 text-gray-600 w-full"
          />
          <FaSearch
            className="text-gray-400 text-xl cursor-pointer"
            onClick={handleSearch} // Thêm xử lý sự kiện onClick
          />
        </div>

        {/* Dropdown chọn bộ lọc */}
        <div className="relative">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md inline-flex items-center w-32 justify-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedFilter} <FaCaretDown className="ml-2" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg">
              <ul>
                <li
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => { setSelectedFilter("Friends"); setIsDropdownOpen(false); }}
                >
                  Friends
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => { setSelectedFilter("Community"); setIsDropdownOpen(false); }}
                >
                  Community
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Các nút điều hướng */}
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 text-xl cursor-pointer" />

        <button className="bg-white border border-gray-400 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300">
          Create Post
        </button>

        <Link to="/profile">
          <FaUserAlt className="text-gray-600 text-xl cursor-pointer" />
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
