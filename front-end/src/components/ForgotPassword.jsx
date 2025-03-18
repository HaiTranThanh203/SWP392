import React, { useState } from 'react';
import axios from 'axios';
import frogImage from '../assets/images/Avatar.png';
import background from '../assets/images/background1.jpg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Email không hợp lệ');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9999/api/v1/users/forgotpassword', { email });

      // Xử lý phản hồi từ server
      if (response.data.status === 'success') {
        setSuccessMessage('A new password has been sent to your email.');
        setErrorMessage('');
      } else {
        setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại!');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Lỗi khi yêu cầu thay đổi mật khẩu:', error);
      setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại!');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-4 border-gray-300">
        <div className="flex justify-center">
          <img 
            src={frogImage} 
            alt="Frog Icon" 
            className="w-20 h-20 rounded-full border-4 border-orange-500 bg-white"
          />
        </div>
        <h1 className="text-2xl font-bold text-center my-4">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
           Submit request
          </button>
        </form>

        {/* Hiển thị thông báo thành công hoặc lỗi */}
        {successMessage && <div className="mt-4 text-green-600 text-center">{successMessage}</div>}
        {errorMessage && <div className="mt-4 text-red-600 text-center">{errorMessage}</div>}

        <div className="mt-4 text-center">
          <a href="/login" className="text-orange-500 hover:underline">Back to login</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;