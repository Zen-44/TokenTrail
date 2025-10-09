import { API_BASE_URL } from '@/config';
import { getStoredToken } from "./auth";

export interface IReward {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    stock: number;
    image: string;
    category: string;
    tag: string;
    festivalId: number;
}

export interface IUser {
    id: number;
    wallet: string;
}

export interface IClaim {
    id: number;
    nonce: string;
    transaction: string;
    status: "PROCESSED" | "PENDING" | "FAILED";
    claimCode: string;
    claimCodeUsed: boolean;
    createdAt: string;
    updatedAt: string;
    rewardId: number;
    userId: number;
    reward: IReward;
    user: IUser;
}

export const getMyClaims = async (): Promise<IClaim[]> => {
    const token = getStoredToken();
    if (!token) {
        throw new Error("No auth token found");
    }
    const response = await fetch(`${API_BASE_URL}/claims/my-claims`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch claims");
    }

    return response.json();
}

export const getClaimByCode = async (claimCode: string): Promise<IClaim> => {
    const token = getStoredToken();
    if (!token) {
        throw new Error("No auth token found");
    }
    const response = await fetch(`${API_BASE_URL}/claims/${claimCode}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch claim");
    }

    return response.json();
}

export const markClaimAsUsed = async (claimCode: string): Promise<IClaim> => {
    const token = getStoredToken();
    if (!token) {
        throw new Error("No auth token found");
    }
    const response = await fetch(`${API_BASE_URL}/claims/${claimCode}/mark-used`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to mark claim as used");
    }

    const data = await response.json();
    return data.claim;
}
