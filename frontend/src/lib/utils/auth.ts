export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const getUserRole = () => {
  const role = localStorage.getItem('userRole');
  return role;
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const setUserRole = (role: string) => {
  localStorage.setItem('userRole', role);
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
};

export const formatError = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
};
