const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  isMultipart?: boolean;
}

export async function apiFetch<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, isMultipart = false } = options;

  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  // Build headers
  const requestHeaders: Record<string, string> = { ...headers };
  
  if (!isMultipart && !(body instanceof FormData)) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  // Attach token if stored in local storage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  // Configure fetch options
  const fetchOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body) {
    fetchOptions.body = isMultipart || body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const res = await fetch(url, fetchOptions);
    
    // Parse response
    let data;
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      throw new Error(data?.message || `HTTP error! status: ${res.status}`);
    }

    return data as T;
  } catch (error: any) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}

// Named request helpers
export const api = {
  get: <T = any>(endpoint: string, headers?: Record<string, string>) => 
    apiFetch<T>(endpoint, { method: 'GET', headers }),
    
  post: <T = any>(endpoint: string, body?: any, isMultipart = false, headers?: Record<string, string>) => 
    apiFetch<T>(endpoint, { method: 'POST', body, isMultipart, headers }),
    
  put: <T = any>(endpoint: string, body?: any, headers?: Record<string, string>) => 
    apiFetch<T>(endpoint, { method: 'PUT', body, headers }),
    
  delete: <T = any>(endpoint: string, headers?: Record<string, string>) => 
    apiFetch<T>(endpoint, { method: 'DELETE', headers }),
};
