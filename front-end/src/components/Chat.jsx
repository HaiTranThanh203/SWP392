import React, { useState } from 'react';
import { FaSearch, FaPaperPlane } from 'react-icons/fa'; // Các icon tìm kiếm và gửi tin nhắn
import avatar from '../assets/images/avatar1.png'; // Avatar sử dụng chung cho tất cả người dùng

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState('Bailey');
  const [message, setMessage] = useState('');

  const users = [
    { name: 'Bailey', id: 1 },
    { name: 'funny', id: 2 },
    { name: 'Sarah', id: 3 },
  ];

  const messages = {
    Bailey: [
      { sender: 'Bailey', text: 'Hello! How are you, today?', time: '1 hr ago' },
      { sender: 'You', text: 'I\'m good. What\'re you doing?', time: '1 hr ago' },
      { sender: 'Bailey', text: 'I\'m doing my homework. How about you?', time: '30 min ago' },
      { sender: 'You', text: 'I\'m playing board game.', time: '30 min ago' },
    ],
    funny: [
      { sender: 'funny', text: 'Hey! What\'s up?', time: '2 hr ago' },
      { sender: 'You', text: 'Not much, just chilling.', time: '2 hr ago' },
    ],
    Sarah: [
      { sender: 'Sarah', text: 'Hi! How was your day?', time: '3 hr ago' },
      { sender: 'You', text: 'It was good, just relaxing.', time: '3 hr ago' },
    ],
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Thêm tin nhắn mới vào danh sách (chỉ ở phía người dùng)
      const newMessage = { sender: 'You', text: message, time: 'Just now' };
      messages[selectedUser].push(newMessage);
      setMessage('');
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-700">Search</h2>
        <div className="flex items-center bg-white border border-gray-300 p-2 rounded-md mt-4">
          <FaSearch className="text-gray-400 mr-2" />
          <input type="text" placeholder="Search" className="bg-transparent w-full outline-none text-gray-600" />
        </div>
        <ul className="mt-6 space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => setSelectedUser(user.name)}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md"
            >
              <img src={avatar} alt={user.name} className="h-10 w-10 rounded-full" />
              <span className="text-gray-700">{user.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex-1 bg-white p-6">
        <div className="flex items-center border-b border-gray-300 pb-4">
          <img src={avatar} alt={selectedUser} className="h-12 w-12 rounded-full mr-4" />
          <h2 className="text-lg font-semibold text-gray-700">{selectedUser}</h2>
        </div>
        <div className="mt-6 space-y-4">
          {messages[selectedUser].map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg text-white ${msg.sender === 'You' ? 'bg-orange-400' : 'bg-gray-400'}`}>
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs text-gray-200">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex items-center mt-4 border-t border-gray-300 pt-4">
          <input
            type="text"
            placeholder="Texting ............"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mr-4"
          />
          <button type="submit" className="bg-500 text-dark p-2 rounded-full hover:bg-yellow-600">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
