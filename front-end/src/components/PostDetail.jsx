import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaComment, FaReply, FaEllipsisV, FaPaperPlane } from 'react-icons/fa'; // Icons for like, dislike, comment, reply, send
import avatar1 from '../assets/images/avatar1.png';
import avatar2 from '../assets/images/avatar2.png';
import avatar3 from '../assets/images/avatar3.png';
import bag from '../assets/images/bag.png';

const PostDetail = () => {
  const [postDropdownOpen, setPostDropdownOpen] = useState(false); // State for post dropdown
  const [commentDropdownOpen, setCommentDropdownOpen] = useState(null); // State for comment dropdown
  const [replyDropdownOpen, setReplyDropdownOpen] = useState(null); // State for reply dropdown
  const [comment, setComment] = useState(""); // State to handle comment input
  const [comments, setComments] = useState([
    {
      user: "Sian Nguyen",
      time: "1 hr ago",
      content: "I like your post. I would like to share my journey.",
      replies: [
        {
          user: "Hannah",
          time: "18 minutes ago",
          content: "So interesting!",
        },
      ],
    },
  ]); // State to handle comments and replies

  const handleAddComment = (e) => {
    e.preventDefault();
    // Add a new comment
    setComments([
      ...comments,
      {
        user: "You", // Example, replace with actual user
        time: "Just now",
        content: comment,
        replies: [],
      },
    ]);
    setComment(""); // Reset the input field
  };

  const handleAddReply = (parentIndex, replyContent) => {
    const updatedComments = [...comments];
    updatedComments[parentIndex].replies.push({
      user: "You", // Example, replace with actual user
      time: "Just now",
      content: replyContent,
    });
    setComments(updatedComments);
  };

  // Toggle functions for each dropdown
  const togglePostDropdown = () => setPostDropdownOpen(!postDropdownOpen);
  const toggleCommentDropdown = (index) => setCommentDropdownOpen(commentDropdownOpen === index ? null : index);
  const toggleReplyDropdown = (index) => setReplyDropdownOpen(replyDropdownOpen === index ? null : index);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Post Detail Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <img src={avatar2} alt="User Avatar" className="h-12 w-12 rounded-full" />
          <div>
            <h2 className="font-semibold text-lg">funny</h2>
            <p className="text-xs text-gray-500">2 hr ago</p>
          </div>
          <div className="ml-auto relative">
            <FaEllipsisV
              className="text-gray-600 cursor-pointer rotate-90"
              onClick={togglePostDropdown}
            />
            {postDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 text-sm text-gray-700">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Save post</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Report post</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <p className="mt-2 text-gray-700">I’m looking for this bag. Contact me via this account.</p>
        <img src={bag} alt="Bag" className="mt-4 w-32 h-32 object-cover" />
        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center space-x-1 text-gray-500">
            <FaThumbsUp className="text-lg" />
            <span className="text-sm">15K</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <FaThumbsDown className="text-lg" />
            <span className="text-sm">1K</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <FaComment className="text-lg" />
            <span className="text-sm">80</span>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <form onSubmit={handleAddComment} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            type="submit"
            className="bg-500 text-dark py-2 px-4 rounded-md text-sm hover:bg-orange-400 transition duration-300">
            <FaPaperPlane className="inline-block mr-2" />
          </button>
        </form>

        {/* Comments */}
        <div className="mt-6 space-y-4">
          {comments.map((comment, index) => (
            <div key={index}>
              {/* Main Comment */}
              <div className="flex items-center space-x-2">
                <img src={avatar3} alt="User Avatar" className="h-8 w-8 rounded-full" />
                <div>
                  <h3 className="font-semibold text-sm">{comment.user}</h3>
                  <p className="text-xs text-gray-500">{comment.time}</p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                  <div className="flex items-center space-x-2 text-gray-500 text-xs mt-1">
                    <FaReply className="text-sm" />
                    <span>Reply</span>
                  </div>
                </div>
                {/* Ellipsis for comment dropdown */}
                <div className="ml-auto relative" rotate-90>
                  <FaEllipsisV
                    className="text-gray-600 cursor-pointer rotate-90"
                    onClick={() => toggleCommentDropdown(index)}
                  />
                  {commentDropdownOpen === index && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 text-sm text-gray-700">
                      <ul>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Report Comment</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Replies */}
              <div className="ml-8 space-y-2 mt-4">
                {comment.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} className="flex items-center space-x-2">
                    <img src={avatar1} alt="Reply Avatar" className="h-8 w-8 rounded-full" />
                    <div>
                      <h3 className="font-semibold text-sm">{reply.user}</h3>
                      <p className="text-xs text-gray-500">{reply.time}</p>
                      <p className="text-sm text-gray-700">{reply.content}</p>
                    </div>
                    {/* Ellipsis for reply dropdown */}
                    <div className="ml-auto relative">
                      <FaEllipsisV
                        className="text-gray-600 cursor-pointer rotate-90"
                        onClick={() => toggleReplyDropdown(replyIndex)}
                      />
                      {replyDropdownOpen === replyIndex && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 text-sm text-gray-700">
                          <ul>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Report Comment</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
