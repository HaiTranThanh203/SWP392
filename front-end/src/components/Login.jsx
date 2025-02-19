import React, { useState } from "react";
import axios from "axios";
import frogImage from "../assets/images/Avatar.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9999/api/v1/users/login",
        {
          email,
          password,
        }
      );
      console.log("Đăng nhập thành công:", response.data);
      const data = response.data; // Lấy dữ liệu từ response

      // Kiểm tra nếu đăng nhập thành công
      if (data.status === "success") {
        console.log("Login successful", data.user);

        // Lưu token và thông tin người dùng
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Điều hướng người dùng dựa trên vai trò
        if (data.user.role === "student") {
          navigate("/"); // Điều hướng đến trang chủ cho student
        } else if (data.user.role === "admin") {
          navigate("/dashboard"); // Điều hướng đến trang quản lý cho admin
        }
      } else {
        console.error("Login failed", data.message);
        setErrors({
          form: data.message || "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      console.error(
        "Lỗi đăng nhập:",
        error.response?.data?.message || "Đã xảy ra lỗi!"
      );
      alert(
        error.response?.data?.message || "Email hoặc mật khẩu không chính xác!"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="frog-icon"></div>
      <h2 className="sign-up-title">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Mật khẩu
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button type="submit" className="submit-button">
          Sign In
        </button>
        <div style={{ marginTop: "10px" }}>
          Chưa có tài khoản? <a href="/SignUp">Đăng ký</a>
        </div>
        <div style={{ marginTop: "10px" }}>
          <a href="/ForgotPassword">Quên mật khẩu</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
