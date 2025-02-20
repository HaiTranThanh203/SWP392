import React, { useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa'; // Import các icon
import avatar1 from '../assets/images/avatar1.png';
import avatar2 from '../assets/images/avatar2.png';
import avatar3 from '../assets/images/avatar3.png';
import avatar4 from '../assets/images/avatar4.png';
import avatar5 from '../assets/images/avatar5.png';
import avatar6 from '../assets/images/avatar6.png';
import avatar7 from '../assets/images/avatar7.png';

const ListFriends = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Quản lý trạng thái cửa sổ modal
  const [friendName, setFriendName] = useState(""); // Quản lý tên người bạn

  const openModal = (name) => {
    setFriendName(name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFriendName("");
  };

  return (
    <div className="flex space-x-10 p-6">
      {/* Danh sách bạn bè */}
      
      <div className="flex-1">
        <h2 className="font-semibold text-lg mb-4">List friends</h2>
        <div className="border-b border-gray-300 mb-4"></div> {/* Đường kẻ dưới "List friends" */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <img src={avatar1} alt="Funny" className="h-16 w-16 rounded-full" />
            <span className="ml-2">Funny</span>
            <FaTimes className="ml-2 text-red-500 cursor-pointer" onClick={() => openModal("Funny")} />
          </div>
          <div className="flex items-center justify-center">
            <img src={avatar2} alt="Leon Mark" className="h-16 w-16 rounded-full" />
            <span className="ml-2">Leon Mark</span>
            <FaTimes className="ml-2 text-red-500 cursor-pointer" onClick={() => openModal("Leon Mark")} />
          </div>
          <div className="flex items-center justify-center">
            <img src={avatar3} alt="Max Eng" className="h-16 w-16 rounded-full" />
            <span className="ml-2">Max Eng</span>
            <FaTimes className="ml-2 text-red-500 cursor-pointer" onClick={() => openModal("Max Eng")} />
          </div>
          <div className="flex items-center justify-center">
            <img src={avatar4} alt="Ann Li" className="h-16 w-16 rounded-full" />
            <span className="ml-2">Ann Li</span>
            <FaTimes className="ml-2 text-red-500 cursor-pointer" onClick={() => openModal("Ann Li")} />
          </div>
        </div>
      </div>

      <div className="border-l border-gray-300 px-6">
        {/* Danh sách mời */}
        <h2 className="font-semibold text-lg mb-4">Invitation</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img src={avatar5} alt="Sian" className="h-12 w-12 rounded-full" />
            <span className="ml-2">Sian</span>
            <FaCheck className="ml-2 text-green-500" />
            <FaTimes className="ml-2 text-red-500" />
          </div>
          <div className="flex items-center space-x-4">
            <img src={avatar6} alt="Hannah" className="h-12 w-12 rounded-full" />
            <span className="ml-2">Hannah</span>
            <FaCheck className="ml-2 text-green-500" />
            <FaTimes className="ml-2 text-red-500" />
          </div>
          <div className="flex items-center space-x-4">
            <img src={avatar7} alt="Max" className="h-12 w-12 rounded-full" />
            <span className="ml-2">Max</span>
            <FaCheck className="ml-2 text-green-500" />
            <FaTimes className="ml-2 text-red-500" />
          </div>
        </div>
      </div>

      {/* Cửa sổ Modal khi nhấn "X" */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-semibold">Are you sure to unfriend {friendName}?</h3>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
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
