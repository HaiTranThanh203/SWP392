import { useParams, Link } from 'react-router-dom';

const DetailNews = () => {
  const { id } = useParams(); // Get the ID from the URL parameter

  // Dummy data for news list
  const newsList = [
    {
      id: 1,
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      title: 'Musk',
      description: 'Musk\'s attorney, Marc Toberoff, confirmed the development, as per the report.',
      status: 'Active',
    },
    {
      id: 2,
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      title: 'Elon Musk',
      description: 'Elon Musk and a group of investors have made a $97.4 billion offer to buy OpenAI\'s controlling non-profit entity.',
      status: 'Active',
    },
    {
      id: 3,
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      title: 'Marc Toberoff',
      description: 'Musk\'s attorney, Marc Toberoff, confirmed the development, as per the report.',
      status: 'Active',
    },
    {
      id: 4,
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
      title: 'The Bid',
      description: 'The bid is backed by Musk\'s own AI company, xAI (founded in 2023).',
      status: 'DeActive',
    }
  ];

  // Find the specific news item using the id
  const newsItem = newsList.find(item => item.id === parseInt(id));

  if (!newsItem) {
    return <div>News not found</div>;
  }

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">{newsItem.title}</h1>
      <div className="flex items-center justify-center mb-6">
        <img src={newsItem.image} alt={newsItem.title} className="w-20 h-20 rounded-full" />
      </div>
      <div className="mb-6">
        <strong>Description:</strong>
        <p>{newsItem.description}</p>
      </div>
      <div className="mb-6">
        <strong>Status:</strong>
        <span className={`px-2 py-1 rounded-md ${newsItem.status === 'Active' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
          {newsItem.status}
        </span>
      </div>

      {/* Update News Button */}
      <div className="mb-6 text-center">
        <Link
          to={`/admin/updatenews/${newsItem.id}`}  // Link to the Update News page, passing the news id
          className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 text-sm"
        >
          Update News
        </Link>
      </div>

      {/* Button to go back */}
      <button
        onClick={() => window.history.back()}
        className="bg-gray-500 text-white py-2 px-4 rounded-md"
      >
        Go Back
      </button>
    </div>
  );
};

export default DetailNews;
