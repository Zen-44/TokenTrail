import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { 
  fetchRewards, 
  createReward, 
  updateReward, 
  deleteReward,
  type Reward 
} from '@/lib/reward-api';
import { RewardModal } from '@/components/RewardModal';
import { Badge } from '@/components/ui/badge';

const AdminRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // TODO: Get festival ID from context or props
  const festivalId = 1;

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    try {
      setLoading(true);
      const fetchedRewards = await fetchRewards(festivalId);
      setRewards(fetchedRewards);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load rewards',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewReward = () => {
    setSelectedReward({
      name: '',
      description: '',
      cost: 0,
      location: '',
      festivalId,
      available: true,
    });
    setIsModalOpen(true);
  };

  const handleEditReward = (reward: Reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReward(null);
  };

  const handleSaveReward = async (reward: Reward) => {
    try {
      if (reward.id) {
        const updated = await updateReward(reward);
        setRewards(prev => prev.map(r => r.id === updated.id ? updated : r));
        toast({
          title: 'Success',
          description: 'Reward updated successfully',
        });
      } else {
        const created = await createReward(reward);
        setRewards(prev => [...prev, created]);
        toast({
          title: 'Success',
          description: 'Reward created successfully',
        });
      }
      handleCloseModal();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save reward',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteReward = async (rewardId: number) => {
    if (!confirm('Are you sure you want to delete this reward?')) return;

    try {
      await deleteReward(rewardId);
      setRewards(prev => prev.filter(r => r.id !== rewardId));
      toast({
        title: 'Success',
        description: 'Reward deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete reward',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Reward Store Management</CardTitle>
          <Button onClick={handleNewReward}>
            <Plus className="w-4 h-4 mr-2" />
            New Reward
          </Button>
        </CardHeader>
        <CardContent>
          {rewards.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No rewards found. Create your first reward!
            </div>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead className="hidden sm:table-cell">Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewards.map((reward) => (
                    <TableRow key={reward.id}>
                      <TableCell className="font-medium">{reward.name}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {reward.description}
                      </TableCell>
                      <TableCell>{reward.cost} tokens</TableCell>
                      <TableCell className="hidden sm:table-cell">{reward.location}</TableCell>
                      <TableCell>
                        <Badge variant={reward.available ? "default" : "secondary"}>
                          {reward.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditReward(reward)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => reward.id && handleDeleteReward(reward.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <RewardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reward={selectedReward}
        onSave={handleSaveReward}
      />
    </div>
  );
};

export default AdminRewards;
