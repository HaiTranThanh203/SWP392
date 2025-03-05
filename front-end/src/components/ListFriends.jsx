import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import {
  getUserFriendships,
  addFriend,
  rejectFriendRequest,
  acceptFriendRequest,
  unfriend,
} from '../services/friendshipService';

// Giả sử currentUserId được lấy từ context hoặc localStorage
const currentUserId = '67bedc8ed461839b30e51dfe';

const ListFriends = () => {
  // State quản lý danh sách bạn bè (đã kết bạn) và lời mời đang chờ
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  // State cho modal hủy kết bạn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  // State cho add friend (ví dụ nhập id hoặc username của friend cần thêm)
  const [friendToAdd, setFriendToAdd] = useState('');

  // Hàm lấy dữ liệu mối quan hệ của user
  const fetchFriendships = async () => {
    try {
      const res = await getUserFriendships(currentUserId);
      if (res.success) {
        setAcceptedFriends(res.accepted);
        setPendingInvitations(res.pending);
      }
    } catch (error) {
      console.error('Lỗi lấy danh sách mối quan hệ', error);
    }
  };

  useEffect(() => {
    fetchFriendships();
  }, []);

  // Hàm gọi API addFriend
  const handleAddFriend = async () => {
    if (!friendToAdd) return;
    try {
      // Gọi API gửi lời mời kết bạn, với currentUserId là người gửi
      await addFriend(currentUserId, friendToAdd);
      // Sau khi gửi thành công, làm mới danh sách
      fetchFriendships();
      setFriendToAdd('');
    } catch (error) {
      console.error('Lỗi gửi lời mời kết bạn', error);
    }
  };

  // Hàm gọi API unfriend khi xác nhận trong modal
  const handleUnfriend = async () => {
    if (!selectedFriend) return;
    try {
      // Gọi API hủy kết bạn với currentUserId và friend được chọn
      await unfriend(currentUserId, selectedFriend.friend._id);
      // Làm mới danh sách sau khi hủy kết bạn
      fetchFriendships();
      closeModal();
    } catch (error) {
      console.error('Lỗi hủy kết bạn', error);
    }
  };

  // Hàm gọi API để chấp nhận lời mời kết bạn
  const handleAcceptInvitation = async (friendship) => {
    try {
      // Ở đây, friend trong lời mời chính là người gửi, nên:
      await acceptFriendRequest(friendship.friend._id, currentUserId);
      fetchFriendships();
    } catch (error) {
      console.error('Lỗi chấp nhận lời mời kết bạn', error);
    }
  };

  // Hàm gọi API từ chối lời mời kết bạn
  const handleRejectInvitation = async (friendship) => {
    try {
      await rejectFriendRequest(friendship.friend._id, currentUserId);
      fetchFriendships();
    } catch (error) {
      console.error('Lỗi từ chối lời mời kết bạn', error);
    }
  };

  const openModal = (friendship) => {
    setSelectedFriend(friendship);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFriend(null);
  };

  return (
    <div className="p-6">
      {/* Phần thêm bạn mới */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Add Friend</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter user ID"
            value={friendToAdd}
            onChange={(e) => setFriendToAdd(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddFriend}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Friend
          </button>
        </div>
      </div>

      <div className="flex space-x-10">
        {/* Danh sách bạn bè đã kết */}
        <div className="flex-1">
          <h2 className="font-semibold text-lg mb-4">List Friends</h2>
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="grid grid-cols-2 gap-6">
            {acceptedFriends && acceptedFriends.length > 0 ? (
              acceptedFriends.map((friendship) => (
                <div
                  key={friendship.friend._id}
                  className="flex items-center justify-center"
                >
                  <img
                    src={friendship.friend.avatar || '/default-avatar.png'}
                    alt={friendship.friend.displayName || friendship.friend.username}
                    className="h-16 w-16 rounded-full"
                  />
                  <span className="ml-2">
                    {friendship.friend.displayName || friendship.friend.username}
                  </span>
                  <FaTimes
                    className="ml-2 text-red-500 cursor-pointer"
                    onClick={() => openModal(friendship)}
                  />
                </div>
              ))
            ) : (
              <div>Không có bạn bè nào</div>
            )}
          </div>
        </div>

        {/* Danh sách lời mời kết bạn */}
        <div className="border-l border-gray-300 px-6">
          <h2 className="font-semibold text-lg mb-4">Invitation</h2>
          <div className="space-y-4">
            {pendingInvitations && pendingInvitations.length > 0 ? (
              pendingInvitations.map((friendship) => (
                <div
                  key={friendship.friend._id}
                  className="flex items-center space-x-4"
                >
                  <img
                    src={friendship.friend.avatar || '/default-avatar.png'}
                    alt={friendship.friend.displayName || friendship.friend.username}
                    className="h-12 w-12 rounded-full"
                  />
                  <span className="ml-2">
                    {friendship.friend.displayName || friendship.friend.username}
                  </span>
                  <FaCheck
                    className="ml-2 text-green-500 cursor-pointer"
                    onClick={() => handleAcceptInvitation(friendship)}
                  />
                  <FaTimes
                    className="ml-2 text-red-500 cursor-pointer"
                    onClick={() => handleRejectInvitation(friendship)}
                  />
                </div>
              ))
            ) : (
              <div>Không có lời mời nào</div>
            )}
          </div>
        </div>
      </div>

      {/* Modal xác nhận hủy kết bạn */}
      {isModalOpen && selectedFriend && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-semibold">
              Are you sure to unfriend{' '}
              {selectedFriend.friend.displayName || selectedFriend.friend.username}?
            </h3>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                onClick={handleUnfriend}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListFriends;
