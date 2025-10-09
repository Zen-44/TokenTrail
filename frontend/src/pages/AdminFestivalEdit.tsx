import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { fetchFestivals, updateFestival, generateFestivalToken, type Festival } from '@/lib/admin-api';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminFestivalEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [festival, setFestival] = useState<Festival | null>(null);
  const [originalFestival, setOriginalFestival] = useState<Festival | null>(null);
  const [generatingToken, setGeneratingToken] = useState(false);

  useEffect(() => {
    loadFestival();
  }, [id]);

  const loadFestival = async () => {
    try {
      setLoading(true);
      const festivals = await fetchFestivals();
      const found = festivals.find(f => f.id === Number(id));
      
      if (!found) {
        toast({
          title: 'Error',
          description: 'Festival not found',
          variant: 'destructive',
        });
        navigate('/admin/festivals');
        return;
      }
      
      setFestival(found);
      setOriginalFestival({ ...found });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load festival',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!festival) return;
    setFestival({
      ...festival,
      [e.target.name]: e.target.value,
    });
  };

  const handleUndo = () => {
    if (originalFestival) {
      setFestival({ ...originalFestival });
      toast({
        title: 'Changes undone',
        description: 'Form has been reset to last saved state',
      });
    }
  };

  const handleGenerateToken = async () => {
    if (!festival?.id) return;
    
    try {
      setGeneratingToken(true);
      const response = await generateFestivalToken(festival.id);
      
      if (response.tokenAddress) {
        setFestival(prev => prev ? {
          ...prev,
          tokenAddress: response.tokenAddress
        } : null);
        
        toast({
          title: 'Success',
          description: 'Token generated successfully',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate token',
        variant: 'destructive',
      });
    } finally {
      setGeneratingToken(false);
    }
  };

  const handleSave = async () => {
    if (!festival) return;
    
    try {
      setSaving(true);
      const updated = await updateFestival(festival);
      setFestival(updated);
      setOriginalFestival({ ...updated });
      
      toast({
        title: 'Success',
        description: 'Festival updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update festival',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!festival) return null;

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate('/admin/festivals')}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Festivals
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Festival: {festival.festivalName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="festivalName">Festival Name</Label>
                <Input
                  id="festivalName"
                  name="festivalName"
                  value={festival.festivalName || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizerName">Organizer Name</Label>
                <Input
                  id="organizerName"
                  name="organizerName"
                  value={festival.organizerName || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={festival.email || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={festival.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={festival.location || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={festival.website || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={festival.startDate?.split("T")[0] || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={festival.endDate?.split("T")[0] || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedAttendees">Expected Attendees</Label>
                <Input
                  id="expectedAttendees"
                  name="expectedAttendees"
                  value={festival.expectedAttendees || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sponsorBudget">Sponsor Budget</Label>
                <Input
                  id="sponsorBudget"
                  name="sponsorBudget"
                  value={festival.sponsorBudget || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet Address</Label>
                <Input
                  id="wallet"
                  name="wallet"
                  value={festival.wallet || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tokenName">Token Name</Label>
                <Input
                  id="tokenName"
                  name="tokenName"
                  value={festival.tokenName || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tokenSymbol">Token Symbol</Label>
                <Input
                  id="tokenSymbol"
                  name="tokenSymbol"
                  value={festival.tokenSymbol || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tokenSupply">Token Supply</Label>
                <Input
                  id="tokenSupply"
                  name="tokenSupply"
                  value={festival.tokenSupply?.toString() || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tokenAddress">Token Address</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="tokenAddress"
                    name="tokenAddress"
                    value={festival.tokenAddress || ""}
                    onChange={handleChange}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="secondary"
                        size="default"
                        className="w-full"
                        disabled={saving || generatingToken}
                      >
                        {generatingToken ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        ) : null}
                        Generate Token
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Generate Token</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will generate a new token for the festival. This action cannot be undone. 
                          Are you sure you want to continue?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleGenerateToken}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={festival.description || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2 flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/festivals')}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                onClick={handleUndo}
                disabled={saving}
              >
                Undo Changes
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFestivalEdit;
