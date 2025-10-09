/**
 * Admin API functions for festival management
 */

import { getStoredToken } from './auth';
import { API_BASE_URL } from '@/config';

export interface Festival {
  id: number;
  festivalName: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  approved?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface FestivalsResponse {
  festivals: Festival[];
}

export interface ApprovalResponse {
  festival: Festival;
  message: string;
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
 * Fetch all festivals for admin review
 */
export async function fetchFestivals(): Promise<Festival[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/festivals/admin/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch festivals: ${response.status} ${response.statusText}`);
    }

    const data: FestivalsResponse = await response.json();
    return data.festivals;
  } catch (error) {
    console.error('Error fetching festivals:', error);
    throw new Error('Failed to fetch festivals. Please try again.');
  }
}

/**
 * Update festival approval status
 */
export async function updateFestivalApproval(
  festivalId: number, 
  approved: boolean
): Promise<ApprovalResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/festivals/${festivalId}/approval`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ approved }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update approval: ${response.status} ${response.statusText}`);
    }

    const data: ApprovalResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating festival approval:', error);
    throw new Error('Failed to update festival approval. Please try again.');
  }
}

/**
 * Approve a festival
 */
export async function approveFestival(festivalId: number): Promise<ApprovalResponse> {
  return updateFestivalApproval(festivalId, true);
}

/**
 * Disapprove/remove approval from a festival
 */
export async function disapproveFestival(festivalId: number): Promise<ApprovalResponse> {
  return updateFestivalApproval(festivalId, false);
}

/**
 * Update a festival's details
 */
export async function updateFestival(festival: Festival): Promise<Festival> {
  try {
    const response = await fetch(`${API_BASE_URL}/festivals/${festival.id}/admin`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(festival),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to update festival: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();
    return data.festival;
  } catch (error) {
    console.error('Error updating festival:', error);
    throw new Error('Failed to update festival. Please try again.');
  }
}

/**
 * Generate Solana token for a festival
 */
export async function generateFestivalToken(festivalId: number): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/festivals/${festivalId}/generate-token`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate token: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token. Please try again.');
  }
}