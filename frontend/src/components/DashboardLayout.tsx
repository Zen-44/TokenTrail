import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useFestival } from "@/contexts/FestivalContext";
import { isAdmin } from "@/lib/auth";
import { useEditor } from "@/contexts/EditorContext";
import { 
  Map, 
  ShoppingBag, 
  Trophy, 
  Wallet, 
  LogOut, 
  Home,
  Coins,
  Menu,
  ChevronDown,
  Calendar,
  Shield,
  ScanLine
} from "lucide-react";
import { getTokenBalance, getTokenMetadata } from "@/lib/solana";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { logout, walletAddress, isAdmin } = useAuth();
  const { toast } = useToast();
  const { selectedFestival, festivals, setSelectedFestival } = useFestival();
  const { isEditor } = useEditor();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenLogo, setTokenLogo] = useState<string | undefined>(undefined);

  const isOrganizer = selectedFestival && walletAddress && selectedFestival.wallet.toLowerCase() === walletAddress.toLowerCase();
  const isUserEditor = walletAddress && isEditor(walletAddress);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (walletAddress && selectedFestival?.tokenAddress) {
        try {
          const balance = await getTokenBalance(walletAddress, selectedFestival.tokenAddress);
          setTokenBalance(balance);
        } catch (error) {
          console.error("Failed to fetch token balance:", error);
          setTokenBalance(0); // Reset on error
        }

        try {
          const metadata = await getTokenMetadata(selectedFestival.tokenAddress);
          if (metadata?.image) {
            setTokenLogo(metadata.image);
          } else {
            setTokenLogo(undefined); // Reset if no image
          }
        } catch (error) {
          console.error("Failed to fetch token metadata:", error);
          setTokenLogo(undefined); // Reset on error
        }
      } else {
        // Reset when no festival or wallet is selected
        setTokenBalance(0);
        setTokenLogo(undefined);
      }
    };

    fetchTokenInfo();
  }, [walletAddress, selectedFestival]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been disconnected from your wallet.",
    });
    navigate("/", { replace: true });
  };

  const handleFestivalChange = (festival: any) => {
    if (festival.id !== selectedFestival?.id) {
      setSelectedFestival(festival);
      toast({
        title: "Festival Changed!",
        description: `Switched to ${festival.name}`,
      });
      // Navigate to dashboard to refresh the view
      if (location.pathname !== "/dashboard") {
        navigate("/dashboard");
      }
    }
  };
  
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/dashboard/quests", label: "Quests", icon: Map },
    { path: "/dashboard/rewards", label: "Reward Store", icon: ShoppingBag },
    { path: "/dashboard/wallet", label: "My Wallet", icon: Wallet },
  ];

  const organizerNavItems = [
    { path: "/organizer-panel", label: "Organizer Panel", icon: Shield },
  ];

  const editorNavItems = [
    { path: "/user-quest-management", label: "User Quests", icon: Shield },
  ];

  const adminNavItems = [
    { path: "/admin/festivals", label: "Admin Panel", icon: Shield },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavItems = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <div className="space-y-4 flex-1 overflow-y-auto">
      {/* Current Festival */}
      {selectedFestival && (
        <div className="pb-2 border-b border-primary/20">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Current Festival</div>
          <div className="text-sm font-medium">{selectedFestival.name}</div>
          <div className="text-xs text-muted-foreground">{selectedFestival.location}</div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 w-full" 
            onClick={() => {
              navigate("/festival-selection");
              if (onLinkClick) onLinkClick();
            }}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Change Festival
          </Button>
        </div>
      )}
      
      {/* Navigation Items */}
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onLinkClick}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive(item.path)
                  ? "bg-primary/20 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Organizer Navigation */}
      {(isOrganizer || isUserEditor || isAdmin) && (
        <div className="mt-6 pt-4 border-t border-primary/20">
          <h3 className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Organizer Tools</h3>
          <div className="space-y-2">
            {(isOrganizer || isAdmin) && (
              <Link
                key="/organizer-panel"
                to="/organizer-panel"
                onClick={onLinkClick}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive("/organizer-panel")
                    ? "bg-primary/20 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                }`}
              >
                <Shield className="w-5 h-5" />
                Organizer Panel
              </Link>
            )}
            {(isOrganizer || isUserEditor || isAdmin) && (
              <Link
                key="/reward-scanner"
                to={isOrganizer || isAdmin ? "/organizer-reward-scanner" : "/reward-scanner"}
                onClick={onLinkClick}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive(isOrganizer || isAdmin ? "/organizer-reward-scanner" : "/reward-scanner")
                    ? "bg-primary/20 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                }`}
              >
                <ScanLine className="w-5 h-5" />
                Reward Scanner
              </Link>
            )}
            {(isUserEditor || isAdmin) && (
              <Link
                key="/user-quest-management"
                to="/user-quest-management"
                onClick={onLinkClick}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive("/user-quest-management")
                    ? "bg-primary/20 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                }`}
              >
                <Shield className="w-5 h-5" />
                User Quests
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Admin Navigation */}
      {isAdmin && (
        <div className="mt-6 pt-4 border-t border-primary/20">
          <h3 className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Admin Tools</h3>
          <div className="space-y-2">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onLinkClick}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    isActive(item.path)
                      ? "bg-primary/20 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

   return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Top Navigation */}
      <header className="border-b border-primary/20 bg-card/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 sm:gap-4">
            {isMobile && (
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-4 bg-card/95 backdrop-blur-sm border-primary/20">
                  <div className="text-2xl font-bold mb-6 glow-text">QuestVerse</div>
                  <NavItems onLinkClick={() => setIsSheetOpen(false)} />
                  <div className="mt-auto">
                    <div className="hidden sm:flex items-center gap-2 bg-muted/20 rounded-lg px-3 py-1.5">
                      {tokenLogo ? <img src={tokenLogo} alt="Token" className="w-4 h-4 rounded-full" /> : <Coins className="w-4 h-4 text-accent" />}
                      <span className="font-semibold text-sm">{tokenBalance.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">{selectedFestival?.tokenSymbol || 'SPL'}</span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
             <Link to="/dashboard" className="text-xl sm:text-2xl font-bold glow-text">
              TokenTrail
            </Link>
            <div className="hidden sm:flex items-center gap-2 bg-muted/20 rounded-lg px-3 py-1.5">
              {tokenLogo ? <img src={tokenLogo} alt="Token" className="w-4 h-4 rounded-full" /> : <Coins className="w-4 h-4 text-accent" />}
              <span className="font-semibold text-sm">{tokenBalance.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">{selectedFestival?.tokenSymbol || 'SPL'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex sm:hidden items-center gap-1 bg-muted/20 rounded-lg px-2 py-1.5">
              {tokenLogo ? <img src={tokenLogo} alt="Token" className="w-4 h-4 rounded-full" /> : <Coins className="w-4 h-4 text-accent" />}
              <span className="font-semibold text-sm">{tokenBalance.toLocaleString()}</span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {walletAddress ? walletAddress.substring(0, 2).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar Navigation */}
        {!isMobile && (
          <nav className="w-64 border-r border-primary/20 bg-card/10 backdrop-blur-sm">
            <div className="p-6">
              <NavItems />
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="w-full max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;