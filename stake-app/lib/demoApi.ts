/**
 * Mock API client for Demo Mode
 * 
 * This module provides a drop-in replacement for the real API client
 * when DEMO_MODE is enabled. It reads from the local demoData.json
 * and simulates all API endpoints with realistic response times.
 */

import demoData from './demoData.json';
import { User, Bet, Circle, Friendship, Follow, IdentityBadgeDetail, BetParticipant } from '@/types';

// Simulate network delay for realistic UX
const SIMULATE_DELAY = 300; // ms

function delay(ms: number = SIMULATE_DELAY): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getDelay(): number {
  // Random delay between 150-400ms
  return Math.random() * 250 + 150;
}

// ============================================================================
// AUTH ENDPOINTS
// ============================================================================

async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  await delay(getDelay());

  // Accept any demo user email + any password for demo mode
  const user = demoData.users.find(u => u.email === email);

  if (!user) {
    throw new Error('User not found');
  }

  return {
    user,
    token: `demo-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
}

async function signup(email: string, password: string, displayName: string): Promise<{ user: User; token: string }> {
  await delay(getDelay());

  // Check if user exists
  if (demoData.users.some(u => u.email === email)) {
    throw new Error('User already exists');
  }

  // Create new user
  const newUser: User = {
    id: `user-${demoData.users.length + 1}`,
    username: email.split('@')[0],
    email,
    displayName,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email.split('@')[0]}`,
    bio: 'Just joined Rumble!',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    user: newUser,
    token: `demo-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
}

// ============================================================================
// CIRCLES ENDPOINTS
// ============================================================================

async function getCircles(): Promise<Circle[]> {
  await delay(getDelay());

  return demoData.circles.map(circle => {
    const members = demoData.circleMembers
      .filter(m => m.circleId === circle.id)
      .map(m => {
        const user = demoData.users.find(u => u.id === m.userId);
        return user!;
      });

    return {
      ...circle,
      members,
    };
  });
}

async function getCircle(circleId: string): Promise<Circle> {
  await delay(getDelay());

  const circle = demoData.circles.find(c => c.id === circleId);
  if (!circle) throw new Error('Circle not found');

  const members = demoData.circleMembers
    .filter(m => m.circleId === circleId)
    .map(m => {
      const user = demoData.users.find(u => u.id === m.userId);
      return user!;
    });

  return {
    ...circle,
    members,
  };
}

async function createCircle(data: { name: string; description?: string }): Promise<Circle> {
  await delay(getDelay());

  const newCircle: Circle = {
    id: `circle-${Date.now()}`,
    name: data.name,
    description: data.description,
    members: [],
    createdBy: 'user-001', // current user in demo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newCircle;
}

async function updateCircle(circleId: string, data: Partial<Circle>): Promise<Circle> {
  await delay(getDelay());

  const circle = demoData.circles.find(c => c.id === circleId);
  if (!circle) throw new Error('Circle not found');

  const updated = { ...circle, ...data, updatedAt: new Date().toISOString() };

  const members = demoData.circleMembers
    .filter(m => m.circleId === circleId)
    .map(m => {
      const user = demoData.users.find(u => u.id === m.userId);
      return user!;
    });

  return {
    ...updated,
    members,
  };
}

async function deleteCircle(circleId: string): Promise<void> {
  await delay(getDelay());
  // Mock delete - just return success
}

async function generateInviteCode(circleId: string): Promise<{ code: string; link: string }> {
  await delay(getDelay());

  const code = Math.random().toString(36).substr(2, 8).toUpperCase();
  const link = `${typeof window !== 'undefined' ? window.location.origin : ''}/circles/join?code=${code}`;

  return { code, link };
}

async function joinCircleWithCode(code: string): Promise<Circle> {
  await delay(getDelay());

  // Return first circle in demo mode
  return getCircle(demoData.circles[0].id);
}

// ============================================================================
// BETS ENDPOINTS
// ============================================================================

async function getBets(filter?: { status?: string; circleId?: string }): Promise<Bet[]> {
  await delay(getDelay());

  let bets = demoData.bets;

  if (filter?.status) {
    bets = bets.filter(b => b.status === filter.status);
  }

  if (filter?.circleId) {
    bets = bets.filter(b => b.circleId === filter.circleId);
  }

  return bets.map(bet => enrichBet(bet));
}

async function getExplore(): Promise<Bet[]> {
  await delay(getDelay());

  // Return all bets that are not in user's circles (for demo, return filtered set)
  return demoData.bets.map(bet => enrichBet(bet));
}

async function getUserBets(): Promise<Array<{ bet: Bet; participant: BetParticipant }>> {
  await delay(getDelay());

  const participants = demoData.betParticipants.filter((p: any) => p.userId === 'user-001');

  return participants.map((participant: any) => {
    const bet = demoData.bets.find((b: any) => b.id === participant.betId);
    return {
      bet: enrichBet(bet!),
      participant: {
        ...participant,
        status: participant.status as 'pending' | 'won' | 'lost' | undefined,
      },
    };
  });
}

async function getBet(betId: string): Promise<Bet> {
  await delay(getDelay());

  const bet = demoData.bets.find(b => b.id === betId);
  if (!bet) throw new Error('Bet not found');

  return enrichBet(bet);
}

function enrichBet(bet: any): Bet {
  const options = demoData.betOptions.filter(o => o.betId === bet.id);
  const participants = demoData.betParticipants.filter(p => p.betId === bet.id);

  return {
    ...bet,
    options: options.map(o => ({
      id: o.id,
      label: o.label,
    })),
    participants: participants.map(p => {
      const user = demoData.users.find(u => u.id === p.userId);
      const option = options.find(o => o.id === p.selectedOptionId);
      return {
        ...p,
        user,
        selectedOption: option ? { id: option.id, label: option.label } : undefined,
      };
    }),
  };
}

async function createBet(data: any): Promise<Bet> {
  await delay(getDelay());

  const newBet: Bet = {
    id: `bet-${Date.now()}`,
    title: data.title,
    description: data.description,
    createdBy: 'user-001', // current user
    circleId: data.circleId,
    status: 'OPEN',
    deadline: data.deadline,
    stakeAmount: data.stakeAmount,
    proofRequirement: data.proofRequirement || 'NONE',
    privacy: data.privacy || 'CIRCLE_PRIVATE',
    options: data.options || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newBet;
}

async function updateBet(betId: string, data: Partial<Bet>): Promise<Bet> {
  await delay(getDelay());

  const bet = demoData.bets.find(b => b.id === betId);
  if (!bet) throw new Error('Bet not found');

  const updated = { ...bet, ...data, updatedAt: new Date().toISOString() };
  return enrichBet(updated);
}

async function placePick(betId: string, optionId: string): Promise<Bet> {
  await delay(getDelay());

  // Mock implementation - return updated bet
  return getBet(betId);
}

async function resolveBet(betId: string, data: { winningOptionId: string }): Promise<Bet> {
  await delay(getDelay());

  const bet = demoData.bets.find(b => b.id === betId);
  if (!bet) throw new Error('Bet not found');

  const updated = {
    ...bet,
    status: 'RESOLVED' as const,
    resolvedAt: new Date().toISOString(),
    resolutionDetails: {
      winningOptionId: data.winningOptionId,
      winnerIds: demoData.betParticipants
        .filter(p => p.betId === betId && p.selectedOptionId === data.winningOptionId)
        .map(p => p.userId),
    },
  };

  return enrichBet(updated);
}

async function participateInBet(betId: string, data: { optionId: string }): Promise<void> {
  await delay(getDelay());
  // Mock implementation
}

async function uploadProof(betId: string, data: any): Promise<any> {
  await delay(getDelay());

  return {
    id: `proof-${Date.now()}`,
    betId,
    userId: 'user-001',
    proofUrl: data.proofUrl,
    proofType: data.proofType,
    uploadedAt: new Date().toISOString(),
  };
}

// ============================================================================
// FRIENDS ENDPOINTS
// ============================================================================

async function getFriends(): Promise<Friendship[]> {
  await delay(getDelay());

  return demoData.friendships.map(f => {
    const friend = demoData.users.find(u => u.id === f.friendId);
    return {
      ...f,
      friend,
    };
  });
}

async function getFollowing(): Promise<Follow[]> {
  await delay(getDelay());

  return demoData.follows.map(f => {
    const user = demoData.users.find(u => u.id === f.followingId);
    return {
      ...f,
      user,
    };
  });
}

async function searchUsers(query: string): Promise<User[]> {
  await delay(getDelay());

  const lowercase = query.toLowerCase();
  return demoData.users.filter(
    u =>
      u.username.toLowerCase().includes(lowercase) ||
      u.displayName.toLowerCase().includes(lowercase) ||
      u.email.toLowerCase().includes(lowercase)
  );
}

async function sendFriendRequest(userId: string): Promise<any> {
  await delay(getDelay());

  return {
    id: `req-${Date.now()}`,
    senderId: 'user-001',
    recipientId: userId,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
}

async function acceptFriendRequest(requestId: string): Promise<Friendship> {
  await delay(getDelay());

  return {
    id: `friend-${Date.now()}`,
    userId: 'user-001',
    friendId: requestId,
    createdAt: new Date().toISOString(),
  };
}

async function declineFriendRequest(requestId: string): Promise<void> {
  await delay(getDelay());
}

async function getPendingFriendRequests(): Promise<any[]> {
  await delay(getDelay());

  return [];
}

async function followUser(userId: string): Promise<Follow> {
  await delay(getDelay());

  return {
    id: `follow-${Date.now()}`,
    followerId: 'user-001',
    followingId: userId,
    createdAt: new Date().toISOString(),
  };
}

async function unfollowUser(userId: string): Promise<void> {
  await delay(getDelay());
}

// ============================================================================
// PROFILE ENDPOINTS
// ============================================================================

async function getIdentityBadge(): Promise<IdentityBadgeDetail | null> {
  await delay(getDelay());

  // Return badge for demo user in IdentityBadgeDetail format
  const badge = (demoData.identityBadges as any[]).find(b => b.userId === 'user-001');
  
  if (!badge) return null;

  return {
    id: badge.id,
    userId: badge.userId,
    title: badge.badgeName,
    description: 'User trust badge based on community activity',
    pillars: {
      express: badge.pillarScores.Express,
      protect: badge.pillarScores.Protect,
      create: badge.pillarScores.Create,
      evolve: badge.pillarScores.Evolve,
    },
    generatedAt: badge.verifiedAt,
    updatedAt: badge.verifiedAt,
  };
}

async function refreshPillarScore(): Promise<IdentityBadgeDetail> {
  await delay(getDelay());

  const badge = await getIdentityBadge();
  if (!badge) throw new Error('Badge not found');

  return badge;
}

async function updatePillarScore(data: any): Promise<IdentityBadgeDetail> {
  await delay(getDelay());

  const badge = await getIdentityBadge();
  if (!badge) throw new Error('Badge not found');

  return badge;
}

async function getUserStats(): Promise<any> {
  await delay(getDelay());

  return {
    totalBetsCreated: demoData.bets.filter(b => b.createdBy === 'user-001').length,
    totalBetsParticipated: demoData.betParticipants.filter(p => p.userId === 'user-001').length,
    wins: demoData.betParticipants.filter(p => p.userId === 'user-001' && p.status === 'won').length,
    losses: demoData.betParticipants.filter(p => p.userId === 'user-001' && p.status === 'lost').length,
    winRate: 0.65,
  };
}

// ============================================================================
// EXPORT MOCK API CLIENT
// ============================================================================

export const demoApi = {
  // Auth
  login,
  signup,

  // Circles
  getCircles,
  getCircle,
  createCircle,
  updateCircle,
  deleteCircle,
  generateInviteCode,
  joinCircleWithCode,

  // Bets
  getBets,
  getBet,
  getExplore,
  getUserBets,
  createBet,
  updateBet,
  placePick,
  resolveBet,
  participateInBet,
  uploadProof,

  // Friends
  getFriends,
  getFollowing,
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getPendingFriendRequests,
  followUser,
  unfollowUser,

  // Profile
  getIdentityBadge,
  refreshPillarScore,
  updatePillarScore,
  getUserStats,
};
