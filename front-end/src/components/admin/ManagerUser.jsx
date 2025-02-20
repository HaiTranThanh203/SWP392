import { useState } from 'react';

const ManagerUser = () => {
  const [search, setSearch] = useState('');
  const [users, ] = useState([
    { id: 1, image: 'https://randomuser.me/api/portraits/children/1.jpg', title: 'Musk', description: 'Musk\'s attorney, Marc Toberoff, confirmed the development, as per the report.', status: 'Active' },
    { id: 2, image: 'https://randomuser.me/api/portraits/children/2.jpg', title: 'Elon Musk', description: 'Elon Musk and a group of investors have made a $97.4 billion offer to buy OpenAI\'s controlling non-profit entity.', status: 'Active' },
    { id: 3, image: 'https://randomuser.me/api/portraits/men/3.jpg', title: 'Marc Toberoff', description: 'Musk\'s attorney, Marc Toberoff, confirmed the development, as per the report.', status: 'Active' },
    { id: 4, image: 'https://randomuser.me/api/portraits/men/4.jpg', title: 'The Bid', description: 'The bid is backed by Musk\'s own AI company, xAI (founded in 2023).', status: 'DeActive' },
  ]);

  const filteredUsers = users.filter(user => user.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8">
      {/* Statistics Boxes */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <span className="text-lg font-semibold">Total Community</span>
          <div className="text-3xl">{users.length}</div>
        </div>
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <span className="text-lg font-semibold">Active Community</span>
          <div className="text-3xl">{users.filter(user => user.status === 'Active').length}</div>
        </div>
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <span className="text-lg font-semibold">Deactive Community</span>
          <div className="text-3xl">{users.filter(user => user.status === 'DeActive').length}</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User Table */}
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
          {filteredUsers.map((user, index) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border">
                <img src={user.image} alt={user.title} className="w-12 h-12 rounded-full" />
              </td>
              <td className="p-3 border">{user.title}</td>
              <td className="p-3 border">{user.description}</td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded-md ${user.status === 'Active' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                  {user.status}
                </span>
              </td>
              <td className="p-3 border">
                <button className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm">Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerUser;
