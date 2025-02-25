import React from 'react';
import { FaInfoCircle, FaLock } from 'react-icons/fa'; // Import các icon

export default function Footer() {
  return (
    <footer className="bg-white p-4 text-center text-gray-600 border-t border-gray-300 relative flex flex-col items-center">
      {/* Các liên kết */}
      <div className="flex justify-center space-x-8 mb-4">
        <a href="#" className="flex items-center text-sm hover:text-indigo-500">
          <FaInfoCircle className="mr-2 text-lg" />
          About FPT Student Space
        </a>
        <a href="#" className="flex items-center text-sm hover:text-indigo-500">
          <FaLock className="mr-2 text-lg" />
          Privacy Policy
        </a>
      </div>

      {/* Dòng bản quyền */}
      <p className="absolute bottom-4 right-6 text-xs text-gray-400">
        FPT Student Space, Inc. 2025. All Rights Reserved.
      </p>
    </footer>
  );
}
