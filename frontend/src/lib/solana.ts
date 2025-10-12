import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Metaplex, guestIdentity } from '@metaplex-foundation/js';

const connection = new Connection('https://api.devnet.solana.com');
const metaplex = Metaplex.make(connection).use(guestIdentity());

export const getTokenBalance = async (walletAddress: string, tokenMintAddress: string): Promise<number> => {
  try {
    if (!walletAddress || !tokenMintAddress) {
      return 0;
    }
    const wallet = new PublicKey(walletAddress);
    const tokenMint = new PublicKey(tokenMintAddress);

    const associatedTokenAccount = await getAssociatedTokenAddress(tokenMint, wallet);

    const balance = await connection.getTokenAccountBalance(associatedTokenAccount);

    return balance.value.uiAmount || 0;
  } catch (error) {
    // It's common for a token account to not exist, which means the balance is 0.
    // We'll check for the specific error message and return 0 without logging an error.
    if (error instanceof Error && error.message.includes('could not find account')) {
      return 0;
    }
    // For other unexpected errors, we'll still log them.
    console.error('Error fetching token balance:', error);
    return 0;
  }
};

export const getTokenMetadata = async (tokenMintAddress: string): Promise<{ name: string; symbol: string; image: string | undefined } | null> => {
    try {
        if (!tokenMintAddress) {
          return null;
        }
        const mint = new PublicKey(tokenMintAddress);
        const nft = await metaplex.nfts().findByMint({ mintAddress: mint });

        if (nft && nft.json?.image) {
            return {
                name: nft.json.name || nft.name,
                symbol: nft.json.symbol || nft.symbol,
                image: nft.json.image
            };
        }
        
        // Fallback if metadata is not on-chain or doesn't have a JSON URI
        return {
            name: nft?.name || 'Unknown',
            symbol: nft?.symbol || 'TKN',
            image: undefined
        };

    } catch (error) {
        console.error('Error fetching token metadata:', error);
        return null;
    }
};

export const getTransactionHistory = async (walletAddress: string, tokenMintAddress: string): Promise<any[]> => {
  try {
    if (!walletAddress || !tokenMintAddress) {
      return [];
    }
    const wallet = new PublicKey(walletAddress);
    const tokenMint = new PublicKey(tokenMintAddress);

    const associatedTokenAccount = await getAssociatedTokenAddress(tokenMint, wallet);

    const signatures = await connection.getSignaturesForAddress(associatedTokenAccount);

    const transactions = await Promise.all(signatures.map(async (signatureInfo) => {
      const tx = await connection.getParsedTransaction(signatureInfo.signature, "confirmed");
      return tx;
    }));

    return transactions.filter(tx => tx !== null);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return [];
  }
};
