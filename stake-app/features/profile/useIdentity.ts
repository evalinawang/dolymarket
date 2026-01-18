/**
 * TanStack Query hooks for Identity Badges
 * Uses Gemini integration on backend (no frontend Gemini calls)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IdentityBadgeDetail, UserStats } from '@/types';
import apiClient from '@/lib/apiClient';

// Query keys
export const identityKeys = {
  all: ['identity'] as const,
  badge: () => [...identityKeys.all, 'badge'] as const,
  stats: () => [...identityKeys.all, 'stats'] as const,
};

/**
 * Fetch user's identity badge
 * If missing, backend should return null (user can trigger generation)
 */
export function useIdentityBadge(userId?: string) {
  return useQuery({
    queryKey: identityKeys.badge(),
    queryFn: async () => {
      // TODO: Replace with actual API call
      // Returns null if badge doesn't exist yet
      return apiClient.get<IdentityBadgeDetail | null>('/identity/badge');
    },
    enabled: !!userId || true, // Always enabled for current user
  });
}

/**
 * Trigger identity badge generation via Gemini (backend only)
 * Backend will call Gemini, generate badge, and store it
 */
export function useGenerateIdentityBadge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // Backend handles Gemini call internally
      return apiClient.post<IdentityBadgeDetail>(
        '/identity/badge/generate',
        {}
      );
    },
    onSuccess: (badge) => {
      // Update cache with generated badge
      queryClient.setQueryData(identityKeys.badge(), badge);
    },
  });
}

/**
 * Regenerate identity badge (recalculate from latest activity)
 */
export function useRegenerateIdentityBadge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      return apiClient.post<IdentityBadgeDetail>(
        '/identity/badge/regenerate',
        {}
      );
    },
    onSuccess: (badge) => {
      queryClient.setQueryData(identityKeys.badge(), badge);
    },
  });
}

/**
 * Fetch user stats (bets won/lost, friends, following)
 */
export function useUserStats(userId?: string) {
  return useQuery({
    queryKey: identityKeys.stats(),
    queryFn: async () => {
      // TODO: Replace with actual API call
      return apiClient.get<UserStats>('/profile/stats');
    },
  });
}
