/**
 * Fetch-based API client wrapper with built-in auth and error handling
 * 
 * When DEMO_MODE is enabled via NEXT_PUBLIC_DEMO_MODE=true, all requests
 * are routed to the demoApi instead of the real backend.
 */

import { ApiResponse, AuthToken } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
const IS_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

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

// ============================================================================
// DEMO MODE ROUTING
// ============================================================================

/**
 * Route API requests to the mock demo API based on the endpoint
 */
async function demoRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { demoApi } = await import('./demoApi');
  const method = options.method || 'GET';
  const body = options.body;

  // Route to appropriate demo API function based on endpoint and method
  if (endpoint === '/auth/login' && method === 'POST') {
    const { email, password } = body as { email: string; password: string };
    return demoApi.login(email, password) as Promise<T>;
  }

  if (endpoint === '/auth/signup' && method === 'POST') {
    const { email, password, displayName } = body as { email: string; password: string; displayName: string };
    return demoApi.signup(email, password, displayName) as Promise<T>;
  }

  if (endpoint === '/circles' && method === 'GET') {
    return demoApi.getCircles() as Promise<T>;
  }

  if (endpoint.match(/^\/circles\/[^/]+$/) && method === 'GET') {
    const circleId = endpoint.split('/')[2];
    return demoApi.getCircle(circleId) as Promise<T>;
  }

  if (endpoint === '/circles' && method === 'POST') {
    return demoApi.createCircle(body as any) as Promise<T>;
  }

  if (endpoint.match(/^\/circles\/[^/]+$/) && method === 'PATCH') {
    const circleId = endpoint.split('/')[2];
    return demoApi.updateCircle(circleId, body as any) as Promise<T>;
  }

  if (endpoint.match(/^\/circles\/[^/]+$/) && method === 'DELETE') {
    const circleId = endpoint.split('/')[2];
    return demoApi.deleteCircle(circleId) as Promise<T>;
  }

  if (endpoint.match(/^\/circles\/[^/]+\/invite-code$/) && method === 'POST') {
    const circleId = endpoint.split('/')[2];
    return demoApi.generateInviteCode(circleId) as Promise<T>;
  }

  if (endpoint === '/circles/join' && method === 'POST') {
    const { code } = body as { code: string };
    return demoApi.joinCircleWithCode(code) as Promise<T>;
  }

  // Bets endpoints
  if (endpoint === '/bets' && method === 'GET') {
    const params = options.params as any;
    return demoApi.getBets({
      status: params?.status,
      circleId: params?.circleId,
    }) as Promise<T>;
  }

  if (endpoint === '/bets/feed' && method === 'GET') {
    return demoApi.getUserBets() as Promise<T>;
  }

  if (endpoint === '/bets/explore' && method === 'GET') {
    return demoApi.getExplore() as Promise<T>;
  }

  if (endpoint.match(/^\/bets\/[^/]+$/) && method === 'GET') {
    const betId = endpoint.split('/')[2];
    return demoApi.getBet(betId) as Promise<T>;
  }

  if (endpoint === '/bets' && method === 'POST') {
    return demoApi.createBet(body as any) as Promise<T>;
  }

  if (endpoint.match(/^\/bets\/[^/]+$/) && method === 'PATCH') {
    const betId = endpoint.split('/')[2];
    return demoApi.updateBet(betId, body as any) as Promise<T>;
  }

  if (endpoint.match(/^\/bets\/[^/]+\/pick$/) && method === 'PATCH') {
    const betId = endpoint.split('/')[2];
    const { optionId } = body as { optionId: string };
    return demoApi.placePick(betId, optionId) as Promise<T>;
  }

  if (endpoint.match(/^\/bets\/[^/]+\/resolve$/) && method === 'POST') {
    const betId = endpoint.split('/')[2];
    return demoApi.resolveBet(betId, body as any) as Promise<T>;
  }

  if (endpoint.match(/^\/bets\/[^/]+\/participate$/) && method === 'POST') {
    const betId = endpoint.split('/')[2];
    return demoApi.participateInBet(betId, body as any) as Promise<T>;
  }

  if (endpoint.match(/^\/bets\/[^/]+\/proof$/) && method === 'POST') {
    const betId = endpoint.split('/')[2];
    return demoApi.uploadProof(betId, body as any) as Promise<T>;
  }

  // Friends endpoints
  if (endpoint === '/friends' && method === 'GET') {
    return demoApi.getFriends() as Promise<T>;
  }

  if (endpoint === '/following' && method === 'GET') {
    return demoApi.getFollowing() as Promise<T>;
  }

  if (endpoint === '/friends/requests/pending' && method === 'GET') {
    return demoApi.getPendingFriendRequests() as Promise<T>;
  }

  if (endpoint === '/users/search' && method === 'GET') {
    const params = options.params as any;
    return demoApi.searchUsers(params?.q || '') as Promise<T>;
  }

  if (endpoint === '/friends/requests' && method === 'POST') {
    const { userId } = body as { userId: string };
    return demoApi.sendFriendRequest(userId) as Promise<T>;
  }

  if (endpoint.match(/^\/friends\/requests\/[^/]+\/accept$/) && method === 'POST') {
    const requestId = endpoint.split('/')[3];
    return demoApi.acceptFriendRequest(requestId) as Promise<T>;
  }

  if (endpoint.match(/^\/friends\/requests\/[^/]+\/decline$/) && method === 'POST') {
    const requestId = endpoint.split('/')[3];
    return demoApi.declineFriendRequest(requestId) as Promise<T>;
  }

  if (endpoint === '/following' && method === 'POST') {
    const { userId } = body as { userId: string };
    return demoApi.followUser(userId) as Promise<T>;
  }

  if (endpoint.match(/^\/following\/[^/]+$/) && method === 'DELETE') {
    const userId = endpoint.split('/')[2];
    return demoApi.unfollowUser(userId) as Promise<T>;
  }

  // Profile endpoints
  if (endpoint === '/identity/badge' && method === 'GET') {
    return demoApi.getIdentityBadge() as Promise<T>;
  }

  if (endpoint === '/identity/refresh' && method === 'POST') {
    return demoApi.refreshPillarScore() as Promise<T>;
  }

  if (endpoint === '/identity/update' && method === 'PATCH') {
    return demoApi.updatePillarScore(body as any) as Promise<T>;
  }

  if (endpoint === '/profile/stats' && method === 'GET') {
    return demoApi.getUserStats() as Promise<T>;
  }

  // Fallback - log unhandled endpoint
  console.warn(`[Demo Mode] Unhandled endpoint: ${method} ${endpoint}`);
  throw new ApiError(404, `Endpoint not found in demo mode: ${endpoint}`);
}

export const apiClient = {
  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    // Route to demo API if demo mode is enabled
    if (IS_DEMO_MODE) {
      return demoRequest<T>(endpoint, options);
    }

    // Standard API request flow for production
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
