import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle, FaPlusCircle } from 'react-icons/fa';

const SearchByCommunity = () => {
  const location = useLocation();
  const searchResults = location.state?.results || []; // Lấy danh sách từ Header

  const [groups, setGroups] = useState(searchResults);

  useEffect(() => {
    setGroups(searchResults);
  }, [searchResults]);

  const toggleJoinGroup = (id) => {
    setGroups(groups.map(group =>
      group.id === id ? { ...group, joined: !group.joined } : group
    ));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto w-full border border-gray-200">
    <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-indigo-500 pb-2">Community Search Results</h2>
    {groups.length > 0 ? (
        <table className="w-full table-auto">
            <thead>
                <tr className="bg-indigo-50 text-indigo-700 text-left text-sm font-semibold uppercase tracking-wider">
                    <th className="py-4 px-6">Avatar</th>
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Members</th>
                    <th className="py-4 px-6">Description</th>
                    <th className="py-4 px-6 text-right">Action</th>
                </tr>
            </thead>
            <tbody>
                {groups.map((group, index) => (
                    <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                        <td className="py-6 px-6">
                            <img
                                src={group.image}
                                alt={group.name}
                                className="h-16 w-16 rounded-full object-cover border-2 border-indigo-200 hover:scale-105 transition-transform duration-300"
                            />
                        </td>
                        <td className="py-6 px-6">
                            <span className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                                {group.name}
                            </span>
                        </td>
                        <td className="py-6 px-6">
                            <p className="text-md text-gray-600">{group.memberCount} members</p>
                        </td>
                        <td className="py-6 px-6">
                            <p className="text-md text-gray-600">{group.description}</p>
                        </td>
                        <td className="py-6 px-6 text-right">
                            <button
                                onClick={() => toggleJoinGroup(group.id)}
                                className={`flex items-center justify-center space-x-2 px-6 py-3 text-md font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${group.joined
                                    ? 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
                                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:ring-blue-300'
                                    } text-white shadow-md`}
                            >
                                {group.joined ? <FaCheckCircle className="text-md" /> : <FaPlusCircle className="text-md" />}
                                <span>{group.joined ? 'Joined' : 'Join'}</span>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <p className="text-gray-500 text-center py-10 text-xl font-medium bg-gray-50 rounded-lg">No communities found</p>
    )}
</div>
  );
};

export default SearchByCommunity;
