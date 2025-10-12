import { getStoredToken } from './auth';
import { API_BASE_URL } from '@/config';
import { Festival as AdminFestival } from './admin-api';

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
 * Update a festival's details by an organizer
 */
export async function updateFestivalByOrganizer(festival: AdminFestival): Promise<AdminFestival> {
  try {
    const response = await fetch(`${API_BASE_URL}/festivals/${festival.id}/organizer`, {
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
 * Add an editor to a festival
 */
export async function getFestivalEditors(festivalId: number): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/festivals/${festivalId}/editors`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to get editors: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting festival editors:', error);
    throw new Error('Failed to get editors. Please try again.');
  }
}

export async function addFestivalEditor(festivalId: number, wallet: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/festivals/${festivalId}/editors`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ wallet }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to add editor: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding festival editor:', error);
    throw new Error('Failed to add editor. Please try again.');
  }
}

export async function removeFestivalEditor(festivalId: number, editorWallet: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/festivals/${festivalId}/editors/${editorWallet}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to remove editor: ${response.status} ${response.statusText} - ${errorBody}`);
    }
  } catch (error) {
    console.error('Error removing festival editor:', error);
    throw new Error('Failed to remove editor. Please try again.');
  }
}
