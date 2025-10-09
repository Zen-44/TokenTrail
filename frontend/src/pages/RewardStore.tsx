import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RewardModal } from "@/components/RewardModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Coins, ShoppingBag, Gift, Loader2, QrCode, Copy } from "lucide-react";
import QRCode from "@/components/ui/QRCode";
import { useToast } from "@/hooks/use-toast";
import { useFestival } from "@/contexts/FestivalContext";
import {
  initiateClaim,
  verifyClaim,
  fetchRewards,
  fetchUserClaims,
  createReward,
  updateReward,
  deleteReward,
  type Reward,
  type UserClaim,
} from "@/lib/reward-api";
import { Skeleton } from "@/components/ui/skeleton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Transaction,
  TransactionInstruction,
  PublicKey,
} from "@solana/web3.js";
import {
  createBurnInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { useAuth } from "@/contexts/AuthContext";

const RewardStore = () => {
  const { toast } = useToast();
  const { selectedFestival } = useFestival();
  const [userTokens] = useState(1250); // This will likely come from a user context later
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userClaims, setUserClaims] = useState<UserClaim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { walletAddress, isAuthenticated, isAdmin } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | undefined>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [rewardToDelete, setRewardToDelete] = useState<Reward | null>(null);
  const [isManagingReward, setIsManagingReward] = useState(false);

  // Check if user is an organizer of the festival
  const isOrganizer = selectedFestival && walletAddress && 
    selectedFestival.wallet.toLowerCase() === walletAddress.toLowerCase();

  // Check if user can manage rewards
  const canManageRewards = isAdmin || isOrganizer;
  const { connection } = useConnection();
  const { sendTransaction, connected, publicKey, connect, select, wallet, wallets } = useWallet();
  const [isClaiming, setIsClaiming] = useState<number | null>(null);
  const [isWaitingConfirmation, setIsWaitingConfirmation] = useState<number | null>(null);

  useEffect(() => {
    const loadRewards = async () => {
      if (!selectedFestival) {
        setIsLoading(false);
        setRewards([]);
        setUserClaims([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Load rewards
        const fetchedRewards = await fetchRewards(
          parseInt(selectedFestival.id, 10)
        );
        setRewards(fetchedRewards);

        // Load user claims if authenticated
        if (isAuthenticated) {
          try {
            const fetchedClaims = await fetchUserClaims();
            setUserClaims(fetchedClaims);
          } catch (claimsError) {
            console.warn("Failed to load user claims:", claimsError);
            // Don't fail the entire load if claims fail
            setUserClaims([]);
          }
        } else {
          setUserClaims([]);
        }
      } catch (err) {
        setError("Failed to load rewards. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadRewards();
  }, [selectedFestival, isAuthenticated]);

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
      case "Limited":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "Rare":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      case "Premium":
        return "bg-gradient-gold text-accent-foreground border-accent/50";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/50";
    }
  };

  // Check if user has already claimed a specific reward with PROCESSED status
  const hasUserClaimedReward = (rewardId: number): boolean => {
    return userClaims.some(claim => 
      claim.rewardId === rewardId && claim.status === "PROCESSED"
    );
  };

  // Get user's claim for a specific reward
  const getUserClaimForReward = (rewardId: number): UserClaim | undefined => {
    return userClaims.find(claim => 
      claim.rewardId === rewardId && claim.status === "PROCESSED"
    );
  };

  // Copy claim code to clipboard
  const copyClaimCode = async (claimCode: string) => {
    try {
      await navigator.clipboard.writeText(claimCode);
      toast({
        title: "Copied!",
        description: "Claim code copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to copy claim code:", error);
      toast({
        title: "Copy failed",
        description: "Unable to copy claim code to clipboard",
        variant: "destructive",
      });
    }
  };

  // Poll for claim confirmation status
  const pollForClaimConfirmation = async (rewardId: number, maxAttempts: number = 30, interval: number = 2000): Promise<boolean> => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const refreshedClaims = await fetchUserClaims();
        const processingClaim = refreshedClaims.find(
          claim => claim.rewardId === rewardId && claim.status === "PROCESSED"
        );
        
        if (processingClaim) {
          setUserClaims(refreshedClaims);
          return true;
        }
        
        // Wait before next attempt
        if (attempt < maxAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, interval));
        }
      } catch (error) {
        console.warn(`Polling attempt ${attempt + 1} failed:`, error);
        // Continue polling even if one attempt fails
        if (attempt < maxAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, interval));
        }
      }
    }
    
    return false;
  };

  const handleCreateReward = () => {
    setSelectedReward(undefined);
    setIsModalOpen(true);
  };

  const handleEditReward = (reward: Reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };

  const handleDeleteReward = (reward: Reward) => {
    setRewardToDelete(reward);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteReward = async () => {
    if (!rewardToDelete) return;

    setIsManagingReward(true);
    try {
      await deleteReward(rewardToDelete.id!);
      setRewards(rewards.filter(r => r.id !== rewardToDelete.id));
      toast({
        title: "Reward Deleted",
        description: `${rewardToDelete.title} has been deleted successfully.`,
      });
    } catch (error) {
      console.error("Failed to delete reward:", error);
      toast({
        title: "Failed to Delete",
        description: "Could not delete the reward. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsManagingReward(false);
      setIsDeleteDialogOpen(false);
      setRewardToDelete(null);
    }
  };

  const handleSaveReward = async (rewardData: Partial<Reward>) => {
    setIsManagingReward(true);
    try {
      if (selectedReward) {
        // Update existing reward
        const updatedReward = await updateReward(selectedReward.id!, {
          title: rewardData.title,
          description: rewardData.description,
          price: rewardData.price,
          location: rewardData.location,
          stock: rewardData.stock,
          image: rewardData.image,
          category: rewardData.category,
          tag: rewardData.tag,
        });
        setRewards(rewards.map(r => r.id === updatedReward.id ? updatedReward : r));
        toast({
          title: "Reward Updated",
          description: `${updatedReward.title} has been updated successfully.`,
        });
      } else {
        // Create new reward
        const newReward = await createReward({
          title: rewardData.title!,
          description: rewardData.description!,
          price: rewardData.price!,
          location: rewardData.location!,
          festivalId: parseInt(selectedFestival!.id),
          image: rewardData.image,
          stock: rewardData.stock,
          category: rewardData.category,
          tag: rewardData.tag,
        });
        setRewards([...rewards, newReward]);
        toast({
          title: "Reward Created",
          description: `${newReward.title} has been created successfully.`,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save reward:", error);
      toast({
        title: "Failed to Save",
        description: "Could not save the reward. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsManagingReward(false);
    }
  };

  const handlePurchase = async (reward: Reward) => {
    console.log("Selected Festival on claim:", selectedFestival);
    console.log("Wallet state:", { walletAddress, connected, wallet: wallet?.adapter.name, walletsAvailable: wallets.map(w => w.adapter.name) });
    
    // Check if user is authenticated but wallet adapter is not connected
    if (walletAddress && !connected) {
      try {
        // Find and select Phantom wallet
        const phantomWallet = wallets.find(w => w.adapter.name === 'Phantom');
        if (!phantomWallet) {
          console.error("Available wallets:", wallets.map(w => w.adapter.name));
          throw new Error("Phantom wallet not found in adapter list");
        }
        
        console.log("Selecting Phantom wallet...");
        select(phantomWallet.adapter.name);
        
        // Wait for wallet selection and then connect
        let attempts = 0;
        const maxAttempts = 10;
        
        while (!wallet && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        
        if (!wallet) {
          throw new Error("Wallet selection timed out");
        }
        
        console.log("Attempting to connect wallet adapter...");
        await connect();
        console.log("Wallet adapter connected successfully");
      } catch (error) {
        console.error("Failed to connect wallet adapter:", error);
        toast({
          title: "Wallet connection failed",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (!walletAddress || !connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to claim rewards.",
        variant: "destructive",
      });
      return;
    }
    if (!selectedFestival?.tokenAddress) {
      toast({
        title: "Festival token not configured",
        description:
          "The selected festival does not have a token address or mint.",
        variant: "destructive",
      });
      return;
    }
    if (userTokens < reward.price) {
      toast({
        title: "Insufficient Tokens",
        description: `You need ${
          reward.price - userTokens
        } more SPL tokens to claim this reward.`,
        variant: "destructive",
      });
      return;
    }

    setIsClaiming(reward.id);

    try {
      // 1. Initiate claim
      const { nonce } = await initiateClaim(reward.id!);

      console.log("Wallet Address on claim:", walletAddress);
      const userPublicKey = publicKey;

      // 2. Burn tokens
      const mintPublicKey = new PublicKey(selectedFestival.tokenAddress);
      const userTokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        userPublicKey
      );

      const burnInstruction = createBurnInstruction(
        userTokenAccount,
        mintPublicKey,
        userPublicKey,
        reward.price * 10 ** 9 // Adjust for decimals
      );

      const transaction = new Transaction().add(burnInstruction);
      transaction.add(
        new TransactionInstruction({
          keys: [],
          programId: new PublicKey(
            "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
          ),
          data: Buffer.from(nonce, "utf-8"),
        })
      );

      const signature = await sendTransaction(transaction, connection);
      console.log("Transaction signature", signature);

      // 3. Verify claim (this initiates backend processing)
      await verifyClaim(signature, nonce);

      setIsClaiming(null); // Stop the claiming state
      setIsWaitingConfirmation(reward.id); // Start waiting for confirmation

      toast({
        title: "Transaction Submitted!",
        description: `Your claim for "${reward.title}" is being processed. Please wait for confirmation.`,
      });

      // 4. Poll for claim confirmation
      const confirmed = await pollForClaimConfirmation(reward.id!);
      
      setIsWaitingConfirmation(null); // Stop waiting state
      
      if (confirmed) {
        toast({
          title: "Claim Confirmed! ✅",
          description: `You've successfully claimed "${reward.title}". Check the location for pickup details.`,
        });
      } else {
        toast({
          title: "Claim Processing",
          description: `Your claim for "${reward.title}" is still being processed. It will appear in your rewards shortly.`,
          variant: "default",
        });
        
        // Still try to refresh claims one more time
        try {
          const refreshedClaims = await fetchUserClaims();
          setUserClaims(refreshedClaims);
        } catch (claimsError) {
          console.warn("Failed to refresh user claims:", claimsError);
        }
      }
      // Optionally, refresh user tokens or reward stock
    } catch (error) {
      console.error("Claim failed", error);
      toast({
        title: "Claim Failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsClaiming(null);
      setIsWaitingConfirmation(null);
    }
  };

  // Categories can be dynamic based on fetched rewards
  const categories = [
    "All",
    ...Array.from(
      new Set(rewards.map((r) => r.category).filter(Boolean) as string[])
    ),
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRewards =
    selectedCategory === "All"
      ? rewards
      : rewards.filter((reward) => reward.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="text-center py-4 sm:py-6">
          <Skeleton className="h-10 w-48 mx-auto mb-2" />
          <Skeleton className="h-6 w-72 mx-auto mb-4" />
          <Skeleton className="h-10 w-40 mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="gamefi-card">
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <p className="text-lg text-destructive">{error}</p>
      </div>
    );
  }

  if (!selectedFestival) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <p className="text-lg text-muted-foreground">
          Please select a festival to view rewards.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="text-center py-4 sm:py-6">
        <h1 className="text-2xl sm:text-4xl font-bold glow-text mb-2">
          Reward Store
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-4 px-2">
          Claim amazing rewards with your earned SPL tokens
        </p>
        <div className="inline-flex items-center gap-2 bg-muted/20 rounded-lg px-3 sm:px-4 py-2">
          <Coins className="w-4 sm:w-5 h-4 sm:h-5 text-accent" />
          <span className="font-bold text-base sm:text-lg">{userTokens}</span>
          <span className="text-muted-foreground text-sm sm:text-base">
            SPL Available
          </span>
        </div>
      </div>

      {/* Store Map */}
      <Card className="gamefi-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Store Locations Map
          </CardTitle>
          <CardDescription>
            Find where to claim your rewards across the festival
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-muted/20 to-muted/10 rounded-lg h-48 sm:h-64 flex items-center justify-center border border-primary/20">
            <div className="text-center space-y-2">
              <ShoppingBag className="w-12 h-12 mx-auto text-primary/50" />
              <p className="text-muted-foreground">Interactive store map</p>
              <p className="text-sm text-muted-foreground">
                Navigate to reward pickup locations
              </p>
            </div>

            {/* Mock store pins */}
            <div className="absolute top-6 left-12 w-4 h-4 bg-accent rounded-full animate-pulse" />
            <div className="absolute bottom-12 right-16 w-4 h-4 bg-secondary rounded-full animate-pulse" />
            <div className="absolute top-16 right-12 w-4 h-4 bg-primary rounded-full animate-pulse" />
            <div className="absolute bottom-6 left-20 w-4 h-4 bg-primary-glow rounded-full animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Management Actions */}
      {canManageRewards && (
        <div className="flex justify-center mb-4">
          <Button
            onClick={handleCreateReward}
            className="gamefi-button"
            disabled={isManagingReward}
          >
            <Gift className="w-4 h-4 mr-2" />
            Create New Reward
          </Button>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap justify-center px-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? "gamefi-button"
                : "border-primary/50 hover:bg-primary/10"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredRewards.map((reward) => {
          const canAfford = userTokens >= reward.price;
          const isThisClaiming = isClaiming === reward.id;
          const isThisWaitingConfirmation = isWaitingConfirmation === reward.id;
          const alreadyClaimed = hasUserClaimedReward(reward.id!);

          return (
            <Card key={reward.id} className="gamefi-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {reward.image ? (
                        <img
                          src={reward.image}
                          alt={reward.title}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                          <Gift className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <Badge
                        variant="outline"
                        className={getRarityColor(reward.tag)}
                      >
                        {reward.tag || "Standard"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                    <CardDescription>{reward.description}</CardDescription>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-accent font-bold text-xl">
                      <Coins className="w-5 h-5" />
                      {reward.price}
                    </div>
                    {reward.stock !== null && reward.stock !== undefined && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Gift className="w-4 h-4" />
                        {reward.stock} left
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {reward.location}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-2">
                {/* Management buttons for organizers and admins */}
                {canManageRewards && (
                  <div className="flex gap-2 mb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEditReward(reward)}
                      disabled={isManagingReward}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteReward(reward)}
                      disabled={isManagingReward}
                    >
                      Delete
                    </Button>
                  </div>
                )}

                <Button
                  onClick={() => handlePurchase(reward)}
                  disabled={
                    alreadyClaimed ||
                    !canAfford ||
                    (reward.stock !== undefined && reward.stock <= 0) ||
                    isClaiming !== null ||
                    isWaitingConfirmation !== null
                  }
                  className={
                    canAfford && 
                    !alreadyClaimed && 
                    (reward.stock === undefined || reward.stock > 0) &&
                    !isThisWaitingConfirmation
                      ? "gamefi-button w-full"
                      : "w-full"
                  }
                  variant={
                    canAfford && 
                    !alreadyClaimed && 
                    (reward.stock === undefined || reward.stock > 0) &&
                    !isThisWaitingConfirmation
                      ? "default"
                      : "outline"
                  }
                >
                  {(isThisClaiming || isThisWaitingConfirmation) ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isThisClaiming
                    ? "Claiming..."
                    : isThisWaitingConfirmation
                    ? "Confirming..."
                    : alreadyClaimed
                    ? "Already Claimed"
                    : reward.stock !== undefined && reward.stock <= 0
                    ? "Out of Stock"
                    : !canAfford
                    ? `Need ${reward.price - userTokens} more tokens`
                    : "Claim Reward"}
                </Button>

                {canAfford &&
                  !alreadyClaimed &&
                  !isThisWaitingConfirmation &&
                  (reward.stock === undefined || reward.stock > 0) && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Available for immediate pickup
                    </p>
                  )}

                {isThisWaitingConfirmation && (
                  <p className="text-xs text-center text-blue-600 mt-2">
                    ⏳ Waiting for blockchain confirmation...
                  </p>
                )}

                {alreadyClaimed && (
                  <div className="space-y-2">
                    {(() => {
                      const userClaim = getUserClaimForReward(reward.id!);
                      if (userClaim) {
                        const isCodeUsed = userClaim.claimCodeUsed;
                        return (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full"
                                disabled={isCodeUsed}
                              >
                                <QrCode className="w-4 h-4 mr-2" />
                                {isCodeUsed ? "Code Already Used" : "View Claim Code"}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <QrCode className="w-5 h-5" />
                                  Claim Code
                                </DialogTitle>
                              </DialogHeader>
                              <div className="flex flex-col items-center space-y-4 pt-4">
                                <div className="bg-white p-4 rounded-lg">
                                  <QRCode
                                    data={userClaim.claimCode}
                                    width={200}
                                    height={200}
                                    dotsOptions={{ color: "#000000", type: "square" }}
                                    backgroundOptions={{ color: "#ffffff" }}
                                  />
                                </div>
                                <div className="text-center space-y-2">
                                  <p className="text-sm text-muted-foreground">
                                    {isCodeUsed ? "This code has been redeemed" : "Show this code at pickup location"}
                                  </p>
                                  <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                                    <code className="font-mono text-sm font-bold">
                                      {userClaim.claimCode}
                                    </code>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyClaimCode(userClaim.claimCode)}
                                      className="h-6 w-6 p-0"
                                      disabled={isCodeUsed}
                                    >
                                      <Copy className="w-3 h-3" />
                                    </Button>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    Location: {reward.location}
                                  </p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRewards.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No rewards found in this category</p>
        </div>
      )}

      {/* Reward Modal */}
      {isModalOpen && (
        <RewardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveReward}
          reward={selectedReward}
          festivalId={parseInt(selectedFestival.id)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the reward "{rewardToDelete?.title}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isManagingReward}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteReward}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isManagingReward}
            >
              {isManagingReward ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RewardStore;