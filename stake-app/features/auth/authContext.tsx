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
        // Demo login support - allow demo@rumble.app / demopass123
        if (email === 'demo@rumble.app' && password === 'demopass123') {
          const demoUser: User = {
            id: 'user-001',
            email: 'alex@rumble.app',
            username: 'alexfitness',
            displayName: 'Alex Chen',
            bio: 'Gym rat and competitive bettor 💪',
            createdAt: new Date('2025-01-01').toISOString(),
            updatedAt: new Date().toISOString(),
          };
          const demoToken = 'demo-token-' + Date.now();

          authStorage.setToken(demoToken);
          authStorage.setUser(demoUser);

          setAuthState({
            user: demoUser,
            token: demoToken,
            isLoading: false,
            error: null,
          });
          return;
        }

        // Regular API call when backend is ready
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
    async (email: string, password: string, username: string) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        // Demo signup support - create demo user accounts
        if (email && password && username) {
          const demoUser: User = {
            id: `user-${Date.now()}`,
            email,
            username,
            displayName: username,
            bio: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          const demoToken = 'demo-token-' + Date.now();

          authStorage.setToken(demoToken);
          authStorage.setUser(demoUser);

          setAuthState({
            user: demoUser,
            token: demoToken,
            isLoading: false,
            error: null,
          });
          return;
        }

        // Regular API call when backend is ready
        const response = await apiClient.post<{
          user: User;
          token: string;
        }>('/auth/signup', { email, password, username });

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
