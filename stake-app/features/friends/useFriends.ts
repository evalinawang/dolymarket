/**
 * TanStack Query hooks for Friends & Follow features
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, FriendRequest, Friendship, Follow } from '@/types';
import apiClient from '@/lib/apiClient';

// Query keys
export const friendKeys = {
  all: ['friends'] as const,
  search: () => [...friendKeys.all, 'search'] as const,
  searchQuery: (query: string) => [...friendKeys.search(), query] as const,
  requests: () => [...friendKeys.all, 'requests'] as const,
  list: () => [...friendKeys.all, 'list'] as const,
  following: () => [...friendKeys.all, 'following'] as const,
  pendingRequests: () => [...friendKeys.all, 'pending-requests'] as const,
};

/**
 * Search users by username
 */
export function useSearchUsers(query: string) {
  return useQuery({
    queryKey: friendKeys.searchQuery(query),
    queryFn: async () => {
      // TODO: Replace with actual API call
      return apiClient.get<User[]>('/users/search', {
        params: { q: query },
      });
    },
    enabled: query.length > 0,
  });
}

/**
 * Get current user's friends list
 */
export function useFriendsList() {
  return useQuery({
    queryKey: friendKeys.list(),
    queryFn: async () => {
      // TODO: Replace with actual API call
      return apiClient.get<Friendship[]>('/friends');
    },
  });
}

/**
 * Get current user's following list
 */
export function useFollowingList() {
  return useQuery({
    queryKey: friendKeys.following(),
    queryFn: async () => {
      // TODO: Replace with actual API call
      return apiClient.get<Follow[]>('/following');
    },
  });
}

/**
 * Get pending friend requests for current user
 */
export function usePendingFriendRequests() {
  return useQuery({
    queryKey: friendKeys.pendingRequests(),
    queryFn: async () => {
      // TODO: Replace with actual API call
      return apiClient.get<FriendRequest[]>('/friends/requests/pending');
    },
  });
}

/**
 * Send friend request to a user
 */
export function useSendFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipientId: string) => {
      // TODO: Replace with actual API call
      return apiClient.post<FriendRequest>('/friends/requests', {
        recipientId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: friendKeys.search() });
      queryClient.invalidateQueries({ queryKey: friendKeys.pendingRequests() });
    },
  });
}

/**
 * Accept a friend request
 */
export function useAcceptFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      // TODO: Replace with actual API call
      return apiClient.post<Friendship>(`/friends/requests/${requestId}/accept`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: friendKeys.pendingRequests() });
      queryClient.invalidateQueries({ queryKey: friendKeys.list() });
    },
  });
}

/**
 * Decline a friend request
 */
export function useDeclineFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      // TODO: Replace with actual API call
      return apiClient.post(`/friends/requests/${requestId}/decline`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: friendKeys.pendingRequests() });
    },
  });
}

/**
 * Follow a user
 */
export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      // TODO: Replace with actual API call
      return apiClient.post<Follow>('/following', { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: friendKeys.following() });
      queryClient.invalidateQueries({ queryKey: friendKeys.search() });
    },
  });
}

/**
 * Unfollow a user
 */
export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      // TODO: Replace with actual API call
      return apiClient.delete(`/following/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: friendKeys.following() });
      queryClient.invalidateQueries({ queryKey: friendKeys.search() });
    },
  });
}
