import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';


const CreatePost = () => {
  const [community, setCommunity] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Handle post creation
    console.log("Post created:", { community, title, description, image });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Post</h2>

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
            <option value="FU Market">FU Market</option>
            <option value="Foodies">Foodies</option>
            <option value="Tech Talk">Tech Talk</option>
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
    onChange={(e) => setImage(e.target.files[0])}
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
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
