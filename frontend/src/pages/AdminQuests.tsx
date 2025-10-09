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
  fetchQuests, 
  createQuest, 
  updateQuest, 
  deleteQuest,
  type Quest 
} from '@/lib/quest-api';
import { QuestModal } from '@/components/QuestModal';

const AdminQuests = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // TODO: Get festival ID from context or props
  const festivalId = 1;

  useEffect(() => {
    loadQuests();
  }, []);

  const loadQuests = async () => {
    try {
      setLoading(true);
      const fetchedQuests = await fetchQuests(festivalId);
      setQuests(fetchedQuests);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load quests',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewQuest = () => {
    setSelectedQuest({
      title: '',
      description: '',
      reward: 0,
      difficulty: 'Medium',
      duration: '1',
      startDate: '',
      endDate: '',
      festivalId,
    });
    setIsModalOpen(true);
  };

  const handleEditQuest = (quest: Quest) => {
    setSelectedQuest(quest);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuest(null);
  };

  const handleSaveQuest = async (quest: Quest) => {
    try {
      if (quest.id) {
        const updated = await updateQuest(quest);
        setQuests(prev => prev.map(q => q.id === updated.id ? updated : q));
        toast({
          title: 'Success',
          description: 'Quest updated successfully',
        });
      } else {
        const created = await createQuest(quest);
        setQuests(prev => [...prev, created]);
        toast({
          title: 'Success',
          description: 'Quest created successfully',
        });
      }
      handleCloseModal();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save quest',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteQuest = async (questId: number) => {
    if (!confirm('Are you sure you want to delete this quest?')) return;

    try {
      await deleteQuest(questId);
      setQuests(prev => prev.filter(q => q.id !== questId));
      toast({
        title: 'Success',
        description: 'Quest deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete quest',
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
          <CardTitle>Quest Management</CardTitle>
          <Button onClick={handleNewQuest}>
            <Plus className="w-4 h-4 mr-2" />
            New Quest
          </Button>
        </CardHeader>
        <CardContent>
          {quests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No quests found. Create your first quest!
            </div>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead className="hidden sm:table-cell">Difficulty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quests.map((quest) => (
                    <TableRow key={quest.id}>
                      <TableCell className="font-medium">{quest.title}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {quest.description}
                      </TableCell>
                      <TableCell>{quest.reward}</TableCell>
                      <TableCell className="hidden sm:table-cell">{quest.difficulty}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditQuest(quest)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => quest.id && handleDeleteQuest(quest.id)}
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

      <QuestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quest={selectedQuest}
        onSave={handleSaveQuest}
      />
    </div>
  );
};

export default AdminQuests;
