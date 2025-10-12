import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { type Festival } from '@/lib/admin-api';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, UserPlus, X } from 'lucide-react';
import { useFestival } from '@/contexts/FestivalContext';
import { updateFestivalByOrganizer, getFestivalEditors, addFestivalEditor, removeFestivalEditor } from '@/lib/organizer-api';
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

const OrganizerFestivalEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedFestival, refreshFestivalData } = useFestival();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [festival, setFestival] = useState<Festival | null>(null);
  const [originalFestival, setOriginalFestival] = useState<Festival | null>(null);
  const [newEditorWallet, setNewEditorWallet] = useState('');
  const [fetchedEditors, setFetchedEditors] = useState<string[]>([]);

  useEffect(() => {
    const loadFestivalData = async () => {
      if (selectedFestival) {
        setLoading(true);
        try {
          const editors = await getFestivalEditors(Number(selectedFestival.id));
          setFetchedEditors(editors);

          const festivalData: Festival = {
            id: Number(selectedFestival.id),
            festivalName: selectedFestival.name,
            organizerName: selectedFestival.organizerName,
            email: selectedFestival.email,
            phone: selectedFestival.phone,
            location: selectedFestival.location,
            startDate: selectedFestival.startDate,
            endDate: selectedFestival.endDate,
            expectedAttendees: selectedFestival.expectedAttendees,
            sponsorBudget: selectedFestival.sponsorBudget,
            description: selectedFestival.description,
            website: selectedFestival.website,
            tokenName: selectedFestival.tokenName,
            tokenSymbol: selectedFestival.tokenSymbol,
            tokenSupply: selectedFestival.tokenSupply,
            tokenAddress: selectedFestival.tokenAddress,
            wallet: selectedFestival.wallet,
          };
          setFestival(festivalData);
          setOriginalFestival({ ...festivalData });
        } catch (error) {
          toast({
            title: 'Error',
            description: error instanceof Error ? error.message : 'Failed to load festival data',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadFestivalData();
  }, [selectedFestival, toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!festival) return;

    let value = e.target.value;
    
    // Handle special cases for different field types
    if (e.target.type === 'date' && value) {
      // Ensure date values have the time component set to noon UTC to avoid timezone issues
      const date = new Date(value);
      date.setUTCHours(12, 0, 0, 0);
      value = date.toISOString().split('T')[0];
    } else if (e.target.type === 'number') {
      value = value === '' ? '' : String(Number(value));
    }

    setFestival({
      ...festival,
      [e.target.name]: value,
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

  const handleSave = async () => {
    if (!festival) return;
    
    try {
      setSaving(true);
      // Convert dates to ISO format with time component
      const startDateTime = festival.startDate ? new Date(festival.startDate).toISOString() : undefined;
      const endDateTime = festival.endDate ? new Date(festival.endDate).toISOString() : undefined;

      const updatedFestival = await updateFestivalByOrganizer({
        ...festival,
        startDate: startDateTime,
        endDate: endDateTime,
        tokenSupply: festival.tokenSupply ? Number(festival.tokenSupply) : undefined,
      });
      
      setOriginalFestival({ ...updatedFestival });
      setFestival(updatedFestival);
      refreshFestivalData();
      
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

  const handleAddEditor = async () => {
    if (!festival || !newEditorWallet) return;

    try {
      await addFestivalEditor(festival.id, newEditorWallet);
      const updatedEditors = await getFestivalEditors(festival.id);
      setFetchedEditors(updatedEditors);
      setNewEditorWallet('');

      toast({
        title: 'Success',
        description: 'Editor added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add editor',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveEditor = async (editorWallet: string) => {
    if (!festival) return;

    try {
      await removeFestivalEditor(festival.id, editorWallet);
      const updatedEditors = await getFestivalEditors(festival.id);
      setFetchedEditors(updatedEditors);

      toast({
        title: 'Success',
        description: 'Editor removed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to remove editor',
        variant: 'destructive',
      });
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
        onClick={() => navigate('/organizer-panel')}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Organizer Panel
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
                  type="number"
                  value={festival.tokenSupply?.toString() || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Token Address</Label>
                <Input
                  value={festival.tokenAddress || ""}
                  disabled
                />
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

            <div className="col-span-2 space-y-4 border-t pt-4">
              <h3 className="text-lg font-semibold">Festival Editors</h3>
              <div className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="newEditor">Add Editor (by wallet address)</Label>
                  <Input
                    id="newEditor"
                    type="text"
                    value={newEditorWallet}
                    onChange={(e) => setNewEditorWallet(e.target.value)}
                    placeholder="0x..."
                  />
                </div>
                <Button onClick={handleAddEditor} disabled={!newEditorWallet}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              
              <div className="space-y-2">
                {fetchedEditors.map((editor) => (
                  <div key={editor} className="flex items-center justify-between p-2 border rounded">
                    <span>{editor}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveEditor(editor)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2 flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t">
                <Button
                variant="outline"
                onClick={() => navigate('/organizer-panel')}
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

export default OrganizerFestivalEdit;
