import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, toggleUserStatus } from '../../services/UserAdminService';
import { message } from 'antd';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(false);

  useEffect(() => {
    async function fetchUserDetail() {
      try {
        setLoading(true);
        const response = await getUserById(id);
        console.log("User Detail Response:", response);
        // Giả sử response.data chứa chi tiết của user
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user detail:", error);
        message.error("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    }
    fetchUserDetail();
  }, [id]);

  const handleToggleStatus = async () => {
    try {
      setToggleLoading(true);
      const res = await toggleUserStatus(id);
      console.log("Toggle Status Response:", res);
      message.success("User status updated successfully.");
      // Sau khi toggle, reload lại chi tiết user
      const response = await getUserById(id);
      setUser(response.data);
    } catch (error) {
      console.error("Error toggling user status:", error);
      message.error("Failed to update user status.");
    } finally {
      setToggleLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-xl">Loading...</div>;
  if (!user) return <div className="p-8 text-center text-xl">User not found</div>;

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <div className="text-2xl font-bold text-center mb-6">User Detail</div>
      <div className="flex items-center mb-6">
        <img
          src={user.image || 'https://via.placeholder.com/80'}
          alt={user.username}
          className="w-20 h-20 rounded-full mr-4"
        />
        <div className="text-xl font-medium">{user.username}</div>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Email:</span> {user.email}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Username:</span> {user.username}
      </div>
      <div className="mb-4">
        <span className="font-semibold">ID:</span> {user._id || user.id}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Phone:</span> {user.phone || 'N/A'}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Role:</span> {user.role}
      </div>
      <div className="mb-6">
        <span className="font-semibold">Status:</span>{" "}
        <span className={`font-semibold ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
          {user.isActive ? 'Active' : 'DeActive'}
        </span>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none"
        >
          Back
        </button>
        <button
          onClick={handleToggleStatus}
          disabled={toggleLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none"
        >
          {toggleLoading ? 'Processing...' : 'Toggle Status'}
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
