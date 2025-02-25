import { useParams, useNavigate } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const navigate = useNavigate();

  // Sample user data
    const users = [
      { id: 1, image: 'https://randomuser.me/api/portraits/children/1.jpg', title: 'Musk', description: 'Musk\'s attorney, Marc Toberoff, confirmed the development, as per the report.', status: 'Active', email: 'QA@gmail.com', phone: '03396343450', role: 'User' },
      { id: 2, image: 'https://randomuser.me/api/portraits/children/2.jpg', title: 'Elon Musk', description: 'Elon Musk and a group of investors have made a $97.4 billion offer to buy OpenAI\'s controlling non-profit entity.', status: 'Active', email: 'elon.musk@gmail.com', phone: '03396343451', role: 'Admin' },
      { id: 3, image: 'https://randomuser.me/api/portraits/men/3.jpg', title: 'Marc Toberoff', description: 'Musk\'s attorney, Marc Toberoff, confirmed the development, as per the report.', status: 'Active', email: 'marc.toberoff@gmail.com', phone: '03396343452', role: 'User' },
      { id: 4, image: 'https://randomuser.me/api/portraits/men/4.jpg', title: 'The Bid', description: 'The bid is backed by Musk\'s own AI company, xAI (founded in 2023).', status: 'DeActive', email: 'thebid@gmail.com', phone: '03396343453', role: 'User' },
    ];

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) return <div>User not found</div>;

  return (
    <div className="p-8 max-w-lg mx-auto bg-orange-100 rounded-lg">
      <div className="text-2xl font-semibold text-center mb-6">User Detail</div>
      <div className="flex items-center mb-4">
        <img src={user.image} alt={user.title} className="w-20 h-20 rounded-full mr-4" />
        <div className="text-lg font-medium">{user.title}</div>
      </div>
      <div className="mb-4">
        <strong>Email Address:</strong> {user.email}
      </div>
      <div className="mb-4">
        <strong>User Name:</strong> {user.title}
      </div>
      <div className="mb-4">
        <strong>ID:</strong> {user.id}
      </div>
      <div className="mb-4">
        <strong>Phone:</strong> {user.phone}
      </div>
      <div className="mb-4">
        <strong>Role:</strong> {user.role}
      </div>
      <div className="mb-4">
        <strong>Status:</strong> {user.status}
      </div>
      <button onClick={() => navigate(-1)} className="bg-gray-500 text-white py-2 px-4 rounded-md">
        Close
      </button>
    </div>
  );
};

export default UserDetail;
