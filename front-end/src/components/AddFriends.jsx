import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaUserPlus, FaCheckCircle } from 'react-icons/fa';
import frogImage from "../assets/images/Avatar.png";
const AddFriends = () => {
  const location = useLocation();
  const searchResults = location.state?.results || []; // Nhận kết quả tìm kiếm từ Header

  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setFriendsList(searchResults.map(user => ({ ...user, isAdded: false })));
    }
  }, [searchResults]);

  const handleAddFriend = (username) => {
    setFriendsList(friendsList.map(friend =>
      friend.username === username ? { ...friend, isAdded: !friend.isAdded } : friend
    ));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto w-full border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-indigo-500 pb-2">Search Results</h2>
      {friendsList.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-indigo-50 text-indigo-700 text-left text-sm font-semibold uppercase tracking-wider">
              <th className="py-4 px-6">Avatar</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {friendsList.map((friend, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-6 px-6">
                  <img
                    src={friend.avatar}
                    alt={friend.username}
                    className="h-16 w-16 rounded-full object-cover border-2 border-indigo-200 hover:scale-105 transition-transform duration-300"
                  />
                </td>
                <td className="py-6 px-6">
                  <span className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                    {friend.displayName || friend.username}
                  </span>
                </td>
                <td className="py-6 px-6">
                  <p className="text-md text-gray-600">{friend.email}</p>
                </td>
                <td className="py-6 px-6 text-right">
                  <button
                    onClick={() => handleAddFriend(friend.username)}
                    className={`flex items-center justify-center space-x-2 px-6 py-3 text-md font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${friend.isAdded
                        ? 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:ring-blue-300'
                      } text-white shadow-md`}
                  >
                    {friend.isAdded ? <FaCheckCircle className="text-md" /> : <FaUserPlus className="text-md" />}
                    <span>{friend.isAdded ? 'Friend' : 'Add Friend'}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center py-10 text-xl font-medium bg-gray-50 rounded-lg">No users found</p>
      )}
    </div>
  );
};

export default AddFriends;
