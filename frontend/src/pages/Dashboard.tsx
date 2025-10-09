import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Map, 
  Trophy, 
  Coins, 
  Target, 
  Star,
  TrendingUp,
  Clock,
  MapPin,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFestival } from "@/contexts/FestivalContext";
import { useAuth } from "@/contexts/AuthContext";
import { getTokenBalance } from "@/lib/solana";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config";

interface QuestStep {
  id: number;
  title: string;
  order: number;
  createdAt: string;
  questId: number;
  progress: any[];
}

interface Quest {
  id: number;
  title: string;
  description: string;
  reward: number;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  createdAt: string;
  festivalId: number;
  steps: QuestStep[];
  progress: any[];
  startDate?: string;
  endDate?: string;
}

interface QuestResponse {
  wallet: string;
  quests: Quest[];
}

type QuestStatus = "completed" | "active" | "available" | "expired" | "upcoming";

const getQuestStatus = (quest: Quest): QuestStatus => {
  const now = new Date();

  // Check if quest is outside its time period
  if (quest.endDate && new Date(quest.endDate) < now) {
    return "expired";
  }
  if (quest.startDate && new Date(quest.startDate) > now) {
    return "upcoming";
  }

  // Determine progress-based status
  const getStepStatus = (progress: any[]) => {
    if (!progress || progress.length === 0) return false;
    const sortedProgress = [...progress].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return sortedProgress[0].completed;
  };

  const completedStepsCount = quest.steps.filter(step => getStepStatus(step.progress)).length;

  if (quest.steps.length > 0 && completedStepsCount === quest.steps.length) {
    return "completed";
  }

  if (completedStepsCount > 0 || (quest.progress && quest.progress.length > 0)) {
    return "active";
  }

  return "available";
};

