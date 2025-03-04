import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown, FaComment, FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import avatar2 from "../assets/images/avatar2.png";
import avatar3 from "../assets/images/avatar3.png";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [postDropdownOpen, setPostDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9999/api/v1/posts/${postId}`, { withCredentials: true })
      .then(response => {
        if (response.data && response.data.data) {
          setPost(response.data.data);
        } else {
          console.error("API trả về không đúng định dạng:", response);
          setError("Không thể tải bài viết.");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Lỗi khi lấy bài viết:", error);
        setError("Không thể tải bài viết.");
        setLoading(false);
      });

    axios.get(`http://localhost:9999/api/v1/comments/get-by-post/${postId}`, { withCredentials: true })
      .then(response => {
        if (response.data && response.data.data) {
          setComments(response.data.data);
        } else {
          console.error("API bình luận trả về không đúng:", response);
          setComments([]);
        }
      })
      .catch(error => {
        console.error("Lỗi khi lấy bình luận:", error);
        setComments([]);
      });
  }, [postId]);



  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    axios.post(`http://localhost:9999/api/v1/comments`, {
      postId,
      content: commentInput
    }).then(response => {
      setComments([...comments, response.data.data]);
      setCommentInput("");
    }).catch(error => console.error("Lỗi khi thêm bình luận:", error));
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải bài viết...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!post) return <p className="text-center text-gray-500">Bài viết không tồn tại!</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {loading ? (
          <p className="text-center text-gray-500">Đang tải bài viết...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : post ? (
          <>
            <div className="flex items-center space-x-2">
              <img
                src={post.userId?.avatar || avatar2}  // Lấy avatar từ API, nếu không có thì dùng avatar mặc định
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h2 className="font-semibold text-lg">
                  {post.userId?.username || "Ẩn danh"} {/* Hiển thị tên người đăng bài */}
                </h2>
                <p className="text-xs text-gray-500">
                  Upvotes: {post.upVotes ?? 0} - Downvotes: {post.downVotes ?? 0}
                </p>
              </div>
            </div>

            <p className="mt-2 text-gray-700">{post.content || "Không có nội dung"}</p>
          </>
        ) : (
          <p className="text-center text-gray-500">Bài viết không tồn tại!</p>
        )}
      </div>


      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <form onSubmit={handleAddComment} className="flex items-center space-x-2">
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
          {comments.length > 0 ? comments.map((comment, index) => (
            <div key={index} className="flex items-center space-x-2">
              <img
                src={comment.userId?.avatar || avatar3}  // Lấy avatar từ API
                alt="User Avatar"
                className="h-8 w-8 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-sm">
                  {comment.userId?.username || "Ẩn danh"} {/* Hiển thị tên người bình luận */}
                </h3>
                <p className="text-xs text-gray-500">
                  {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : "Không có thời gian"}
                </p>
                <p className="text-sm text-gray-700">{comment.content || "Không có nội dung"}</p>
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-500">Chưa có bình luận nào.</p>
          )}
        </div>



      </div>
    </div>
  );
};

export default PostDetail;