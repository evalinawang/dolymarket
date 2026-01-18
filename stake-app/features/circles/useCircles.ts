/**
 * TanStack Query hooks for Circles feature
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Circle } from '@/types';
import apiClient from '@/lib/apiClient';

// Query keys
export const circleKeys = {
  all: ['circles'] as const,
  lists: () => [...circleKeys.all, 'list'] as const,
  list: (userId: string) => [...circleKeys.lists(), userId] as const,
  details: () => [...circleKeys.all, 'detail'] as const,
  detail: (circleId: string) => [...circleKeys.details(), circleId] as const,
  invite: (circleId: string) => [...circleKeys.detail(circleId), 'invite'] as const,
};

/**
 * Fetch all circles for the current user
 */
export function useCircles(userId?: string) {
  return useQuery({
    queryKey: circleKeys.list(userId || ''),
    queryFn: async () => {
      try {
        // TODO: Replace with actual API call
        return await apiClient.get<Circle[]>('/circles');
      } catch (error) {
        // Demo mode: return empty array instead of throwing
        console.warn('Failed to load circles, showing empty state instead of error');
        return [];
      }
    },
    enabled: !!userId,
  });
}

/**
 * Fetch a single circle's details
 */
export function useCircleDetail(circleId: string) {
  return useQuery({
    queryKey: circleKeys.detail(circleId),
    queryFn: async () => {
      // TODO: Replace with actual API call
      return apiClient.get<Circle>(`/circles/${circleId}`);
    },
    enabled: !!circleId,
  });
}

/**
 * Create a new circle
 */
export function useCreateCircle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; description?: string }) => {
      // TODO: Replace with actual API call
      return apiClient.post<Circle>('/circles', data);
    },
    onSuccess: (newCircle) => {
      // Invalidate the circles list to refetch
      queryClient.invalidateQueries({ queryKey: circleKeys.lists() });
      // Add the new circle to the cache
      queryClient.setQueryData(circleKeys.detail(newCircle.id), newCircle);
    },
  });
}

/**
 * Generate an invite code/link for a circle
 */
export function useGenerateInviteCode(circleId: string) {
  return useMutation({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      return apiClient.post<{ code: string; link: string }>(
        `/circles/${circleId}/invite`,
        {}
      );
    },
  });
}

/**
 * Join a circle using an invite code
 */
export function useJoinCircleWithCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (code: string) => {
      // TODO: Replace with actual API call
      return apiClient.post<Circle>('/circles/join', { code });
    },
    onSuccess: () => {
      // Invalidate circles list to refetch
      queryClient.invalidateQueries({ queryKey: circleKeys.lists() });
    },
  });
}

/**
 * Update circle details
 */
export function useUpdateCircle(circleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name?: string; description?: string }) => {
      // TODO: Replace with actual API call
      return apiClient.patch<Circle>(`/circles/${circleId}`, data);
    },
    onSuccess: (updatedCircle) => {
      queryClient.setQueryData(circleKeys.detail(circleId), updatedCircle);
      queryClient.invalidateQueries({ queryKey: circleKeys.lists() });
    },
  });
}

/**
 * Delete a circle
 */
export function useDeleteCircle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (circleId: string) => {
      // TODO: Replace with actual API call
      return apiClient.delete(`/circles/${circleId}`);
    },
    onSuccess: (_, circleId) => {
      queryClient.removeQueries({ queryKey: circleKeys.detail(circleId) });
      queryClient.invalidateQueries({ queryKey: circleKeys.lists() });
    },
  });
}
