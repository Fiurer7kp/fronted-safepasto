const getApiBaseUrl = () => {
  const url = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return url && url.length > 0 ? url : 'https://backend-safepasto.onrender.com';
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean;
  timeoutMs?: number;
}

const jsonHeaders = { 'Content-Type': 'application/json' };

export const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const baseUrl = getApiBaseUrl();
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  const headers: Record<string, string> = { ...jsonHeaders, ...(options.headers || {}) };
  if (options.auth && token) headers['Authorization'] = `Bearer ${token}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 15000);
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: options.method || 'GET',
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      mode: 'cors',
      signal: controller.signal,
    });
    const text = await res.text();
    const data = text ? (() => { try { return JSON.parse(text); } catch { return { raw: text }; } })() : undefined;
    if (!res.ok) {
      const message = (data && (data.error || data.message)) || res.statusText;
      throw new Error(message || 'Request failed');
    }
    return data as T;
  } catch (err) {
    if ((err as any).name === 'AbortError') {
      throw new Error('Request timed out. The server may be waking up. Please try again.');
    }
    throw err as Error;
  } finally {
    clearTimeout(timeout);
  }
};

export const setToken = (token: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
};

export const clearToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
};

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};
