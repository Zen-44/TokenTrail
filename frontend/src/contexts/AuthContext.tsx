import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  isAuthenticated, 
  getWalletFromToken, 
  removeStoredToken, 
  setStoredToken,
  getStoredToken,
  isAdmin,
  decodeJWT
} from '@/lib/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  walletAddress: string | null;
  publicKey: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isAdminState, setIsAdminState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { publicKey, connected, connect, connecting, wallet, select, wallets } = useWallet();

  // Check authentication status on mount and when localStorage changes
  const checkAuth = React.useCallback(() => {
    setIsLoading(true);
    
    try {
      const authenticated = isAuthenticated();
      const wallet = getWalletFromToken();
      const admin = isAdmin();

      console.log('Auth Check:', {
        isAuthenticated: authenticated,
        walletFromToken: wallet,
        isAdmin: admin,
        decodedJwt: decodeJWT(getStoredToken() || '')
      });

      setIsAuthenticatedState(authenticated);
      setWalletAddress(wallet);
      setIsAdminState(admin);

      // If token is expired or invalid, clean up
      if (!authenticated && getStoredToken()) {
        removeStoredToken();
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticatedState(false);
      setWalletAddress(null);
      setIsAdminState(false);
      removeStoredToken();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check auth on component mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Re-check auth when wallet's public key becomes available or connection status changes
  useEffect(() => {
    if (publicKey || connected) {
      checkAuth();
    }
  }, [publicKey, connected, checkAuth]);

  // Listen for storage changes (e.g., logout from another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'jwt') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkAuth]);

  const login = React.useCallback(async (token: string) => {
    setStoredToken(token);
    checkAuth();
    
    // Also connect the Solana Wallet Adapter if not already connected
    if (!connected && !connecting) {
      try {
        // Find and select Phantom wallet
        const phantomWallet = wallets.find(w => w.adapter.name === 'Phantom');
        if (phantomWallet) {
          select(phantomWallet.adapter.name);
          
          // Wait for wallet selection
          let attempts = 0;
          const maxAttempts = 10;
          
          while (!wallet && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
          }
          
          if (wallet) {
            await connect();
            console.log('Wallet adapter connected after authentication');
          }
        }
      } catch (error) {
        console.warn('Failed to connect wallet adapter:', error);
        // Don't throw here as the authentication was still successful
      }
    }
  }, [checkAuth, connected, wallet, connecting, connect, select, wallets]);

  const logout = React.useCallback(async () => {
    removeStoredToken();
    setIsAuthenticatedState(false);
    setWalletAddress(null);
    setIsAdminState(false);
    setIsLoading(false);
    
    // Also disconnect the Solana Wallet Adapter
    if (connected && wallet) {
      try {
        await wallet.adapter.disconnect();
        console.log('Wallet adapter disconnected after logout');
      } catch (error) {
        console.warn('Failed to disconnect wallet adapter:', error);
      }
    }
  }, [connected, wallet]);

  const contextValue: AuthContextType = {
    isAuthenticated: isAuthenticatedState,
    walletAddress,
    publicKey: publicKey ? publicKey.toBase58() : null,
    isLoading,
    isAdmin: isAdminState,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};