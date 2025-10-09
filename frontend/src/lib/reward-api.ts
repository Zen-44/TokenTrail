/**
 * Reward API functions for festival management
 */

import { getStoredToken } from './auth';
import { API_BASE_URL } from '@/config';

export enum RewardCategory {
  Merchandise = 'Merchandise',
  FoodAndDrinks = 'FoodAndDrinks',
  Electronics = 'Electronics',
  Experiences = 'Experiences'
}

export enum RewardTag {
  Limited = 'Limited',
  Common = 'Common',
  Rare = 'Rare',
  Premium = 'Premium'
}

export interface Reward {
  id?: number;
  title: string;
  description: string;
  price: number;
  location: string;
  festivalId: number;
  image: string;
  stock: number;
  category: RewardCategory;
  tag: RewardTag;
}



export interface UserClaim {
  id: number;
  nonce: string;
  transaction: string;
  status: "PENDING" | "PROCESSED" | "FAILED";
  claimCode: string;
  claimCodeUsed: boolean;
  createdAt: string;
  updatedAt: string;
  rewardId: number;
  userId: number;
  reward: Reward;
}

/**
 * Get authorization headers for API requests
 */
function getAuthHeaders(): HeadersInit {
  const token = getStoredToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
}

/**
 * Fetch all rewards for a festival
 */
export async function fetchRewards(festivalId: number): Promise<Reward[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/rewards/${festivalId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch rewards: ${response.status}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching rewards:', error);
    throw new Error('Failed to fetch rewards. Please try again.');
  }
}

/**
 * Create a new reward
 * @param reward The reward to create (without id)
 */
export async function createReward(reward: Omit<Reward, 'id'>): Promise<Reward> {
  try {
    const response = await fetch(`${API_BASE_URL}/rewards`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reward),
    });

    if (!response.ok) {
      throw new Error(`Failed to create reward: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating reward:', error);
    throw new Error('Failed to create reward. Please try again.');
  }
}

/**
 * Update a reward
 * @param rewardId The ID of the reward to update
 * @param reward The updated reward data (partial, without id and festivalId)
 */
export async function updateReward(rewardId: number, reward: Partial<Omit<Reward, 'id' | 'festivalId'>>): Promise<Reward> {
  try {
    const response = await fetch(`${API_BASE_URL}/rewards/${rewardId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(reward),
    });

    if (!response.ok) {
      throw new Error(`Failed to update reward: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating reward:', error);
    throw new Error('Failed to update reward. Please try again.');
  }
}

/**
 * Delete a reward
 * @param rewardId The ID of the reward to delete
 */
export async function deleteReward(rewardId: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/rewards/${rewardId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete reward: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting reward:', error);
    throw new Error('Failed to delete reward. Please try again.');
  }
}

/**
 * Initiate a claim for a reward
 */
export async function initiateClaim(rewardId: number): Promise<{ nonce: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/claims/initiate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ rewardId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to initiate claim: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error initiating claim:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to initiate claim. Please try again.');
  }
}

/**
 * Verify a claim for a reward
 */
export async function verifyClaim(transaction: string, nonce: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/claims/verify`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ transaction, nonce }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to verify claim: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying claim:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to verify claim. Please try again.');
  }
}

/**
 * Fetch user's claims
 */
export async function fetchUserClaims(): Promise<UserClaim[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/claims/my-claims`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user claims: ${response.status}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching user claims:', error);
    throw new Error('Failed to fetch user claims. Please try again.');
  }
}
