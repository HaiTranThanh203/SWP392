import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="flex h-screen">

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">News</h1>
          <Link
            to="/admin/createnews"
            className="bg-orange-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-orange-600 text-sm"
          >
            Create New
          </Link>
        </div>

        {/* News Section */}
        <div className="flex flex-col md:flex-row space-x-4">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://placekitten.com/600/400" // Replace with your image URL
              alt="News"
              className="w-full h-64 object-cover rounded-md"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">How I use FPT Student Space on Top of the News</h2>
              <p className="text-sm text-gray-600 mt-2">Published 24/01/2025</p>
              <p className="mt-4">
                I think of subreddits as small (or sometimes big!) online communities for specific topics or
                interests. Some are fun, others more serious, but here are the ones that I use to stay updated on
                the news. You can join them to see more of it on your Reddit homepage (to join a subreddit, just go to
                the subreddit’s page and click “Join.”).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-600">
          <p>
            <Link to="/about" className="hover:text-orange-500">About FPT Student Space</Link> |{' '}
            <Link to="/privacy-policy" className="hover:text-orange-500">Privacy Policy</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminHome;
