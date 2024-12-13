import axios from 'axios';
import type { User, Contribution, Dividend, ApiResponse } from '../types';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string): Promise<ApiResponse<User>> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  },
};

export const contributions = {
  getAll: async (): Promise<ApiResponse<Contribution[]>> => {
    const response = await api.get('/contributions');
    return response.data;
  },
  create: async (data: { amount: number; date: string }): Promise<ApiResponse<Contribution>> => {
    const response = await api.post('/contributions', data);
    return response.data;
  },
};

export const members = {
  getAll: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get('/members');
    return response.data;
  },
  getById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`/members/${id}`);
    return response.data;
  },
};

export const dividends = {
  getAll: async (): Promise<ApiResponse<Dividend[]>> => {
    const response = await api.get('/dividends');
    return response.data;
  },
  distribute: async (data: { amount: number; date: string }): Promise<ApiResponse<Dividend[]>> => {
    const response = await api.post('/dividends/distribute', data);
    return response.data;
  },
};