const Dashboard = () => {
  const { selectedFestival } = useFestival();
  const { walletAddress } = useAuth();
  const navigate = useNavigate();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [questsLoading, setQuestsLoading] = useState<boolean>(true);
  const [questsError, setQuestsError] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number>(0);

  // Function to fetch quests from the API
  const fetchQuests = async (festivalId: string) => {
    try {
      setQuestsLoading(true);
      setQuestsError(null);
      
      const response = await fetch(`${API_BASE_URL}/festivals/${festivalId}/quests`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch quests: ${response.status} ${response.statusText}`);
      }
      
      const questData: QuestResponse = await response.json();
      setQuests(questData.quests);
    } catch (err) {
      console.error('Error fetching quests:', err);
      setQuestsError(err instanceof Error ? err.message : 'Failed to load quests');
      // Fallback to empty array on error
      setQuests([]);
    } finally {
      setQuestsLoading(false);
    }
  };

  // Redirect to festival selection if no festival is selected
  useEffect(() => {
    if (!selectedFestival) {
      navigate("/festival-selection");
    }
  }, [selectedFestival, navigate]);

  // Fetch quests when festival changes
  useEffect(() => {
    if (selectedFestival?.id) {
      fetchQuests(selectedFestival.id);
    } else {
      setQuestsLoading(false);
      setQuests([]);
    }
  }, [selectedFestival?.id]);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (walletAddress && selectedFestival?.tokenAddress) {
        const balance = await getTokenBalance(walletAddress, selectedFestival.tokenAddress);
        setTokenBalance(balance);
      }
    };

    fetchTokenBalance();
  }, [walletAddress, selectedFestival]);

  // Calculate days remaining
  const getDaysRemaining = () => {
    if (!selectedFestival) return 0;
    const endDate = new Date(selectedFestival.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (!selectedFestival) {
    return (
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading festival data...</p>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining();

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-4 sm:py-6">
        <h1 className="text-3xl sm:text-4xl font-bold glow-text mb-2">
          Welcome back, Quester!
        </h1>
        <div className="space-y-2">
          <p className="text-muted-foreground text-base sm:text-lg">
            {selectedFestival.name} • {daysRemaining > 0 ? `${daysRemaining} days remaining` : selectedFestival.status === "ended" ? "Festival ended" : "Starting soon"}
          </p>
          <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-0">
            <span className="flex items-center justify-center">
              <MapPin className="w-3 h-3 inline mr-1" />
              {selectedFestival.location}
            </span>
            <span className="hidden sm:inline mx-2">•</span>
            <Link 
              to="/festival-selection" 
              className="text-primary hover:text-primary-glow underline underline-offset-2"
            >
              Change Festival
            </Link>
          </div>
        </div>
      </div>

       {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card className="gamefi-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Coins className="h-6 w-6 text-yellow-500 mr-2" />
              <div className="text-2xl font-bold">{tokenBalance}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="gamefi-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Target className="h-6 w-6 text-purple-500 mr-2" />
              <div className="text-2xl font-bold">
                {quests.filter(q => {
                  const status = getQuestStatus(q);
                  return status === "active" || status === "available";
                }).length}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quests Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Quests</h2>
        <Card className="gamefi-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Active Quests
            </CardTitle>
            <CardDescription>
              Complete these quests before they expire
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {questsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading quests...</span>
              </div>
            ) : questsError ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-2">
                <AlertCircle className="w-8 h-8 text-red-500" />
                <p className="text-sm text-muted-foreground text-center">{questsError}</p>
                <Button 
                  onClick={() => selectedFestival?.id && fetchQuests(selectedFestival.id)}
                  variant="outline"
                  size="sm"
                >
                  Try Again
                </Button>
              </div>
            ) : quests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-2">
                <Star className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center">No active quests available</p>
                <p className="text-xs text-muted-foreground text-center">Check back later for new challenges!</p>
              </div>
            ) : (
              // Show first 2 active/in-progress quests for dashboard preview
              quests
                .filter(quest => {
                  const status = getQuestStatus(quest);
                  return status === "active" || status === "available";
                })
                .slice(0, 2)
                .map((quest) => {
                  const getStepStatus = (progress: any[]) => {
                    if (!progress || progress.length === 0) {
                      return false;
                    }
                    const sortedProgress = [...progress].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                    return sortedProgress[0].completed;
                  };
                  const completedStepsCount = quest.steps.filter(step => getStepStatus(step.progress)).length;
                  const progress = quest.steps.length > 0 ? (completedStepsCount / quest.steps.length) * 100 : 0;
                  
                  return (
                    <div key={quest.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{quest.title}</h4>
                          <p className="text-sm text-muted-foreground">{quest.description}</p>
                        </div>
                        <Badge variant="outline" className="bg-accent/20 text-accent border-accent/50">
                          {quest.reward} SPL
                        </Badge>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {completedStepsCount}/{quest.steps.length} steps completed
                      </p>
                    </div>
                  );
                })
            )}

            <Link to="/dashboard/quests">
              <Button className="w-full mt-4 gamefi-button">
                View All Quests
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="gamefi-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Jump into your festival experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/dashboard/quests">
              <Button variant="outline" className="h-24 sm:h-20 flex flex-col gap-2 w-full border-primary/50 hover:bg-primary/10 text-base">
                <Map className="w-6 h-6" />
                <span>Explore Quests</span>
              </Button>
            </Link>
            
            <Link to="/dashboard/rewards">
              <Button variant="outline" className="h-24 sm:h-20 flex flex-col gap-2 w-full border-accent/50 hover:bg-accent/10 text-base">
                <MapPin className="w-6 h-6" />
                <span>Reward Store</span>
              </Button>
            </Link>
            
            <Link to="/dashboard/wallet">
              <Button variant="outline" className="h-24 sm:h-20 flex flex-col gap-2 w-full border-secondary/50 hover:bg-secondary/10 text-base">
                <Coins className="w-6 h-6" />
                <span>My Wallet</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;