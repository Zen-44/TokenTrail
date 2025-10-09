import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IClaim, getClaimByCode, markClaimAsUsed } from "@/lib/claim-api";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useFestival } from "@/contexts/FestivalContext";
import { Camera, X } from "lucide-react";
import { Navigate } from "react-router-dom";

const OrganizerRewardScanner = () => {
    const { isAdmin, walletAddress } = useAuth();
    const { selectedFestival } = useFestival();
    const [claimCode, setClaimCode] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [claim, setClaim] = useState<IClaim | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (isScanning) {
            const scanner = new Html5QrcodeScanner(
                'qr-scanner',
                {
                    qrbox: {
                        width: 250,
                        height: 250,
                    },
                    fps: 5,
                    videoConstraints: {
                        facingMode: "environment"
                    }
                },
                false
            );

            const onScanSuccess = (decodedText: string) => {
                setClaimCode(decodedText);
                setIsScanning(false);
                handleSearch(decodedText);
                scanner.clear();
            };

            const onScanFailure = (error: any) => {
                // console.warn(error);
            };

            scanner.render(onScanSuccess, onScanFailure);

            return () => {
                try {
                    scanner.clear();
                } catch (e) {
                    // console.error("Failed to clear scanner", e); 
                }
            };
        }
    }, [isScanning]);

    if (!isAdmin && (!selectedFestival || !walletAddress || walletAddress.toLowerCase() !== selectedFestival.wallet.toLowerCase())) {
        return <Navigate to="/" />;
    }

    const handleSearch = async (code: string) => {
        if (!code) return;

        setLoading(true);
        setError(null);
        setClaim(null);

        try {
            const foundClaim = await getClaimByCode(code);
            setClaim(foundClaim);
        } catch (err: any) {
            const errorMessage = err.message || "Failed to fetch claim.";
            setError(errorMessage);
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(claimCode);
    };

    const handleMarkAsUsed = async () => {
        if (!claim) return;

        const scrollPosition = window.scrollY;
        setLoading(true);
        try {
            await markClaimAsUsed(claim.claimCode);
            toast({
                title: "Success",
                description: "Reward has been marked as claimed.",
            });
            // Re-fetch the claim to get the updated status
            if (claim) {
                await handleSearch(claim.claimCode);
                window.scrollTo(0, scrollPosition);
            }
        } catch (err: any) {
            setError(err.message || "Failed to mark claim as used.");
            toast({
                title: "Error",
                description: err.message || "Failed to mark claim as used.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Reward Scanner</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Scan Reward Claim Code</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2">
                        <Input
                            type="text"
                            value={claimCode}
                            onChange={(e) => setClaimCode(e.target.value)}
                            placeholder="Enter or scan Claim Code"
                            className="flex-grow"
                        />
                        <Button onClick={() => setIsScanning(!isScanning)} variant="outline" type="button">
                            {isScanning ? <X className="w-4 h-4 mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
                            {isScanning ? 'Close Scanner' : 'Scan QR'}
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Searching..." : "Search"}
                        </Button>
                    </form>
                    {isScanning && (
                        <div className="mt-4 rounded-lg overflow-hidden">
                            <div id="qr-scanner"></div>
                        </div>
                    )}
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </CardContent>
            </Card>

            {claim && (
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Claim Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">{claim.reward.title}</h2>
                            <Badge variant={claim.claimCodeUsed ? "destructive" : "secondary"}>
                                {claim.claimCodeUsed ? "Claimed" : "Not Claimed"}
                            </Badge>
                        </div>
                        <img src={claim.reward.image} alt={claim.reward.title} className="w-32 h-32 object-cover my-4 rounded-md" />
                        <p><strong>Description:</strong> {claim.reward.description}</p>
                        <p><strong>Category:</strong> {claim.reward.category}</p>
                        <p><strong>Location:</strong> {claim.reward.location}</p>
                        <p><strong>Price:</strong> {claim.reward.price} points</p>
                        <p><strong>Claim Code:</strong> {claim.claimCode}</p>
                        <p><strong>User Wallet:</strong> {claim.user.wallet}</p>
                        
                        {!claim.claimCodeUsed && (
                            <Button onClick={handleMarkAsUsed} disabled={loading} className="mt-4">
                                {loading ? "Marking..." : "Mark as Claimed"}
                            </Button>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default OrganizerRewardScanner;
