const HeaderAdmin = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="your-logo.png" alt="FPT Student Space Logo" className="w-8 h-8" /> {/* Replace with your logo */}
        <span className="text-orange-500 text-xl font-semibold">FPT Student Space</span>
      </div>
      
      {/* User Icon & Log Out Button */}
      <div className="flex items-center space-x-4">
        <button className="text-purple-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="12" cy="12" r="6" fill="currentColor"/>
          </svg>
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600">
          Log out
        </button>
      </div>
    </header>
  );
};

export default HeaderAdmin;
