import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet as WalletIcon, 
  Coins, 
  Copy,
  ExternalLink,
  RefreshCw,
  History,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useFestival } from "@/contexts/FestivalContext";
import { getTokenBalance, getTransactionHistory } from "@/lib/solana";
import { useEffect, useState } from "react";
import QRCode from "@/components/ui/QRCode";

const Wallet = () => {
  const { toast } = useToast();
  const { walletAddress } = useAuth();
  const { selectedFestival } = useFestival();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchBalance = async () => {
    if (walletAddress && selectedFestival?.tokenAddress) {
      const newBalance = await getTokenBalance(walletAddress, selectedFestival.tokenAddress);
      setBalance(newBalance);
      toast({
        title: "Balance Updated",
        description: "Wallet balance refreshed from blockchain",
      });
    }
  };

  const fetchTransactions = async () => {
    if (walletAddress && selectedFestival?.tokenAddress) {
      const history = await getTransactionHistory(walletAddress, selectedFestival.tokenAddress);
      setTransactions(history);
    }
  };

  useEffect(() => {
    if (walletAddress && selectedFestival?.tokenAddress) {
      getTokenBalance(walletAddress, selectedFestival.tokenAddress).then(setBalance);
      fetchTransactions();
    }
  }, [walletAddress, selectedFestival]);
  
  const truncateAddress = (address: string | null, startChars = 8, endChars = 8) => {
    if (!address) return "";
    if (address.length <= startChars + endChars) return address;
    const start = address.substring(0, startChars);
    const end = address.substring(address.length - endChars);
    return `${start}...${end}`;
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="text-center py-4 sm:py-6">
        <h1 className="text-2xl sm:text-4xl font-bold glow-text mb-2">
          My Wallet
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Manage your {selectedFestival?.tokenSymbol || 'SPL'} tokens and transaction history
        </p>
      </div>

      {/* Wallet Overview */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="gamefi-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <WalletIcon className="w-5 h-5 text-primary" />
              Phantom Wallet
            </CardTitle>
            <CardDescription>
              Connected to Solana devnet
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              {walletAddress && (
                <QRCode
                  data={walletAddress}
                  width={140}
                  height={140}
                  dotsOptions={{
                    type: 'dots',
                    color: '#a855f7',
                    gradient: {
                      type: 'linear',
                      rotation: 90,
                      colorStops: [
                        { offset: 0, color: '#a855f7' },
                        { offset: 1, color: '#6366f1' },
                      ],
                    },
                  }}
                  backgroundOptions={{ color: 'transparent' }}
                  cornersSquareOptions={{ type: 'extra-rounded', color: '#a855f7' }}
                />
              )}
            </div>
            <div className="flex-1 w-full">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Wallet Address</label>
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg border border-primary/20">
                  <code className="text-xs sm:text-sm flex-1 truncate min-w-0">
                    <span className="sm:hidden">{truncateAddress(walletAddress, 9, 9)}</span>
                    <span className="hidden sm:inline lg:hidden">{truncateAddress(walletAddress, 9, 9)}</span>
                    <span className="hidden lg:inline">{walletAddress}</span>
                  </code>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyAddress}
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      asChild
                    >
                      <a 
                        href={`https://solscan.io/account/${walletAddress}?cluster=devnet`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  Connected
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={fetchBalance}
                  className="border-primary/50 hover:bg-primary/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gamefi-card flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-accent" />
              Token Balance
            </CardTitle>
            <CardDescription className="break-words">
              {selectedFestival?.tokenName || 'TokenTrail SPL'} Token holdings
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center flex-grow p-4 sm:p-6">
            <div className="text-center space-y-1">
              <div className="text-4xl sm:text-5xl font-bold text-accent">{balance.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{selectedFestival?.tokenSymbol || 'SPL'} Tokens</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="gamefi-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-secondary" />
            Transaction History
          </CardTitle>
          <CardDescription>
            Recent {selectedFestival?.tokenSymbol || 'SPL'} token transactions on Solana blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx, index) => {
              const signature = tx.transaction.signatures[0];
              const blockTime = tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : 'Date not available';
              const status = tx.meta.err === null ? 'Confirmed' : 'Failed';
              const preBalance = tx.meta.preTokenBalances?.find((b: any) => b.owner === walletAddress)?.uiTokenAmount.uiAmount || 0;
              const postBalance = tx.meta.postTokenBalances?.find((b: any) => b.owner === walletAddress)?.uiTokenAmount.uiAmount || 0;
              const amount = postBalance - preBalance;
              const type = amount > 0 ? "earned" : "spent";

              return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-muted/10 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors gap-3 sm:gap-0 min-w-0 overflow-hidden"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                    type === "earned" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {type === "earned" ? (
                      <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                  
                      <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm sm:text-base truncate">{type === 'earned' ? 'Tokens Received' : 'Tokens Sent'}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                      <div>{blockTime}</div>
                      <div className="max-w-[200px] sm:max-w-[300px] lg:max-w-[400px]">
                        <a 
                          href={`https://solscan.io/tx/${signature}?cluster=devnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-glow underline block overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          <span className="sm:hidden">{truncateAddress(signature, 8, 8)}</span>
                          <span className="hidden sm:inline">{signature}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right sm:ml-4">
                  <div className={`text-base sm:text-lg font-bold ${
                    type === "earned" ? "text-green-400" : "text-red-400"
                  }`}>
                    {type === "earned" ? "+" : ""}{amount.toFixed(2)}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{selectedFestival?.tokenSymbol || 'SPL'}</div>
                </div>
              </div>
            )})}
          </div>
          
          <div className="text-center pt-4">
            <Button 
              variant="outline" 
              className="border-primary/50 hover:bg-primary/10"
              asChild
            >
              <a 
                href={`https://solscan.io/account/${walletAddress}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View All on Solscan
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Actions */}
      <Card className="gamefi-card">
        <CardHeader>
          <CardTitle>Wallet Actions</CardTitle>
          <CardDescription>
            Manage your tokens and connect external services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2 border-primary/50 hover:bg-primary/10"
              disabled
            >
              <ArrowUpRight className="w-5 h-5" />
              <span>Send Tokens</span>
              <span className="text-xs text-muted-foreground">Coming Soon</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2 border-secondary/50 hover:bg-secondary/10"
              disabled
            >
              <ArrowDownLeft className="w-5 h-5" />
              <span>Receive Tokens</span>
              <span className="text-xs text-muted-foreground">Coming Soon</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2 border-accent/50 hover:bg-accent/10"
              disabled
            >
              <RefreshCw className="w-5 h-5" />
              <span>Swap Tokens</span>
              <span className="text-xs text-muted-foreground">Coming Soon</span>
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-muted/10 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-2">Important Notes</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {selectedFestival?.tokenSymbol || 'SPL'} tokens are earned through quest completion</li>
              <li>• Tokens can be spent in the Reward Store for festival items</li>
              <li>• All transactions are recorded on the Solana blockchain</li>
              <li>• Keep your wallet secure and never share your private keys</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;