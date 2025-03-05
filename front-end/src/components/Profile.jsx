import React, { useEffect, useState } from "react";
import frogImage from "../assets/images/Avatar.png";

function Profile() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:9999/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          setUser(data.data);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setOldPassword("");
      setNewPassword("");
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setOldPassword("");
      setNewPassword("");
    }, 0); // Delay một chút để đảm bảo state cập nhật
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangePassword = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword.length < 6) {
      setErrorMessage("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    try {
      const res = await fetch("http://localhost:9999/api/v1/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (data.status === "success") {
        alert("Mật khẩu đã thay đổi, bạn sẽ được chuyển đến trang đăng nhập sau 3 giây!");
        localStorage.removeItem("token"); // Xóa token
        // Chờ 5 giây (5000ms) rồi chuyển hướng đến trang login
        setTimeout(() => {
          window.location.href = "/login";  
        }, 3000);
      } else {
        setErrorMessage(data.message || "Đổi mật khẩu thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API đổi mật khẩu:", error);
      setErrorMessage("Lỗi kết nối.");
    }
  };

  if (!user) {
    return <p>Đang tải...</p>;
  }

  return (
    
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Profile</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">General:</h3>
        <div className="flex items-start">
          <div className="w-1/4">
            <img
              src={user.avatar || frogImage}
              alt="Avatar"
              className="w-24 h-24 rounded-full border border-gray-300"
            />
            <button className="mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload new images
            </button>
          </div>
          <div className="w-3/4 pl-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="w-1/4 font-semibold">Email:</span>
                <span className="w-3/4">{user.email || "N/A"}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732a2.5 2.5 0 013.536 3.536z" />
                </svg>
              </div>
              <div className="flex items-center">
                <span className="w-1/4 font-semibold">Username:</span>
                <span className="w-3/4">{user.username || "N/A"}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732a2.5 2.5 0 013.536 3.536z" />
                </svg>
              </div>
              <div className="flex items-center">
                <span className="w-1/4 font-semibold">Student Code:</span>
                <span className="w-3/4">{user.studentCode || "N/A"}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732a2.5 2.5 0 013.536 3.536z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start space-x-4">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
          View List Friends
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          onClick={handleOpenModal}
        >
          Change Password
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white rounded-lg p-10 w-1/5 max-h-screen overflow-y-auto z-5 border-orange-400 border-2">
            <h2 className="text-2xl font-semibold mb-4 text-center text-orange-400 ">Change Password</h2>
            {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Old Password:
              </label>
              <input
                type="password"
                value={oldPassword}
                autoComplete="new-password"
                onChange={(e) => setOldPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password:
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
                onClick={handleChangePassword}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
