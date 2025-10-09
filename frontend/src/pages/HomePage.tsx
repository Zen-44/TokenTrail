import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, MapPin, Coins } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 sm:px-6 pt-12 sm:pt-16 pb-24 sm:pb-32 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="mb-4 sm:mb-6 text-4xl sm:text-6xl font-bold glow-text">
            TokenTrail
          </h1>
          <p className="mb-6 sm:mb-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Explore festival grounds, complete sponsored quests, and earn SPL tokens 
            to unlock exclusive rewards at your favorite international festivals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/festival-onboarding" className="w-full sm:w-auto">
              <Button className="gamefi-button text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                For Festivals
              </Button>
            </Link>
            <Link to="/auth" className="w-full sm:w-auto">
              <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-primary/50 bg-card/20 backdrop-blur-sm hover:bg-primary/10 w-full sm:w-auto">
                Join as Participant
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 sm:mb-12 text-center text-3xl sm:text-4xl font-bold glow-text">
            GameFi Festival Experience
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="gamefi-card">
              <CardHeader className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-xl">Quest Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Discover sponsor locations throughout the festival grounds and complete unique challenges.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="gamefi-card">
              <CardHeader className="text-center">
                <Coins className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <CardTitle className="text-xl">SPL Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Earn Solana-based tokens for completing quests and use them in the reward store.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="gamefi-card">
              <CardHeader className="text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-accent" />
                <CardTitle className="text-xl">Rare NFTs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Collect exclusive NFT badges for completing unique and challenging festival quests.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="gamefi-card">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary-glow" />
                <CardTitle className="text-xl">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Connect with fellow festival-goers and compete on leaderboards across events.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Supported Festivals */}
      <div className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold glow-text">
            Partnered Festivals
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="gamefi-card p-6">
              <h4 className="text-xl font-semibold mb-2">Beach Please</h4>
              <p className="text-muted-foreground">Explore the coastline with beach-themed quests</p>
            </div>
            <div className="gamefi-card p-6">
              <h4 className="text-xl font-semibold mb-2">Untold</h4>
              <p className="text-muted-foreground">Navigate the magical forest experience</p>
            </div>
            <div className="gamefi-card p-6">
              <h4 className="text-xl font-semibold mb-2">More Coming</h4>
              <p className="text-muted-foreground">International festivals joining soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;