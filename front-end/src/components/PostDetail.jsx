import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown, FaComment, FaPaperPlane } from "react-icons/fa";
import avatarDefault from "../assets/images/avatar2.png";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token & user from localStorage
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
          setComments(commentRes.data?.data || []);
        } catch (error) {
          console.warn("No comments found, setting empty list.");
          setComments([]); // ✅ FIX: Default to an empty list instead of throwing an error
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


  const handleVote = async (type) => {
    if (!post || !user) return;

    try {
      console.log(`Voting ${type} for post:`, postId);

      const response = await axios.patch(
        `http://localhost:9999/api/v1/posts/${postId}/vote`, // Correct endpoint
        { userId: user.id, vote: type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setPost(response.data.data); // Update post state with new votes
      }
    } catch (error) {
      console.error(`Error voting ${type}:`, error.response ? error.response.data : error);
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

        // Add new comment to state immediately with full user info
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

        setCommentInput(""); // Clear input field
      } else {
        console.error("Unexpected API response:", response);
      }
    } catch (error) {
      console.error("Error posting comment:", error.response ? error.response.data : error);
    }
  };

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

            {/* Like, Dislike, Comment Section */}
            <div className="flex items-center space-x-6 mt-4 text-gray-600">
              <button onClick={() => handleVote("like")} className="flex items-center space-x-1">
                <FaThumbsUp className="text-lg" /> <span>{post.upVotes ?? 0}</span>
              </button>
              <button onClick={() => handleVote("dislike")} className="flex items-center space-x-1">
                <FaThumbsDown className="text-lg" /> <span>{post.downVotes ?? 0}</span>
              </button>
              <div className="flex items-center space-x-1">
                <FaComment className="text-lg" /> <span>{comments.length}</span>
              </div>
            </div>
          </div>

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
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600 transition duration-300">
                <FaPaperPlane className="inline-block mr-2" />
              </button>
            </form>

            <div className="mt-6 space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <img
                      src={comment.userId && comment.userId.avatar ? comment.userId.avatar : avatarDefault}
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-sm">
                        {comment.userId && comment.userId.username ? comment.userId.username : "Anonymous"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : "No timestamp available"}
                      </p>
                      <p className="text-sm text-gray-700">{comment.content || "No content available"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No comments yet.</p>
              )}
            </div>


          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Post does not exist!</p>
      )}
    </div>
  );
};

export default PostDetail;
