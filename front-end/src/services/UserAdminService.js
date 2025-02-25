import axios from 'axios';
import { message } from 'antd';
import { BASE_URL, getHeader,getAuthHeader ,HEADERS_NOT_AUTHORIZATION} from "./api";

// Function to toggle user status by ID
export const toggleUserStatus = async (userId) => {
    try {
        const response = await axios.patch(`${BASE_URL}/users/${userId}/toggle-active`, {}, {
            headers: HEADERS_NOT_AUTHORIZATION(),
        });
        return response.data;
    } catch (error) {
        message.error('Error updating user status: ' + error.message);
        throw error;
    }
};
// Function to get all users with pagination
// http://localhost:9999/api/v1/users/list?page=1&limit=5&email=test123&username=test1 -co the search theo email va username
export const getListUser = async (page = 1, limit = 5, status = '', email = '', username = '') => {
    try {
        const response = await axios.get('${BASE_URL}/api/v1/users/list', { // Updated endpoint
            headers: HEADERS_NOT_AUTHORIZATION(),
            params: { page, limit, status, email, username } // Updated parameters for users
        });
        return response.data;
    } catch (error) {
        message.error('Error fetching users: ' + error.message);
        throw error;
    }
};