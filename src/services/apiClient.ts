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

  const fullUrl = `${baseUrl}${path}`;
  const method = options.method || 'GET';
  
  console.log('[apiClient] Request:', {
    method,
    url: fullUrl,
    path,
    baseUrl,
    headers: { ...headers, Authorization: headers['Authorization'] ? 'Bearer ***' : undefined },
    hasBody: options.body !== undefined,
    bodyPreview: options.body ? JSON.stringify(options.body).substring(0, 100) : undefined
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 15000);
  try {
    const res = await fetch(fullUrl, {
      method,
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      mode: 'cors',
      signal: controller.signal,
    });
    
    console.log('[apiClient] Response:', {
      status: res.status,
      statusText: res.statusText,
      ok: res.ok,
      headers: Object.fromEntries(res.headers.entries()),
      url: res.url
    });
    
    const text = await res.text();
    const data = text ? (() => { try { return JSON.parse(text); } catch { return { raw: text }; } })() : undefined;
    
    console.log('[apiClient] Response body:', {
      hasData: !!data,
      dataPreview: data ? (typeof data === 'string' ? data.substring(0, 200) : JSON.stringify(data).substring(0, 200)) : undefined
    });
    
    if (!res.ok) {
      const message = (data && (data.error || data.message)) || res.statusText;
      console.error('[apiClient] Request failed:', {
        status: res.status,
        statusText: res.statusText,
        message,
        data
      });
      throw new Error(message || 'Request failed');
    }
    return data as T;
  } catch (err) {
    console.error('[apiClient] Request error:', {
      error: err,
      name: (err as any)?.name,
      message: (err as Error)?.message,
      stack: (err as Error)?.stack
    });
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
