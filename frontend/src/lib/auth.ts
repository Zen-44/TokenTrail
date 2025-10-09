import { API_BASE_URL } from '@/config';

/**
 * JWT Token utilities for authentication
 */

interface DecodedJWT {
  exp: number;
  iat: number;
  wallet?: string;
  [key: string]: any;
}

/**
 * Decode a JWT token without verification (client-side only)
 * Note: This is for reading token data, not for security validation
 */
export function decodeJWT(token: string): DecodedJWT | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    // Add padding if needed for base64 decoding
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    const decodedPayload = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'));
    
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Check if a JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  // Add 5 minute buffer to account for clock skew
  const bufferSeconds = 5 * 60;
  const currentTime = Math.floor(Date.now() / 1000);
  
  return decoded.exp < (currentTime + bufferSeconds);
}

/**
 * Get the stored JWT token from localStorage
 */
export function getStoredToken(): string | null {
  try {
    return localStorage.getItem('jwt');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
}

/**
 * Store JWT token in localStorage
 */
export function setStoredToken(token: string): void {
  try {
    localStorage.setItem('jwt', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
}

/**
 * Remove JWT token from localStorage
 */
export function removeStoredToken(): void {
  try {
    localStorage.removeItem('jwt');
  } catch (error) {
    console.error('Error removing token:', error);
  }
}

/**
 * Check if user has a valid authentication token
 */
export function isAuthenticated(): boolean {
  const token = getStoredToken();
  if (!token) {
    return false;
  }

  return !isTokenExpired(token);
}

/**
 * Get wallet address from stored JWT token
 */
export function getWalletFromToken(): string | null {
  const token = getStoredToken();
  if (!token) return null;

  const decoded = decodeJWT(token);
  return decoded?.walletAddress || null;
}

/**
 * Check if the user is an admin from stored JWT token
 */
export function isAdmin(): boolean {
  const token = getStoredToken();
  if (!token) return false;

  const decoded = decodeJWT(token);
  return decoded?.isAdmin === true;
}

/**
 * Request a nonce from the server for signing
 */
export async function requestNonce(walletAddress: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/request-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress }),
    });

    if (!response.ok) {
      throw new Error(`Failed to request nonce: ${response.status}`);
    }

    const data = await response.json();
    return data.nonce;
  } catch (error) {
    console.error('Error requesting nonce:', error);
    throw new Error('Failed to request nonce. Please try again.');
  }
}

/**
 * Login with a signed nonce to get a JWT
 */
export async function login(walletAddress: string, signature: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress, signature }),
    });

    if (!response.ok) {
      throw new Error(`Failed to login: ${response.status}`);
    }

    const data = await response.json();
    setStoredToken(data.token);
    return data.token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Failed to login. Please try again.');
  }
}