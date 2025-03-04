import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaThumbsUp, FaThumbsDown, FaComment, FaCalendarAlt, FaGlobeAmericas } from "react-icons/fa";
import avatar1 from "../assets/images/avatar1.png"; // Ảnh giả định, bạn có thể thay đổi sau
import axios from "axios";

const ViewCommunity = () => {
  const [posts, setPosts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Fetch dữ liệu từ backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/posts"); // Đổi URL theo backend của bạn
        setPosts(res.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gray-300 p-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={avatar1} alt="Group Avatar" className="h-24 w-24 rounded-full border-4 border-white" />
          <h1 className="font-semibold text-lg">FU Market</h1>
        </div>
        <div className="flex space-x-4">
          <button className="bg-white border-2 border-gray-600 text-gray-800 py-2 px-4 rounded-md text-sm hover:bg-gray-100">
            + Create Post
          </button>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-md text-sm hover:bg-orange-500">
            + Join
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Post Section */}
        <div className="flex-1 p-6 space-y-6">
          {posts.map((post, index) => (
            <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-2">
                <img
                  src={post.userId?.avatar || avatar1}
                  alt="User Avatar"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h2 className="font-semibold text-lg">{post.userId?.name || "Unknown User"}</h2>
                  <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
                <div className="ml-auto relative">
                  <FaEllipsisV
                    className="text-gray-600 cursor-pointer rotate-90"
                    onClick={() => toggleDropdown(index)}
                  />
                  {dropdownOpen === index && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 text-sm text-gray-700">
                      <ul>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Save post</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Report post</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{post.content}</p>
              {post.media.length > 0 && <img src={post.media[0]} alt="Post Media" className="mt-4 w-32 h-32 object-cover" />}
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-1 text-gray-500">
                  <FaThumbsUp className="text-lg" />
                  <span className="text-sm">{Object.values(post.votes || {}).filter(v => v === true).length}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <FaThumbsDown className="text-lg" />
                  <span className="text-sm">{Object.values(post.votes || {}).filter(v => v === false).length}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <FaComment className="text-lg" />
                  <span className="text-sm">{post.commentCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-200 p-6 shadow-md space-y-8">
          <h2 className="font-semibold text-xl text-gray-800">FU Market - 52M Members</h2>
          <p className="text-sm text-gray-500">You can share and search for the item you are looking for.</p>
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
