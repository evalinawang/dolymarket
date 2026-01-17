/**
 * Core domain types for the Stake application
 */

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Circle {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  members: User[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface BetOption {
  id: string;
  label: string;
  odds?: number;
}

export interface Bet {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  circleId?: string;
  options: BetOption[];
  status: 'pending' | 'active' | 'resolved' | 'cancelled';
  resolvedAt?: string;
  resolutionDetails?: {
    winningOptionId: string;
    winnerIds: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface BetParticipant {
  id: string;
  betId: string;
  userId: string;
  selectedOptionId: string;
  amount: number;
  createdAt: string;
}

export interface StakeTemplate {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  proofType: string;
  createdAt: string;
}

export interface ProofUpload {
  id: string;
  betId: string;
  userId: string;
  proof: string; // Could be image URL, text, etc.
  templateId?: string;
  createdAt: string;
}

export interface IdentityBadge {
  id: string;
  userId: string;
  badgeName: string;
  issuer: string;
  verifiedAt: string;
}

export interface StakeInstance {
  id: string;
  templateId: string;
  userId: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  verifiedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    status: number;
    message: string;
    details?: unknown;
  };
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}
