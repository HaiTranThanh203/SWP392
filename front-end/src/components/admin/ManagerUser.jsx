import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getListUser, toggleUserStatus } from '../../services/UserAdminService';
import { message } from 'antd';

export default function ManagerUser() {
  // State lưu dữ liệu và các tham số phân trang/tìm kiếm
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [inactiveUsersCount, setInactiveUsersCount] = useState(0);



  // Hàm fetchData được định nghĩa bên ngoài useEffect để có thể gọi lại sau khi toggle status
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Gọi API với các tham số truyền vào
      const response = await getListUser(page, limit, '', searchQuery, searchQuery);
      console.log("Response:", response);
      // Giả sử API trả về: { results, total, totalPages, activeUsersCount, inactiveUsersCount, data: [...] }
      setUsers(response.data);
      setTotalPages(response.totalPages);
      setTotalUsers(response.total);
      setActiveUsersCount(response.activeUsersCount);
      setInactiveUsersCount(response.inactiveUsersCount);
    } catch (error) {
      console.error('Error fetching user list:', error);
      message.error('Error fetching user list');
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handler cho ô tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  // Handler thay đổi limit hiển thị
  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  // Handler chuyển trang
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Handler toggle status của user
  const handleToggleStatus = async (userId) => {
    try {
      await toggleUserStatus(userId);
      message.success('User status updated successfully');
      // Sau khi toggle, gọi lại API để reload danh sách
      fetchData();
    } catch (error) {
      console.error("Error toggling user status:", error);
      message.error("Error toggling user status");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">User Management</h1>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-xl font-semibold">Total Accounts</p>
            <p className="text-4xl mt-2">{totalUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-xl font-semibold text-green-600">Active Accounts</p>
            <p className="text-4xl mt-2">{activeUsersCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-xl font-semibold text-red-600">Deactive Accounts</p>
            <p className="text-4xl mt-2">{inactiveUsersCount}</p>
          </div>
        </div>
        
        {/* Search & Limit Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by username or email..."
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0"
          />
          <div>
            <label htmlFor="limit" className="mr-2 font-medium">Show</label>
            <select
              id="limit"
              value={limit}
              onChange={handleLimitChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
            </select>
          </div>
        </div>
        
        {/* User Table */}
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : (
          <>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user._id || user.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">{(page - 1) * limit + index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={user.image || "https://via.placeholder.com/50"}
                          alt={user.username}
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.isActive ? 'Active' : 'DeActive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleStatus(user._id || user.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none"
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevPage}
                disabled={page <= 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
              >
                Prev
              </button>
              <span className="text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
