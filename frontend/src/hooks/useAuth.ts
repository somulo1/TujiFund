import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { apiClient } from '../lib/api/client';
import { formatError } from '../lib/utils/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const { login: setAuth, logout: clearAuth } = useAuthStore();

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      setAuth(token, user);
      navigate('/dashboard');
      
      return { success: true };
    } catch (error) {
      return { success: false, error: formatError(error) };
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await apiClient.post('/api/auth/register', userData);
      const { token, user } = response.data;
      
      setAuth(token, user);
      navigate('/dashboard');
      
      return { success: true };
    } catch (error) {
      return { success: false, error: formatError(error) };
    }
  };

  const logout = () => {
    clearAuth();
    navigate('/');
  };

  return {
    login,
    register,
    logout,
  };
};
