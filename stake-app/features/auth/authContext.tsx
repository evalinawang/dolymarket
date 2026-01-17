'use client';

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { User, AuthState } from '@/types';
import { authStorage } from '@/lib/auth';
import apiClient from '@/lib/apiClient';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    error: null,
  });

  // Restore auth state from localStorage on mount
  useEffect(() => {
    const token = authStorage.getToken();
    const user = authStorage.getUser();

    if (token && user) {
      setAuthState({
        user,
        token,
        isLoading: false,
        error: null,
      });
    } else {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        // TODO: Replace with actual API call when backend is ready
        const response = await apiClient.post<{
          user: User;
          token: string;
        }>('/auth/login', { email, password });

        const { user, token } = response;

        authStorage.setToken(token);
        authStorage.setUser(user);

        setAuthState({
          user,
          token,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed';
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: message,
        }));
        throw err;
      }
    },
    []
  );

  const signup = useCallback(
    async (email: string, password: string, displayName: string) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        // TODO: Replace with actual API call when backend is ready
        const response = await apiClient.post<{
          user: User;
          token: string;
        }>('/auth/signup', { email, password, displayName });

        const { user, token } = response;

        authStorage.setToken(token);
        authStorage.setUser(user);

        setAuthState({
          user,
          token,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Signup failed';
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: message,
        }));
        throw err;
      }
    },
    []
  );

  const logout = useCallback(() => {
    authStorage.clear();
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    isAuthenticated: !!authState.token && !!authState.user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
