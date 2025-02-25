import { useState } from 'react';

const ManagerReport = () => {
  const [search, setSearch] = useState('');
  const [reports, ] = useState([
    { id: 1, image: 'https://randomuser.me/api/portraits/children/1.jpg', title: 'Sun May', reason: 'Copyright violent', quantity: 1, status: 'Active' },
    { id: 2, image: 'https://randomuser.me/api/portraits/children/2.jpg', title: 'Elon Mars', reason: 'Impersonation', quantity: 2, status: 'Active' },
    { id: 3, image: 'https://randomuser.me/api/portraits/men/3.jpg', title: 'FU Market', reason: 'Spam', quantity: 1, status: 'Active' },
    { id: 4, image: 'https://randomuser.me/api/portraits/men/4.jpg', title: 'Scissors', reason: 'Sharing personal information', quantity: 1, status: 'Hide' },
  ]);

  const filteredReports = reports.filter(report => report.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8">
      {/* Statistics Boxes */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <span className="text-lg font-semibold">Total Report</span>
          <div className="text-3xl">{reports.length}</div>
        </div>
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <span className="text-lg font-semibold">Has been processed</span>
          <div className="text-3xl">{reports.filter(report => report.status === 'Active').length}</div>
        </div>
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <span className="text-lg font-semibold">Post</span>
          <div className="text-3xl">{reports.filter(report => report.status === 'Hide').length}</div>
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

      {/* Report Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">STT</th>
            <th className="p-3 border">Images</th>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Reason</th>
            <th className="p-3 border">Quantity</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report, index) => (
            <tr key={report.id} className="hover:bg-gray-50">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border">
                <img src={report.image} alt={report.title} className="w-12 h-12 rounded-full" />
              </td>
              <td className="p-3 border">{report.title}</td>
              <td className="p-3 border">{report.reason}</td>
              <td className="p-3 border">{report.quantity}</td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded-md ${report.status === 'Active' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                  {report.status}
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

export default ManagerReport;
