import React, { useState } from 'react';
import axios from 'axios';
import frogImage from '../assets/images/Avatar.png';

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
      const response = await axios.post('http://localhost:9999/api/v1/users/forgot-password', { email });

      // Xử lý phản hồi từ server
      if (response.data.status === 'success') {
        setSuccessMessage('Một liên kết để thay đổi mật khẩu đã được gửi đến email của bạn.');
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
    <div className="login-container">
       <div className="frog-icon"></div>
      <h1 className="forgot-password-title">Quên mật khẩu</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <button type="submit" className="submit-button">Gửi yêu cầu</button>
      </form>

      {/* Hiển thị thông báo thành công hoặc lỗi */}
      {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}

      <div style={{ marginTop: '10px' }}>
        <a href="/login">Quay lại đăng nhập</a>
      </div>
    </div>
  );
}

export default ForgotPassword;
