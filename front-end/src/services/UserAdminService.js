import axios from 'axios';
import { message } from 'antd';

export const BASE_URL = 'http://localhost:9999/api/v1';

// Hàm trả về header chung
export const getCommonHeader = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  };
};

// Function to toggle user status by ID
export const toggleUserStatus = async (userId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/users/${userId}/toggle-active`,
      {}, // Body (nếu có) có thể là {} nếu không cần dữ liệu
      { headers: getCommonHeader() }
    );
    return response.data;
  } catch (error) {
    message.error('Error updating user status: ' + error.message);
    throw error;
  }
};

// Function to fetch list of users with filters (pagination, search)
export const getListUser = async (page = 1, limit = 5, status = '', email = '', username = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/users/list`, {
      headers: getCommonHeader(),
      params: { page, limit, status, email, username },
    });
    return response.data; // Giả sử dữ liệu chính nằm trong response.data
  } catch (error) {
    message.error('Error fetching users: ' + error.message);
    throw error;
  }
};

// Function to get user details by ID
export const getUserById = async (id) => {
  try {
    const endpoint = `${BASE_URL}/users/${id}`;
    const response = await axios.get(endpoint, {
      headers: getCommonHeader(),
    });
    return response.data;
  } catch (error) {
    message.error('Error fetching user details: ' + error.message);
    throw error;
  }
};
