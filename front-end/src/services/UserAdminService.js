import axios from 'axios';
import { message } from 'antd';
import { BASE_URL, api} from "./api";

// Function to toggle user status by ID
export const toggleUserStatus = async (userId) => {
    try {
        const response = await api.patch(`${BASE_URL}/users/${userId}/toggle-active`, {}, );
        return response.data;
    } catch (error) {
        message.error('Error updating user status: ' + error.message);
        throw error;
    }
};
// Function to get all users with pagination
// http://localhost:9999/api/v1/users/list?page=1&limit=5&email=test123&username=test1 -co the search theo email va username


 // Update with your actual base URL

// Function to fetch list of users with filters
export const getListUser = async (page = 1, limit = 5, status = '', email = '', username = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/users/list`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      params: { page, limit, status, email, username }
    });
    return response.data;  // Assuming the users are inside `data` key
  } catch (error) {
    message.error('Error fetching users: ' + error.message);
    throw error;
  }
};

// export const getUserById = async (id) => {}
// try {
//     const endpoint = `${BASE_URL}/api/v1/users/${id}`;
//     const response = await api.get(endpoint);
//     return response.data;
// } catch (error) {
//     console.error('Error fetching user details:', error);
//     throw error;
// }