import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaSearch } from 'react-icons/fa';
import avatarDefault from '../assets/images/avatar1.png';
import socket from '../services/socketClient';
import { toast } from 'react-toastify';
import { getFriends } from '../services/friendshipService'; // Hàm lấy danh sách bạn bè
import { sendMessage, getMessages } from '../services/MessageService';


const Chat = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?.id;

  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Use a ref to always have the latest selectedFriend inside our socket listener
  const selectedFriendRef = useRef(selectedFriend);
  useEffect(() => {
    selectedFriendRef.current = selectedFriend;
  }, [selectedFriend]);

  // Fetch friend list
  const fetchFriends = async () => {
    try {
      const res = await getFriends(currentUserId);
      setFriends(res.data);
      if (res.data.length > 0) {
        setSelectedFriend(res.data[0]);
      }
    } catch (error) {
      toast.error('Error fetching friends: ' + error.message);
    }
  };

  // Fetch messages between current user and friend
  const fetchMessages = async (friendId) => {
    try {
      const res = await getMessages(currentUserId, friendId);
      setMessages(res.data);
    } catch (error) {
      toast.error('Error fetching messages: ' + error.message);
    }
  };

  // On component mount, fetch friends and join current user room
  useEffect(() => {
    if (currentUserId) {
      fetchFriends();
      socket.emit('joinRoom', currentUserId);
    }
  }, [currentUserId]);

  // When selectedFriend changes, fetch messages for that conversation
  useEffect(() => {
    if (selectedFriend) {
      fetchMessages(selectedFriend._id);
    }
  }, [selectedFriend]);

  // Set up a persistent socket listener for new messages
  useEffect(() => {
    const handleNewMessage = (newMsg) => {
      // Check if new message belongs to the current conversation
      if (
        selectedFriendRef.current &&
        (
          (newMsg.sender === currentUserId && newMsg.recipient === selectedFriendRef.current._id) ||
          (newMsg.sender === selectedFriendRef.current._id && newMsg.recipient === currentUserId)
        )
      ) {
        setMessages((prev) => [...prev, newMsg]);
      }
    };

    socket.on('newMessage', handleNewMessage);
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [currentUserId]); // no dependency on selectedFriend because we use a ref

  // Send message handler
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedFriend) return;
    try {
      const res = await sendMessage(currentUserId, selectedFriend._id, message);
      // Optionally update messages immediately (the sender will receive newMessage as well)
      setMessages((prev) => [...prev, res.data]);
      setMessage('');
    } catch (error) {
      toast.error('Error sending message: ' + error.message);
    }
  };

  // Filter friends based on search term
  const filteredFriends = friends.filter((friend) => {
    const friendName = friend.displayName || friend.username;
    return friendName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar: Friend list with search */}
      <div className="w-1/4 bg-gray-100 p-4 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-700">Friends</h2>
        <div className="mt-4 flex items-center bg-white border border-gray-300 p-2 rounded-md">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search friend..."
            className="bg-transparent w-full outline-none text-gray-600 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="mt-4 space-y-2 overflow-y-auto flex-1">
          {filteredFriends.map((friend) => (
            <li
              key={friend._id}
              onClick={() => setSelectedFriend(friend)}
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md ${
                selectedFriend && friend._id === selectedFriend._id ? 'bg-gray-200' : ''
              }`}
            >
              <img
                src={friend.avatar || avatarDefault}
                alt={friend.displayName || friend.username}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm text-gray-700">
                {friend.displayName || friend.username}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex-1 bg-white flex flex-col p-4">
        {/* Header: Selected friend info */}
        <div className="flex items-center border-b border-gray-300 pb-2">
          <img
            src={selectedFriend ? (selectedFriend.avatar || avatarDefault) : avatarDefault}
            alt={selectedFriend ? selectedFriend.displayName || selectedFriend.username : ''}
            className="h-10 w-10 rounded-full mr-3"
          />
          <h2 className="text-base font-semibold text-gray-700">
            {selectedFriend
              ? selectedFriend.displayName || selectedFriend.username
              : 'Select a friend'}
          </h2>
        </div>

        {/* Message list */}
        <div className="flex-1 mt-4 space-y-2 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === currentUserId ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-1 rounded-lg text-white ${
                    msg.sender === currentUserId ? 'bg-orange-400' : 'bg-gray-400'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-gray-200">{msg.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages</p>
          )}
        </div>

        {/* Message input form */}
        <form onSubmit={handleSendMessage} className="mt-2 pt-2 border-t border-gray-300 flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mr-3 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

