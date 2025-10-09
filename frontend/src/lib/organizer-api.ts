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
