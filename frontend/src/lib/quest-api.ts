/**
 * Quest API functions for festival management
 */

import { getStoredToken } from './auth';
import { API_BASE_URL } from '@/config';

export interface QuestStep {
  id?: number;
  title: string;
  order: number;
  questId?: number;
}

export interface Quest {
  id?: number;
  title: string;
  description: string;
  reward: number;
  difficulty: string;
  duration: string;
  startDate: string;
  endDate: string;
  festivalId: number;
  steps?: QuestStep[];
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
 * Fetch all quests for a festival
 */
export async function fetchQuests(festivalId: number): Promise<Quest[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/festivals/${festivalId}/quests`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch quests: ${response.status}`);
    }

    const data = await response.json();
    return data.quests || [];
  } catch (error) {
    console.error('Error fetching quests:', error);
    throw new Error('Failed to fetch quests. Please try again.');
  }
}

/**
 * Create a new quest
 */
export async function createQuest(quest: Quest): Promise<Quest> {
  try {
    const response = await fetch(`${API_BASE_URL}/quests`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(quest),
    });

    if (!response.ok) {
      throw new Error(`Failed to create quest: ${response.status}`);
    }

    const data = await response.json();
    return data.quest;
  } catch (error) {
    console.error('Error creating quest:', error);
    throw new Error('Failed to create quest. Please try again.');
  }
}

/**
 * Update a quest
 */
export async function updateQuest(quest: Quest): Promise<Quest> {
  try {
    const response = await fetch(`${API_BASE_URL}/quests/${quest.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(quest),
    });

    if (!response.ok) {
      throw new Error(`Failed to update quest: ${response.status}`);
    }

    const data = await response.json();
    return data.quest;
  } catch (error) {
    console.error('Error updating quest:', error);
    throw new Error('Failed to update quest. Please try again.');
  }
}

/**
 * Delete a quest
 */
export async function deleteQuest(questId: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/quests/${questId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete quest: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting quest:', error);
    throw new Error('Failed to delete quest. Please try again.');
  }
}
