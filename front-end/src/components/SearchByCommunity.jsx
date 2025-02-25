import React, { useState } from 'react';
import { FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import software from '../assets/images/software.png';
import marketing from '../assets/images/marketing.png';
import business from '../assets/images/business.png';
const SearchByCommunity = () => {
  const initialGroups = [
    { id: 1, name: 'Students in Software Engineer', members: 205, joined: true, image: software },
    { id: 2, name: 'Students in Digital Marketing', members: 195, joined: false, image: marketing },
    { id: 3, name: 'Students in International Business', members: 108, joined: false, image: business },
  ];

  const [groups, setGroups] = useState(initialGroups);

  const toggleJoinGroup = (id) => {
    setGroups(groups.map(group =>
      group.id === id ? { ...group, joined: !group.joined } : group
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6 max-w-2xl mx-auto w-full">
      {groups.map((group) => (
        <div key={group.id} className="flex items-center justify-between p-6 border-b border-gray-300">
          <div className="flex items-center flex-grow space-x-6">
            <img src={group.image} alt={group.name} className="h-16 w-16 rounded-md object-cover" />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{group.name}</h3>
              <p className="text-sm text-gray-500">{group.members} members</p>
            </div>
          </div>
          <button
            onClick={() => toggleJoinGroup(group.id)}
            className={`flex items-center px-6 py-2 text-sm font-medium rounded-full ${group.joined ? 'bg-gray-300 text-gray-700' : 'bg-blue-500 text-white'}`}
          >
            {group.joined ? <FaCheckCircle className="mr-2" /> : <FaPlusCircle className="mr-2" />}
            {group.joined ? 'Joined' : 'Join'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchByCommunity;