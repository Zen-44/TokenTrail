import { API_BASE_URL } from '@/config';
import { getStoredToken } from '@/lib/auth';

export const getUserProgress = async (festivalId: number, userWallet: string) => {
  const token = getStoredToken();
  if (!token) {
    throw new Error('Authentication token not found.');
  }

  const response = await fetch(`${API_BASE_URL}/festivals/${festivalId}/progress/${userWallet}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user progress');
  }

  return await response.json();
};

export const updateStepProgress = async (questId: number, stepId: number, wallet: string, completed: boolean) => {
  const token = getStoredToken();
  if (!token) {
    throw new Error('Authentication token not found.');
  }

  const response = await fetch(`${API_BASE_URL}/quests/${questId}/steps/${stepId}/progress`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wallet, completed }),
  });

  if (!response.ok) {
    throw new Error('Failed to update step progress');
  }

  return await response.json();
};
