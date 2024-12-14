import axios from 'axios';
import type { User, Contribution, Dividend, ApiResponse } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (email: string, password: string): Promise<ApiResponse<User>> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return { data: user };
    } catch (error) {
      throw error;
    }
  },
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
    }
  },
};

export const contributions = {
  getAll: async (): Promise<ApiResponse<Contribution[]>> => {
    try {
      const response = await api.get('/contributions');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  create: async (data: { amount: number; date: string }): Promise<ApiResponse<Contribution>> => {
    try {
      const response = await api.post('/contributions', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const members = {
  getAll: async (): Promise<ApiResponse<User[]>> => {
    try {
      const response = await api.get('/members');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id: string): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get(`/members/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const dividends = {
  getAll: async (): Promise<ApiResponse<Dividend[]>> => {
    try {
      const response = await api.get('/dividends');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  distribute: async (data: { amount: number; date: string }): Promise<ApiResponse<Dividend[]>> => {
    try {
      const response = await api.post('/dividends/distribute', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};