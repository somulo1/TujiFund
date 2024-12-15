export const APP_NAME = 'TujiFund';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER_MEMBER: '/register-member',
  REGISTER_GROUP: '/register-chairperson',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  ABOUT: '/about',
  SERVICES: '/#services',
};

export const USER_ROLES = {
  MEMBER: 'member',
  CHAIRPERSON: 'chairperson',
  TREASURER: 'treasurer',
  SECRETARY: 'secretary',
};

export const COLORS = {
  PRIMARY: '#2c583e',
  PRIMARY_DARK: '#1e3c2a',
  WHITE: '#ffffff',
  BLACK: '#000000',
};

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  PROFILE: '/api/user/profile',
  GROUPS: '/api/groups',
  MEMBERS: '/api/members',
  CONTRIBUTIONS: '/api/contributions',
  DIVIDENDS: '/api/dividends',
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Invalid email address',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
  PASSWORDS_MUST_MATCH: 'Passwords must match',
  INVALID_PHONE: 'Invalid phone number',
};
