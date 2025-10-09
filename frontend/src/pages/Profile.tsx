import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Trophy, 
  Star, 
  Medal,
  Crown,
  Shield,
  Zap,
  Target,
  Calendar,
  TrendingUp,
  Award
} from "lucide-react";

const Profile = () => {
  const nftBadges = [
    {
      id: "1",
      name: "Beach Explorer",
      description: "Completed all 5 beach-themed quests",
      rarity: "Rare",
      dateEarned: "2024-01-15",
      icon: Shield,
      gradient: "from-blue-400 to-cyan-400",
      questsRequired: 5
    },
    {
      id: "2",
      name: "Speed Demon",
      description: "Completed 3 quests in under 30 minutes",
      rarity: "Legendary",
      dateEarned: "2024-01-14",
      icon: Zap,
      gradient: "from-yellow-400 to-orange-500",
      questsRequired: 3
    },
    {
      id: "3", 
      name: "Social Butterfly",
      description: "Shared 10 quest completions on social media",
      rarity: "Epic",
      dateEarned: "2024-01-13",
      icon: Crown,
      gradient: "from-purple-400 to-pink-500",
      questsRequired: 10
    }
  ];

  const achievements = [
    { title: "First Quest", description: "Completed your first festival quest", progress: 100 },
    { title: "Token Hunter", description: "Earned 1000+ SPL tokens", progress: 100 },
    { title: "Social Sharer", description: "Share 25 quest completions", progress: 68 },
    { title: "VIP Status", description: "Reach top 50 on leaderboard", progress: 85 },
    { title: "Collection Master", description: "Earn 5 NFT badges", progress: 60 },
    { title: "Festival Regular", description: "Participate in 3+ festivals", progress: 33 }
  ];

  const stats = [
    { label: "Total Quests", value: "12", icon: Target },
    { label: "SPL Tokens Earned", value: "2,340", icon: Star },
    { label: "NFT Badges", value: "3", icon: Medal },
    { label: "Festival Rank", value: "#47", icon: TrendingUp },
    { label: "Days Active", value: "8", icon: Calendar },
    { label: "Achievements", value: "6/12", icon: Award }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Rare": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "Epic": return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      case "Legendary": return "bg-gradient-gold text-accent-foreground border-accent/50";
      default: return "bg-muted/20 text-muted-foreground border-muted/50";
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Profile Header */}
      <div className="text-center py-4 sm:py-6">
        <Avatar className="w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-4 border-2 border-primary">
          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl sm:text-2xl font-bold">
            QU
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl sm:text-4xl font-bold glow-text mb-2">
          QuestUser47
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Beach Please Festival Participant
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
          <Badge className="bg-primary/20 text-primary border-primary/50 text-xs sm:text-sm">
            Level 3 Quester
          </Badge>
          <Badge className="bg-accent/20 text-accent border-accent/50 text-xs sm:text-sm">
            Top 50 Player
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="gamefi-card">
              <CardContent className="p-4 text-center">
                <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* NFT Badges Collection */}
      <Card className="gamefi-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="w-6 h-6 text-accent" />
            Rare NFT Badge Collection
          </CardTitle>
          <CardDescription>
            Unique blockchain-verified achievements from completing special quests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {nftBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <Card key={badge.id} className="gamefi-card relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${badge.gradient} opacity-10`} />
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${badge.gradient} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="outline" className={getRarityColor(badge.rarity)}>
                        {badge.rarity}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                    <CardDescription>{badge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative pt-0">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Earned:</span>
                        <span>{new Date(badge.dateEarned).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quests:</span>
                        <span>{badge.questsRequired} completed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-muted/10 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-2">Collection Progress</h4>
            <p className="text-sm text-muted-foreground mb-3">
              You've earned 3 out of 15 available NFT badges for Beach Please Festival
            </p>
            <Progress value={20} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements Progress */}
      <Card className="gamefi-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Award className="w-6 h-6 text-secondary" />
            Achievement Progress
          </CardTitle>
          <CardDescription>
            Track your progress towards unlocking new rewards and badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {achievement.progress}%
                    </div>
                    {achievement.progress === 100 && (
                      <Badge className="bg-accent/20 text-accent border-accent/50 text-xs">
                        Complete
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress value={achievement.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Festival History */}
      <Card className="gamefi-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calendar className="w-6 h-6 text-primary-glow" />
            Festival History
          </CardTitle>
          <CardDescription>
            Your participation across different festivals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
              <div>
                <h4 className="font-semibold">Beach Please 2024</h4>
                <p className="text-sm text-muted-foreground">Current Festival • 8/10 days</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-accent">1,250 SPL</div>
                <div className="text-sm text-muted-foreground">12 quests completed</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted/5 rounded-lg opacity-50">
              <div>
                <h4 className="font-semibold">Untold Festival 2023</h4>
                <p className="text-sm text-muted-foreground">Coming Soon</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Register to participate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;