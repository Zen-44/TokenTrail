import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, MapPin, Trophy, Clock, Coins, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useFestival, type Festival } from "@/contexts/FestivalContext";

const FestivalSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { festivals, setSelectedFestival, isLoading: contextLoading } = useFestival();
  const [selectedFestivalId, setSelectedFestivalId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFestivalSelect = async (festival: Festival) => {
    try {
      setIsLoading(true);
      setSelectedFestivalId(festival.id);

      // Set the selected festival in context
      setSelectedFestival(festival);
      
      // Simulate API call to load festival data
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Festival Selected!",
        description: `Welcome to ${festival.name}. Loading your dashboard...`,
      });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Selection Failed",
        description: "Failed to select festival. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setSelectedFestivalId(null);
    }
  };

  const getStatusColor = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    } else if (now > end) {
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    } else {
      return "bg-green-500/20 text-green-400 border-green-500/30";
    }
  };

  const getStatusText = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return "Coming Soon";
    } else if (now > end) {
      return "Past Event";
    } else {
      return "Live Now";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg px-6 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold glow-text mb-4">
            Select Your Festival
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Choose a festival to start your questing journey
          </p>
          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Main Page
            </Link>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        {contextLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading festivals...</p>
          </div>
        ) : (
          <>
            {/* Festival Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {festivals.map((festival) => (
                <Card key={festival.id} className="gamefi-card hover:scale-105 transition-transform duration-300">
                  <CardHeader className="relative">
                    <div className="absolute top-4 right-4">
                      <Badge className={getStatusColor(festival.startDate, festival.endDate)}>
                        {getStatusText(festival.startDate, festival.endDate)}
                      </Badge>
                    </div>
                    

                    
                    <CardTitle className="glow-text text-xl">
                      {festival.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {festival.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Festival Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{festival.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-primary" />
                        <span>{formatDate(festival.startDate)} - {formatDate(festival.endDate)}</span>
                      </div>
                      

                    </div>

                    {/* Rewards */}
                    <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-accent" />
                        <span className="text-sm">Token Supply</span>
                      </div>
                      <span className="font-bold text-accent">{festival.tokenSupply.toLocaleString()}</span>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => handleFestivalSelect(festival)}
                      disabled={isLoading}
                      className="gamefi-button w-full"
                    >
                      {isLoading && selectedFestivalId === festival.id ? (
                        "Loading..."
                      ) : (
                        "Enter Festival"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                New festivals are added regularly. Check back for more opportunities to earn tokens and rewards!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FestivalSelection;