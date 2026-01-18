/**
 * TanStack Query hooks for Bets feature
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bet } from '@/types';
import apiClient from '@/lib/apiClient';

// Query keys
export const betKeys = {
  all: ['bets'] as const,
  lists: () => [...betKeys.all, 'list'] as const,
  list: (circleId?: string) => [...betKeys.lists(), circleId] as const,
  feed: () => [...betKeys.all, 'feed'] as const,
  explore: () => [...betKeys.all, 'explore'] as const,
  exploreSorted: (sortBy?: string) => [...betKeys.explore(), sortBy] as const,
  pending: () => [...betKeys.all, 'pending'] as const,
  details: () => [...betKeys.all, 'detail'] as const,
  detail: (betId: string) => [...betKeys.details(), betId] as const,
};

/**
 * Fetch all bets (optionally filtered by circle)
 */
export function useBets(circleId?: string) {
  return useQuery({
    queryKey: betKeys.list(circleId),
    queryFn: async () => {
      // TODO: Replace with actual API call
      const endpoint = circleId ? `/circles/${circleId}/bets` : '/bets';
      return apiClient.get<Bet[]>(endpoint);
    },
  });
}

/**
 * Fetch home feed of accessible bets (OPEN + LOCKED first)
 */
export function useHomeFeed() {
  return useQuery({
    queryKey: betKeys.feed(),
    queryFn: async () => {
      // TODO: Replace with actual API call
      // Should return bets from all accessible circles, sorted by status (OPEN/LOCKED first) and deadline
      return apiClient.get<Bet[]>('/bets/feed');
    },
  });
}

/**
 * Fetch user's pending stake instances
 */
export function usePendingStakes() {
  return useQuery({
    queryKey: betKeys.pending(),
    queryFn: async () => {
      // TODO: Replace with actual API call
      return apiClient.get<Array<{ bet: Bet; participant: any }>>(
        '/stakes/pending'
      );
    },
  });
}

/**
 * Fetch explore feed - FRIENDS_PUBLIC bets from friends/following only
 * Sorted newest first
 */
export function useExploreFeed(sortBy: string = 'newest') {
  return useQuery({
    queryKey: betKeys.exploreSorted(sortBy),
    queryFn: async () => {
      // TODO: Replace with actual API call
      // Should return FRIENDS_PUBLIC bets from friends + following
      // Sorted by: 'newest' (createdAt DESC), 'deadline' (deadline ASC), 'active' (OPEN/LOCKED first)
      return apiClient.get<Bet[]>('/bets/explore', {
        params: { sortBy },
      });
    },
  });
}

/**
 * Fetch a single bet's details
 */
export function useBetDetail(betId: string) {
  return useQuery({
    queryKey: betKeys.detail(betId),
    queryFn: async () => {
      // TODO: Replace with actual API call
      return apiClient.get<Bet>(`/bets/${betId}`);
    },
    enabled: !!betId,
  });
}

export interface CreateBetData {
  circleId: string;
  title: string;
  description?: string;
  options: Array<{ label: string }>;
  deadline: string; // ISO datetime string
  proofRequirement: 'NONE' | 'PHOTO' | 'VIDEO';
  privacy: 'FRIENDS_PUBLIC' | 'CIRCLE_PRIVATE';
}

/**
 * Create a new bet
 */
export function useCreateBet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBetData) => {
      // Demo support - create a mock bet if backend unavailable
      try {
        return await apiClient.post<Bet>('/bets', data);
      } catch {
        // Demo mode: generate a mock bet
        const mockBet: Bet = {
          id: `bet-${Date.now()}`,
          circleId: data.circleId,
          title: data.title,
          description: data.description || '',
          createdBy: 'user-demo-001',
          options: (data.options || []).map((opt, i) => ({
            id: `opt-${i}`,
            label: opt.label,
            count: 0,
          })),
          deadline: data.deadline,
          status: 'OPEN',
          proofRequirement: data.proofRequirement || 'NONE',
          privacy: data.privacy || 'FRIENDS_PUBLIC',
          participants: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return mockBet;
      }
    },
    onSuccess: (newBet) => {
      // Invalidate bet lists to refetch
      queryClient.invalidateQueries({ queryKey: betKeys.lists() });
      // Add the new bet to the cache
      queryClient.setQueryData(betKeys.detail(newBet.id), newBet);
    },
  });
}

/**
 * Update a bet (only host can do this)
 */
export function useUpdateBet(betId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<CreateBetData>) => {
      // TODO: Replace with actual API call
      return apiClient.patch<Bet>(`/bets/${betId}`, data);
    },
    onSuccess: (updatedBet) => {
      queryClient.setQueryData(betKeys.detail(betId), updatedBet);
      queryClient.invalidateQueries({ queryKey: betKeys.lists() });
    },
  });
}

/**
 * Participate in a bet
 */
export function useParticipateInBet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      betId: string;
      optionId: string;
      amount: number;
    }) => {
      // TODO: Replace with actual API call
      return apiClient.post(`/bets/${data.betId}/participate`, {
        optionId: data.optionId,
        amount: data.amount,
      });
    },
    onSuccess: (_, { betId }) => {
      queryClient.invalidateQueries({ queryKey: betKeys.detail(betId) });
    },
  });
}

/**
 * Resolve a bet (host only)
 */
export function useResolveBet(betId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { winningOptionId: string }) => {
      // TODO: Replace with actual API call
      return apiClient.post<Bet>(`/bets/${betId}/resolve`, data);
    },
    onSuccess: (resolvedBet) => {
      queryClient.setQueryData(betKeys.detail(betId), resolvedBet);
      queryClient.invalidateQueries({ queryKey: betKeys.lists() });
    },
  });
}

/**
 * Update a participant's pick (only if bet is OPEN)
 */
export function useUpdateParticipantPick(betId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { optionId: string }) => {
      // TODO: Replace with actual API call
      return apiClient.patch(`/bets/${betId}/pick`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: betKeys.detail(betId) });
    },
  });
}

/**
 * Upload proof for a stake instance
 */
export function useUploadProof(betId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      stakeInstanceId: string;
      file: File;
      proofType: 'PHOTO' | 'VIDEO';
    }) => {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('proofType', data.proofType);

      // TODO: Replace with actual API call
      return apiClient.post(
        `/bets/${betId}/stakes/${data.stakeInstanceId}/proof`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: betKeys.detail(betId) });
    },
  });
}
