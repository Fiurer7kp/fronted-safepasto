import { request, setToken, clearToken } from './apiClient';
import type { AuthLoginResponse } from '../types';

export const login = async (username: string, password: string) => {
  const data = await request<AuthLoginResponse>('/api/auth/login', {
    method: 'POST',
    body: { username, password },
    timeoutMs: 15000,
  });
  if (data.token) setToken(data.token);
  return data;
};

export const logout = () => {
  clearToken();
};

export const isAuthenticated = () => {
  return !!(typeof window !== 'undefined' && localStorage.getItem('auth_token'));
};
