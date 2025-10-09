import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { API_BASE_URL } from "@/config";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();
  const { connect, connected, wallet } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  // Get the return URL from location state or default to dashboard
  const from = (location.state as any)?.from || "/dashboard";
  const message = (location.state as any)?.message;

  // If user is already authenticated, redirect them
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Show message from redirect if any
  useEffect(() => {
    if (message) {
      toast({
        title: "Authentication Required",
        description: message,
        variant: "default",
      });
    }
  }, [message, toast]);

  const handlePhantomConnect = async () => {
    try {
      setIsConnecting(true);

      // Check Phantom provider
      const provider = (window as any).solana;
      if (!provider || !provider.isPhantom) {
        toast({
          title: "Phantom not found",
          description: "Please install Phantom Wallet extension.",
          variant: "destructive",
        });
        setIsConnecting(false);
        return;
      }

      // Connect wallet
      const resp = await provider.connect();
      const walletAddress: string = resp.publicKey.toString();

      // Get challenge from backend
      const challengeRes = await fetch(`${API_BASE_URL}/auth/challenge/${walletAddress}`);
      if (!challengeRes.ok) throw new Error("Failed to get challenge");
      const { nonce, message } = await challengeRes.json();

      // Sign message with Phantom
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await provider.signMessage(encodedMessage, "utf8");

      // Verify signature with backend
      const verifyRes = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: walletAddress,
          signature: Array.from(signedMessage.signature), // Uint8Array -> JSON
          nonce,
        }),
      });

      if (!verifyRes.ok) throw new Error("Failed to verify wallet");
      const { token } = await verifyRes.json();

      // Use AuthContext to handle login (this will also connect the wallet adapter)
      await login(token);

      // Success feedback + redirect to intended page
      toast({
        title: "Wallet Connected!",
        description: `Connected as ${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}`,
      });
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Connection failed",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // const handleEmailAuth = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // For MVP, simulate successful auth
  //   toast({
  //     title: "Account Created!",
  //     description: "Please connect your Phantom wallet to continue.",
  //   });
  // };

  return (
    <div className="min-h-screen bg-gradient-bg px-6 py-8">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary-glow mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold glow-text mb-2">
              Join TokenTrail
            </h1>
            <p className="text-muted-foreground">
              Connect your wallet and start earning tokens
            </p>
          </div>
        </div>

        <Card className="gamefi-card">
          <CardHeader>
            <CardTitle className="text-center glow-text">Get Started</CardTitle>
            <CardDescription className="text-center">
              Connect your Phantom wallet to participate in festival quests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Connect Phantom Wallet</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your Phantom wallet to start earning SPL tokens from festival quests
                  </p>
                </div>
                <Button
                  onClick={handlePhantomConnect}
                  disabled={isConnecting}
                  className="gamefi-button w-full"
                >
                  {isConnecting ? "Connecting..." : "Connect Phantom Wallet"}
                </Button>
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Don't have Phantom wallet?</p>
                  <a
                    href="https://phantom.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-glow underline"
                  >
                    Download here
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted/10 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground text-center">
                By connecting, you agree to TokenTrail's Terms of Service and Privacy Policy. 
                Your wallet will be used to receive SPL tokens and NFT rewards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;