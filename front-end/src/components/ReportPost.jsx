import React, { useState } from 'react';
import avatar1 from '../assets/images/avatar1.png';
import bag from '../assets/images/bag.png';
const ReportPost = () => {
    const [selectedReason, setSelectedReason] = useState(null);

    const handleReportSubmit = (e) => {
        e.preventDefault();
        if (!selectedReason) {
            alert('Please select a reason for reporting.');
        } else {
            // Handle the submission of the report here
            alert(`Report submitted for reason: ${selectedReason}`);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col p-6">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="font-semibold text-lg border-b border-gray-300 pb-2">Submit a report</h2>
                <div className="mt-4 flex items-center  space-x-2">
                    <img src={avatar1} alt="User Avatar" className="h-12 w-12 rounded-full" />
                    <div>
                        <h3 className="font-semibold text-lg">funny</h3>
                        <p className="text-xs text-gray-500">2 hr ago</p>
                    </div>
                </div>
                <p className="mt-4 text-gray-700">I’m looking for this bag. Contact me via this account.</p>
                <img src={bag} alt="Bag" className="mt-4 w-32 h-32 object-cover" />

                <div className="mt-6">
                    <p className="text-sm text-gray-600 border-t border-gray-300 pb-2">
                        Thanks for looking out for yourself by reporting things that break the rules. Let us know what's
                        happening, and we'll look into it.
                    </p>
                    <div className="mt-4 space-x-2">
                        {[
                            'Threatening violence',
                            'Sharing personal information',
                            'Copyright violation',
                            'Impersonation',
                            'Spam',
                            'Minor abuse or sexualization',
                            'Hate',
                            'Non-consensual intimate media',
                        ].map((reason, index) => (
                            <button
                                key={index}
                                className={`py-1 px-4 text-sm rounded-md border border-gray-300 ${selectedReason === reason ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                onClick={() => setSelectedReason(reason)}
                            >
                                {reason}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleReportSubmit} className="mt-6">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white py-2 px-4 rounded-md text-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Report
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportPost;
