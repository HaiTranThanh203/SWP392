import React, { useState } from 'react';
import axios from 'axios';
import frogImage from '../assets/images/Avatar.png';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('studentCode', studentCode);
    formData.append('password', password);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:9999/api/v1/users/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Kiểm tra phản hồi từ server
      if (response.data.status === 'success') {
        setSuccessMessage('Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.');
        setErrorMessage(''); // Reset lỗi nếu thành công
      } else {
        setErrorMessage('Đã có lỗi xảy ra. Vui lòng thử lại!');
        setSuccessMessage(''); // Reset thông báo thành công nếu có lỗi
      }
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      setErrorMessage(error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!');
      setSuccessMessage(''); // Reset thông báo thành công nếu có lỗi
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="login-container">
      <div className="frog-icon"></div>
      <h1 className="sign-up-title">Sign Up New Account</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên người dùng"
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Mã sinh viên</label>
          <input
            type="text"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            placeholder="Nhập mã sinh viên"
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hình ảnh</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
        <div style={{ marginTop: '10px' }}>
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </div>
      </form>

      {/* Hiển thị thông báo */}
      {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
    </div>
  );
}

export default SignUp;
