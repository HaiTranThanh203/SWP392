import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:9999/api/v1/users/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();

        if (response.ok && data.status === "success") {
          console.log("Login successful", data.user);

          // Save token and user data
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          // Redirect user based on role
          if (data.user.role === "student") {
            navigate("/"); // Redirect to home for students
          } else if (data.user.role === "admin") {
            navigate("/dashboard"); // Redirect to dashboard for admin
          }
        } else {
          console.error("Login failed", data.message);
          setErrors({
            form:
              data.message || "Login failed. Please check your credentials.",
          });
        }
      } catch (error) {
        console.error("Error logging in", error);
        setErrors({
          form: "An error occurred while logging in. Please try again.",
        });
      }
    } else {
      setValidated(true);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email or username validation
    if (!email) {
      newErrors.email = "Email or username is required.";
    } else if (
      !/^[\w.%+-]+@fpt\.edu\.vn$/.test(email) && // Email format check
      !/^[a-zA-Z0-9_]+$/.test(email) // Username format check (letters, numbers, underscores)
    ) {
      newErrors.email = "Invalid email or username format.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);

    if (details.email.endsWith("@fpt.edu.vn")) {
      // Send JWT token to backend for verification or account creation if it doesn't exist
      fetch("http://localhost:9999/api/v1/users/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect user based on role
            if (data.user.role === "student") {
              navigate("/"); // Redirect to home for students
            } else if (data.user.role === "admin") {
              navigate("/dashboard"); // Redirect to dashboard for admin
            }
          } else {
            console.error("Google login failed", data.message);
            setErrors({ form: data.message });
          }
        });
    } else {
      setErrors({ form: "Email must be a FPT email!" });
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed", error);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-6">
            <a href="/">
              <img
                src="../images/logo.jpg"
                alt="Logo"
                className="mx-auto mb-3 w-24"
              />
            </a>
            <h1 className="text-2xl font-bold">FPTU Social Website</h1>
            <p className="text-gray-600">
              The Internet Home Place, where many communities reside
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Log In</h2>
            <h6 className="text-sm text-gray-500 mb-4">
              By continuing, you agree to our User Agreement and acknowledge
              that you understand the Privacy Policy
            </h6>

            <div className="mb-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                useOneTap
              />
            </div>

            <div className="flex items-center my-4">
              <div className="flex-grow bg-gray-300 h-px"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="flex-grow bg-gray-300 h-px"></div>
            </div>

            <form noValidate onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email or username *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full p-4 rounded-full bg-gray-200 focus:outline-none ${
                    errors.email ? "border border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full p-4 rounded-full bg-gray-200 focus:outline-none ${
                    errors.password ? "border border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              {errors.form && (
                <div className="text-red-500 text-sm mb-4">{errors.form}</div>
              )}

              <div className="mb-4">
                <a
                  href="/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="mb-4">
                New to our community?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;
