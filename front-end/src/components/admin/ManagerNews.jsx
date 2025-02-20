import { useState } from 'react';

function ManagerNews() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, image, description });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Create New</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Title: <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required />
        </div>

        {/* Image URL Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Image URL:</label>
          <input
            type="url"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)} />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Description:</label>
          <textarea
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="5"
            placeholder="Enter your description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 mt-6 focus:outline-none focus:ring-2 focus:ring-orange-500">
          Create
        </button>
      </form>
    </div>
  );
}

export default ManagerNews;
