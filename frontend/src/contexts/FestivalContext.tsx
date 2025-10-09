import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_BASE_URL } from '@/config';

interface Festival {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  totalRewards: number;
  participants: number;
  status: "active" | "upcoming" | "ended";
  image: string;
  wallet: string;
  organizerName?: string;
  email?: string;
  phone?: string;
  expectedAttendees?: string;
  sponsorBudget?: string;
  website?: string;
  tokenName?: string;
  tokenSymbol?: string;
  tokenSupply: number;
  tokenAddress?: string;
  tokenMint?: string;
}

interface FestivalContextType {
  selectedFestival: Festival | null;
  setSelectedFestival: (festival: Festival | null) => void;
  festivals: Festival[];
  isLoading: boolean;
  refreshFestivalData: () => Promise<void>;
}

export const FestivalContext = createContext<FestivalContextType | undefined>(undefined);

// Mock festival data - in a real app this would come from an API
const mockFestivals: Festival[] = [
  {
    id: "beach-please-2024",
    name: "Beach Please Festival",
    description: "The ultimate beachside music and gaming festival featuring top DJs, gaming tournaments, and exclusive NFT drops.",
    location: "Miami Beach, FL",
    startDate: "2024-10-01",
    endDate: "2024-10-03",
    totalRewards: 50000,
    participants: 15420,
    status: "active",
    image: "/placeholder.svg",
    wallet: "0x1234567890123456789012345678901234567890",
    tokenSupply: 50000
  },
  {
    id: "cyber-rave-2024",
    name: "Cyber Rave Festival",
    description: "Step into the future with cyberpunk-themed music, virtual reality experiences, and blockchain gaming challenges.",
    location: "Austin, TX",
    startDate: "2024-11-15",
    endDate: "2024-11-17",
    totalRewards: 75000,
    participants: 8250,
    status: "upcoming",
    image: "/placeholder.svg",
    wallet: "0x0987654321098765432109876543210987654321",
    tokenSupply: 75000
  },
  {
    id: "mountain-vibes-2024",
    name: "Mountain Vibes Festival",
    description: "Connect with nature and fellow questers in this mountain retreat featuring acoustic sets and outdoor challenges.",
    location: "Aspen, CO",
    startDate: "2024-09-10",
    endDate: "2024-09-12",
    totalRewards: 35000,
    participants: 5680,
    status: "ended",
    image: "/placeholder.svg",
    wallet: "0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD",
    tokenSupply: 35000
  }
];

export const FestivalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedFestival, setSelectedFestivalState] = useState<Festival | null>(null);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch festivals from API
  // Expected API response: Array of Festival objects matching the Festival interface
  const fetchFestivals = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching festivals from API...');
      
      const response = await fetch(`${API_BASE_URL}/festivals`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse = await response.json();
      console.log('Festivals loaded from API:', apiResponse);
      
      // API returns {festivals: [...]} format
      const rawFestivals = apiResponse.festivals;
      if (!Array.isArray(rawFestivals)) {
        throw new Error('API response festivals property is not an array');
      }
      
      // Map API response to our Festival interface
      const mappedFestivals: Festival[] = rawFestivals.map((apiFestival: any) => ({
        id: apiFestival.id.toString(),
        name: apiFestival.festivalName,
        description: apiFestival.description || 'No description available',
        location: apiFestival.location,
        startDate: new Date(apiFestival.startDate).toISOString().split('T')[0],
        endDate: new Date(apiFestival.endDate).toISOString().split('T')[0],
        totalRewards: apiFestival.totalRewards || 0,
        participants: apiFestival.participants || 0,
        status: apiFestival.status || "upcoming",
        image: apiFestival.image || "/placeholder.svg",
        wallet: apiFestival.wallet || "",
        organizerName: apiFestival.organizerName,
        email: apiFestival.email,
        phone: apiFestival.phone,
        expectedAttendees: apiFestival.expectedAttendees,
        sponsorBudget: apiFestival.sponsorBudget,
        website: apiFestival.website,
        tokenName: apiFestival.tokenName,
        tokenSymbol: apiFestival.tokenSymbol,
        tokenSupply: apiFestival.tokenSupply,
        tokenAddress: apiFestival.tokenAddress,
      }));
      
      setFestivals(mappedFestivals);
      
      // Also update selected festival if it's in the new list
      if (selectedFestival) {
        const updatedSelected = mappedFestivals.find(f => f.id === selectedFestival.id) || null;
        setSelectedFestivalState(updatedSelected);
      }

    } catch (error) {
      console.error("Failed to fetch festivals from API, using mock data. Error:", error);
      setFestivals(mockFestivals);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh data function
  const refreshFestivalData = async () => {
    await fetchFestivals();
  };
  
  // Initial fetch and load from localStorage
  useEffect(() => {
    fetchFestivals().then(() => {
      const storedFestivalId = localStorage.getItem('selectedFestivalId');
      if (storedFestivalId) {
        // We need to wait for festivals to be loaded before finding the one to set
        // The logic inside fetchFestivals handles setting the initial state,
        // but we need to find it from the newly fetched list.
        // Let's adjust the logic slightly.
      }
    });
  }, []);

  useEffect(() => {
    if (festivals.length > 0) {
      const storedFestivalId = localStorage.getItem('selectedFestivalId');
      if (storedFestivalId) {
        const festival = festivals.find(f => f.id === storedFestivalId) || null;
        setSelectedFestivalState(festival);
      }
    }
  }, [festivals]);


  const setSelectedFestival = (festival: Festival | null) => {
    setSelectedFestivalState(festival);
    if (festival) {
      localStorage.setItem('selectedFestivalId', festival.id);
    } else {
      localStorage.removeItem('selectedFestivalId');
    }
  };

  return (
    <FestivalContext.Provider value={{ selectedFestival, setSelectedFestival, festivals, isLoading, refreshFestivalData }}>
      {children}
    </FestivalContext.Provider>
  );
};

export const useFestival = () => {
  const context = useContext(FestivalContext);
  if (context === undefined) {
    throw new Error('useFestival must be used within a FestivalProvider');
  }
  return context;
};