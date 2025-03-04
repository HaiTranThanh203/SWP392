import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';

const CreatePost = () => {
  const [communities, setCommunities] = useState([]); // Lấy từ backend
  const [community, setCommunity] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Lấy danh sách cộng đồng từ backend
  useEffect(() => {
    axios.get('http://localhost:9999/api/v1/communities', { withCredentials: true })
      .then(response => {
        if (response.data && response.data.data) {
          setCommunities(response.data.data);
        } else {
          setError('Không thể lấy danh sách cộng đồng.');
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách cộng đồng:', error);
        setError('Lỗi khi lấy danh sách cộng đồng.');
      });
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!community || !title || !description) {
      setError('Vui lòng điền đầy đủ thông tin.');
      setLoading(false);
      return;
    }

    try {
      let imageUrl = '';

      // Nếu có ảnh, upload ảnh trước
      if (image) {
        const formData = new FormData();
        formData.append('file', image);

        const uploadRes = await axios.post('http://localhost:9999/api/v1/uploads', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });

        imageUrl = uploadRes.data.imageUrl;
      }

      // Gửi bài viết lên backend
      const postData = {
        communityId: community,
        title,
        content: description,
        media: imageUrl ? [imageUrl] : [],
      };

      await axios.post('http://localhost:9999/api/v1/posts/create', postData, {
        withCredentials: true,
      });

      setSuccess('Bài viết đã được tạo thành công!');
      setCommunity('');
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (error) {
      setError('Lỗi khi tạo bài viết. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Post</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      <form onSubmit={handlePostSubmit}>
        {/* Community Dropdown */}
        <div className="mb-4">
          <label htmlFor="community" className="block text-sm text-gray-600 mb-2">Choose your communities:</label>
          <select
            id="community"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a community</option>
            {communities.length > 0 ? (
              communities.map((comm) => (
                <option key={comm._id} value={comm._id}>
                  {comm.name}
                </option>
              ))
            ) : (
              <option value="">Không có cộng đồng nào</option>
            )}
          </select>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm text-gray-600 mb-2">Title: *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title"
            required
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm text-gray-600 mb-2">Image:</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="image"
            className="w-full p-2 border border-gray-300 rounded-md text-sm cursor-pointer text-center flex items-center justify-center"
          >
            <span className="mr-2 text-gray-600">Upload images</span>
            <FaUpload className="text-gray-600" />
          </label>
        </div>

        {/* Description Textarea */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm text-gray-600 mb-2">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description"
            rows="5"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex justify-end">
          {/* Post Button */}
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded-md text-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
