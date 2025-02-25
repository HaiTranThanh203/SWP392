import { useState } from 'react';
import { Link } from 'react-router-dom';
function ManagerNews() {
  const [news] = useState([
    {
      id: 1,
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      title: 'Musk',
      description: 'Musk\'s attorney, Marc Toberoff, confirmed the development, as per the report.',
      status: 'Active'
    },
    {
      id: 2,
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      title: 'Elon Musk',
      description: 'Elon Musk and a group of investors have made a $97.4 billion offer to buy OpenAI\'s controlling non-profit entity.',
      status: 'Active'
    },
    {
      id: 3,
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      title: 'Marc Toberoff',
      description: 'Musk\'s attorney, Marc Toberoff, confirmed the development, as per the report.',
      status: 'Active'
    },
    {
      id: 4,
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
      title: 'The Bid',
      description: 'The bid is backed by Musk\'s own AI company, xAI (founded in 2023).',
      status: 'DeActive'
    }
  ]);

  const totalCommunity = news.length;
  const activeCommunity = news.filter(n => n.status === 'Active').length;
  const deactiveCommunity = news.filter(n => n.status === 'DeActive').length;

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">View News</h1>
        <Link
          to="/admin/create-news"
          className="bg-orange-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-orange-600 text-sm"
        >
          Create New
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <span className="text-lg font-semibold">Total Community</span>
          <div className="text-3xl">{totalCommunity}</div>
        </div>
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <span className="text-lg font-semibold">Active Community</span>
          <div className="text-3xl">{activeCommunity}</div>
        </div>
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <span className="text-lg font-semibold">Deactive Community</span>
          <div className="text-3xl">{deactiveCommunity}</div>
        </div>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">STT</th>
            <th className="p-3 border">Images</th>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border">
                <img src={item.image} alt={item.title} className="w-12 h-12 rounded-full" />
              </td>
              <td className="p-3 border">{item.title}</td>
              <td className="p-3 border">{item.description}</td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded-md ${item.status === 'Active' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                  {item.status}
                </span>
              </td>
              <td className="p-3 border">
                <Link to={`/admin/news-detail/${item.id}`} className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm">
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerNews;
