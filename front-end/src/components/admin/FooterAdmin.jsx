

const FooterAdmin = () => {
  return (
    <footer className="flex justify-between p-4 border-t border-gray-300">
      {/* Left Footer Text */}
      <div className="text-gray-600">
        <a href="/about" className="hover:text-orange-500">About FPT Student Space</a>
      </div>

      {/* Right Footer Text */}
      <div className="text-gray-600">
        <a href="/privacy-policy" className="hover:text-orange-500">Privacy Policy</a>
      </div>
    </footer>
  );
}

export default FooterAdmin;
