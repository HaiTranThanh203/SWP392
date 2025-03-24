import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown, FaComment, FaPaperPlane, FaShare } from "react-icons/fa";
import avatarDefault from "../assets/images/avatar2.png";
import { doGetAllPost, doVotePost } from "../services/PostService";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyInput, setReplyInput] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});


  // Lấy user & token từ localStorage
  const token = localStorage.getItem("token") || "";
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    if (!token || !user) {
      setError("You are not logged in!");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        console.log("Fetching post with postId:", postId);

        const postRes = await axios.get(`http://localhost:9999/api/v1/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (postRes.data && postRes.data.data) {
          setPost(postRes.data.data);
        } else {
          setError("Failed to load the post.");
        }

        console.log("Fetching comments...");
        try {
          const commentRes = await axios.get(`http://localhost:9999/api/v1/comments/get-by-post/${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const formatNestedComments = (comments) => {
            const commentMap = new Map();
            comments.forEach((comment) => commentMap.set(comment._id, { ...comment, childrens: [] }));

            comments.forEach((comment) => {
              if (comment.parentId && commentMap.has(comment.parentId)) {
                commentMap.get(comment.parentId).childrens.push(comment);
              }
            });

            return Array.from(commentMap.values()).filter(comment => !comment.parentId);
          };

          setComments(formatNestedComments(commentRes.data?.data || []));

        } catch (error) {
          console.warn("No comments found, setting empty list.");
          setComments([]);
        }

      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error);
        setError("Failed to load data from the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);
  
  const handleReplyComment = async (parentId) => {
    if (!replyInput[parentId]?.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:9999/api/v1/comments/reply",
        {
          userId: user.id,
          postId,
          parentId,
          content: replyInput[parentId],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        console.log("✅ Reply Comment Success:", response.data.data);

        setComments((prevComments) => {
          const updateComments = (comments) => {
            return comments.map((comment) => {
              if (comment._id === parentId) {
                return {
                  ...comment,
                  childrens: [
                    ...(comment.childrens || []),
                    {
                      ...response.data.data,
                      userId: {
                        _id: user.id,
                        username: user.username,
                        avatar: user.avatar || avatarDefault,
                      },
                    },
                  ],
                };
              } else if (comment.childrens && comment.childrens.length > 0) {
                return { ...comment, childrens: updateComments(comment.childrens) };
              }
              return comment;
            });
          };

          return updateComments(prevComments);
        });

        setReplyInput({ ...replyInput, [parentId]: "" });
        setShowReplyInput({ ...showReplyInput, [parentId]: false });
      }
    } catch (error) {
      console.error("❌ Error replying to comment:", error.response?.data || error);
    }
  };



  const handleVote = async (voteType) => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if (!post || !user) return;
  
    // Check if the user is already voting the same way
    let newVote = voteType;
    if (post.votes?.[user.id] === voteType) {
      newVote = "none";  // If the user is clicking the same button again, remove the vote
    }
  
    // Optimistically update the UI immediately
    const updatedVotes = { ...post.votes };
    if (newVote === "true") {
      updatedVotes[user.id] = "true";  // User voted up
    } else if (newVote === "false") {
      updatedVotes[user.id] = "false";  // User voted down
    } else {
      delete updatedVotes[user.id];  // Remove the user's vote
    }
  
    // Recalculate upvotes and downvotes
    let upVotes = 0;
    let downVotes = 0;
    Object.values(updatedVotes).forEach((vote) => {
      if (vote === "true") upVotes += 1;
      if (vote === "false") downVotes += 1;
    });
  
    // Update the state immediately without waiting for the API call
    setPost({
      ...post,
      votes: updatedVotes,
      upVotes,    // Updated upvotes count
      downVotes,  // Updated downvotes count
    });
  
    try {
      // Now make the backend API call
      const response = await doVotePost(postId, newVote);  // Correctly use doVotePost function
  
      if (response.success) {
        console.log("Vote updated successfully!");
        // If the backend call is successful, update the state with any additional changes, if necessary
        setPost((prevPost) => ({
          ...prevPost,
          upVotes,    // Ensure the correct upvotes count after the backend response
          downVotes,  // Ensure the correct downvotes count after the backend response
          votes: response.votes,  // Update the votes map from the backend
        }));
      }
    } catch (error) {
      console.error("Error voting:", error);
      // Optionally, you can revert the optimistic update if the API call fails
    }
  };
  
  
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    if (!user || !user.id) {
      console.error("Error: User ID not found in localStorage.");
      return;
    }

    try {
      console.log("Submitting comment:", { postId, userId: user.id, content: commentInput });

      const response = await axios.post(
        "http://localhost:9999/api/v1/comments",
        {
          postId,
          userId: user.id,
          content: commentInput,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201 && response.data && response.data.data) {
        console.log("Comment successfully posted:", response.data.data);

        setComments((prevComments) => [
          {
            ...response.data.data,
            userId: {
              _id: user.id,
              username: user.username,
              avatar: user.avatar || avatarDefault,
            },
          },
          ...prevComments,
        ]);

        setCommentInput("");
      } else {
        console.error("Unexpected API response:", response);
      }
    } catch (error) {
      console.error("Error posting comment:", error.response ? error.response.data : error);
    }
  };

  const handleVoteComment = async (commentId, type) => {
    if (!user) return;

    try {
      const response = await axios.patch(
        `http://localhost:9999/api/v1/comments/${commentId}/vote`,
        { userId: user.id, vote: type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setComments((prevComments) => {
          const updateVotes = (comments) => {
            return comments.map((comment) => {
              if (comment._id === commentId) {
                return {
                  ...comment,
                  upVotes: response.data.data.upVotes,
                  downVotes: response.data.data.downVotes
                };
              } else if (comment.childrens && comment.childrens.length > 0) {
                return { ...comment, childrens: updateVotes(comment.childrens) };
              }
              return comment;
            });
          };
          return updateVotes(prevComments);
        });
      }
    } catch (error) {
      console.error("❌ Error voting comment:", error.response?.data || error);
    }
  };

// Function to count comments, including replies
const countComments = (comments) => {
  let totalComments = comments.length;

  // Traverse through each comment's children and count them
  comments.forEach((comment) => {
    if (comment.childrens && comment.childrens.length > 0) {
      totalComments += countComments(comment.childrens);  // Recursively count replies
    }
  });

  return totalComments;
};

const renderComments = (comments, parentId = null) => {
  return comments
    .filter(comment => comment.parentId === parentId || (!comment.parentId && !parentId))
    .map((comment) => (
      <div key={comment._id} className="ml-4 mt-2 pl-4">
        <div className="flex items-center space-x-2">
          <img src={comment.userId?.avatar || avatarDefault} alt="User Avatar" className="h-8 w-8 rounded-full" />
          <div>
            <h3 className="font-semibold text-sm">{comment.userId?.username || "Anonymous"}</h3>
            <p className="text-sm text-gray-700">{comment.content}</p>
          </div>
        </div>

        {/* Like / Dislike buttons for the comment */}
        <div className="flex items-center space-x-4 mt-2 text-gray-600">
          <button onClick={() => handleVoteComment(comment._id, "like")} className="flex items-center space-x-1">
            <FaThumbsUp className="text-lg" /> <span>{comment.upVotes ?? 0}</span>
          </button>
          <button onClick={() => handleVoteComment(comment._id, "dislike")} className="flex items-center space-x-1">
            <FaThumbsDown className="text-lg" /> <span>{comment.downVotes ?? 0}</span>
          </button>
        </div>

        {/* Reply button */}
        <button
          onClick={() => setShowReplyInput({ ...showReplyInput, [comment._id]: !showReplyInput[comment._id] })}
          className="text-blue-500 text-sm mt-1 flex items-center"
        >
          <FaComment className="mr-1" /> Reply
        </button>

        {/* Input for reply */}
        {showReplyInput[comment._id] && (
          <div className="ml-8 mt-2">
            <input
              type="text"
              placeholder="Reply..."
              value={replyInput[comment._id] || ""}
              onChange={(e) => setReplyInput({ ...replyInput, [comment._id]: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              onClick={() => handleReplyComment(comment._id)}
              className="bg-blue-500 text-white py-1 px-3 rounded-md text-xs mt-1"
            >
              Send Reply
            </button>
          </div>
        )}

        {/* Recursively render child comments (replies) */}
        {comment.childrens && comment.childrens.length > 0 && (
          <div className="ml-6">{renderComments(comment.childrens, comment._id)}</div>
        )}
      </div>
    ));
};

// Update the total comment count to include all replies
const totalComments = countComments(comments);  // Get total comments count including replies

  if (loading) return <p className="text-center text-gray-500">Loading post...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {post ? (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <img
                src={post.userId && post.userId.avatar ? post.userId.avatar : avatarDefault}
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h2 className="font-semibold text-lg">
                  {post.userId && post.userId.username ? post.userId.username : "Anonymous"}
                </h2>
              </div>
            </div>
            <p className="mt-2 text-gray-700">{post.content || "No content available"}</p>

            {/* ✅ Hiển thị ảnh bài đăng (nếu có) */}
            {post.media && post.media.length > 0 && (
              <div className="mt-4">
                {post.media.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Post Image ${index + 1}`}
                    className="mt-2 w-100 h-auto rounded-lg shadow-md"
                  />
                ))}
              </div>
            )}

            {/* Like, Dislike, Share, Comment Section */}
            <div className="flex items-center space-x-6 mt-4 text-gray-600">
{/* Like Button */}
<div className="flex items-center space-x-1 text-gray-500">
  <FaThumbsUp
    className={`text-lg cursor-pointer transition ${post.votes && post.votes[user.id] === "true"
      ? "text-blue-500" // Blue when user has liked
      : "text-gray-400 hover:text-blue-500"}`}
    onClick={(e) => {
      e.stopPropagation(); // Prevent navigation
      post.votes && post.votes[user.id] === "true"
        ? handleVote("none") // If already liked, remove the vote
        : handleVote("true"); // Otherwise, vote as "true"
    }}
  />
  <span className="text-sm">
    {Object.values(post?.votes).filter((vote) => vote === "true").length}
  </span>
</div>

{/* Dislike Button */}
<div className="flex items-center space-x-1 text-gray-500">
  <FaThumbsDown
    className={`text-lg cursor-pointer transition ${post.votes && post.votes[user.id] === "false"
      ? "text-red-500" // Red when user has disliked
      : "text-gray-400 hover:text-red-500"}`}
    onClick={(e) => {
      e.stopPropagation(); // Prevent navigation
      post.votes && post.votes[user.id] === "false"
        ? handleVote("none") // If already disliked, remove the vote
        : handleVote("false"); // Otherwise, vote as "false"
    }}
  />
  <span className="text-sm">
    {Object.values(post?.votes || {}).filter((vote) => vote === "false").length}
  </span>
</div>

<div className="flex items-center space-x-1">
    <FaComment className="text-lg" />
    <span>{totalComments}</span> {/* Display total comments count */}
  </div>
</div>


          </div>

          {/* Comment Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <form onSubmit={handleAddComment} className="flex items-center space-x-2">
              <img src={user.avatar || avatarDefault} alt="User Avatar" className="h-8 w-8 rounded-full" />
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                <FaPaperPlane />
              </button>
            </form>
            <div className="mt-6">{renderComments(comments)}</div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Post does not exist!</p>
      )}
    </div>
  );
};

export default PostDetail;
