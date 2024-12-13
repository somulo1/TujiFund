import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  login: async (username, password) => {
    const response = await api.post('/api/login', { username, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/api/register', userData);
    return response.data;
  },

  getMemberDashboard: async () => {
    const response = await api.get('/api/member/dashboard');
    return response.data;
  },

  addContribution: async (amount) => {
    const response = await api.post('/api/member/contribution', { amount });
    return response.data;
  },

  getMemberProfile: async () => {
    const response = await api.get('/api/member/profile');
    return response.data;
  },

  updateMemberProfile: async (profileData) => {
    const response = await api.put('/api/member/profile/update', profileData);
    return response.data;
  },

  getAdminDashboard: async () => {
    const response = await api.get('/api/admin/dashboard');
    return response.data;
  },

  distributeDividends: async (totalAmount) => {
    const response = await api.post('/api/admin/dividends/distribute', { total_amount: totalAmount });
    return response.data;
  },

  getAllMembers: async () => {
    const response = await api.get('/api/admin/members');
    return response.data;
  },

  updateMember: async (memberData) => {
    const response = await api.put('/api/admin/members/update', memberData);
    return response.data;
  },

  getReports: async (reportType) => {
    const response = await api.get(`/api/admin/reports/${reportType}`);
    return response.data;
  },

  generateReport: async (reportType) => {
    const response = await api.post(`/api/admin/reports/generate`, { type: reportType });
    return response.data;
  },
};

