import { request, setToken, clearToken } from './apiClient';
import type { AuthLoginResponse } from '../types';

export const login = async (email: string, password: string) => {
  const data = await request<AuthLoginResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
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