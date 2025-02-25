import React, { useState } from 'react';
import { FaUserPlus, FaCheckCircle } from 'react-icons/fa'; // Icons cho button
import avatar1 from '../assets/images/avatar1.png';  // Thêm đường dẫn avatar
import avatar2 from '../assets/images/avatar2.png';
import avatar3 from '../assets/images/avatar3.png';

const AddFriends = () => {
  const friends = [
    { name: 'Sian', status: 'Friend', isAdded: true, avatar: avatar1 },
    { name: 'Sian Nguyen', status: 'Add friend', isAdded: false, avatar: avatar2 },
    { name: 'Lee Sian', status: 'Add friend', isAdded: false, avatar: avatar3 },
  ];

  const [friendsList, setFriendsList] = useState(friends);

  const handleAddFriend = (name) => {
    setFriendsList(friendsList.map(friend =>
      friend.name === name ? { ...friend, isAdded: !friend.isAdded } : friend
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {friendsList.map((friend, index) => (
        <div key={index} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <img src={friend.avatar} alt={friend.name} className="h-10 w-10 rounded-full" />
            <span className="text-lg">{friend.name}</span>
          </div>
          <button
            onClick={() => handleAddFriend(friend.name)}
            className={`flex items-center space-x-2 text-white px-4 py-1 text-sm rounded-full ${friend.isAdded ? 'bg-green-500' : 'bg-blue-500'}`}
          >
            {friend.isAdded ? <FaCheckCircle className="text-sm" /> : <FaUserPlus className="text-sm" />}
            <span>{friend.status}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddFriends;
