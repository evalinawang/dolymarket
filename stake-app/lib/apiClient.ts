/**
 * Fetch-based API client wrapper with built-in auth and error handling
 */

import { ApiResponse, AuthToken } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
}

async function handleResponse<T>(response: Response): Promise<T> {
  let data: unknown;

  try {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  } catch {
    data = null;
  }

  if (!response.ok) {
    const errorMessage =
      (data as any)?.error?.message || `HTTP ${response.status}`;
    throw new ApiError(response.status, errorMessage, data);
  }

  return data as T;
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  params?: Record<string, string | number | boolean>;
}

export const apiClient = {
  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    let url = `${BASE_URL}${endpoint}`;

    // Add query parameters if provided
    if (options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const token = getAuthToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (options.headers && typeof options.headers === 'object') {
      Object.assign(headers, options.headers);
    }

    const config: RequestInit = {
      method: options.method,
      headers,
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, config);
    return handleResponse<T>(response);
  },

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  },

  async put<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  },

  async patch<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  },

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};

// Export singleton instance
export default apiClient;
