import axios from 'axios';
import { message } from 'antd';

const BASE_URL = 'http://localhost:9999/api/v1';
const token = localStorage.getItem('token');

// Hàm lấy token từ localStorage và trả về header xác thực
const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
});

// Function to get statistics for reports
export const getReportStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reports/stats`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching report stats:', error);
    throw error;
  }
};

// Function to list reports with filters (pagination, search)
export const listReports = async (page = 1, limit = 10, status = '', entityType = '', description = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/reports`, {
      headers: getAuthHeader(),
      params: { page, limit, status, entityType, description },
    });
    return response.data;
  } catch (error) {
    message.error('Error fetching reports: ' + error.message);
    throw error;
  }
};

// Function to get a report's details by ID
export const getReportById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/reports/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching report details:', error);
    throw error;
  }
};

// Function to update a report
export const updateReport = async (reportId, updatedData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/reports/${reportId}`, updatedData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    message.error('Error updating report: ' + (error.response?.data?.message || error.message));
    throw error;
  }
};

// Function to deactivate a post based on report ID
export const deactivatePost = async (postId, action) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/reports/deactivate-report-post/${postId}`,
      { action }, // Sending action (Approve or Cancel) in the body
      { headers: getAuthHeader() }
    );
    message.success(`Post ${action === 'Approved' ? 'deactivated and reports approved' : 'reports canceled'} successfully.`);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || 'Error deactivating post';
    message.error(`${errorMsg}: ${error.message}`);
    throw error;
  }
};
