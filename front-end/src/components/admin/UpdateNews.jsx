import { useState } from 'react';

const UpdateNews = () => {
  const [title, setTitle] = useState('How I use FPT Student Space on Top of the News');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState(
    'I think of subreddits as small (or sometimes big!) online communities for specific topics or interests. Some are fun, others more serious, but here are the ones that I use to stay updated on the news. You can join them to see more of it on your Reddit homepage (to join a subreddit, just go to the subreddit\'s page and click "Join").'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (API call, etc.)
    console.log({ title, image, description });
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">Update News</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Title: <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Image Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Image:</label>
          <input
            type="file"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Description:</label>
          <textarea
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 mt-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Update
        </button>
      </form>

      {/* Footer Section */}
      <div className="mt-6 text-center text-gray-600">
        <p>
          <a href="/about" className="hover:text-orange-500">About FPT Student Space</a> |{' '}
          <a href="/privacy-policy" className="hover:text-orange-500">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default UpdateNews;
