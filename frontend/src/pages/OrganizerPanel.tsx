import { Link, Navigate } from "react-router-dom";
import { useFestival } from "@/contexts/FestivalContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  createQuest,
  deleteQuest,
  fetchQuests,
  Quest,
  updateQuest,
} from "@/lib/quest-api";
import { QuestModal } from "@/components/QuestModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, PlusCircle, Trash } from "lucide-react";
import { updateFestivalByOrganizer } from "@/lib/organizer-api";
import { Festival as AdminFestival } from "@/lib/admin-api";
import { useNavigate } from "react-router-dom";

const OrganizerPanel = () => {
  const { selectedFestival, refreshFestivalData } = useFestival();
  const { walletAddress, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  useEffect(() => {
    if (selectedFestival) {
      loadQuests();
    }
  }, [selectedFestival]);

  const loadQuests = async () => {
    if (selectedFestival) {
      const fetchedQuests = await fetchQuests(Number(selectedFestival.id));
      setQuests(fetchedQuests);
    }
  };

  if (!selectedFestival || !walletAddress || (walletAddress.toLowerCase() !== selectedFestival.wallet.toLowerCase() && !isAdmin)) {
    return <Navigate to="/" />;
  }

  const handleNewQuest = () => {
    setSelectedQuest({
      title: "",
      description: "",
      reward: 0,
      difficulty: "Easy",
      duration: "",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      festivalId: Number(selectedFestival!.id),
      steps: [],
    });
    setIsModalOpen(true);
  };

  const handleEditQuest = (quest: Quest) => {
    setSelectedQuest(quest);
    setIsModalOpen(true);
  };

  const handleDeleteQuest = async (questId: number) => {
    if (window.confirm("Are you sure you want to delete this quest?")) {
      try {
        await deleteQuest(questId);
        toast({
          title: "Quest Deleted",
          description: "The quest has been successfully deleted.",
        });
        loadQuests();
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to delete quest.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveQuest = async (quest: Quest) => {
    try {
      if (quest.id) {
        await updateQuest(quest);
        toast({
          title: "Quest Updated",
          description: "The quest has been successfully updated.",
        });
      } else {
        await createQuest(quest);
        toast({
          title: "Quest Created",
          description: "The new quest has been successfully created.",
        });
      }
      setIsModalOpen(false);
      loadQuests();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save quest.",
        variant: "destructive",
      });
    }
  };



  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        Organizer Panel for {selectedFestival.name}
      </h1>

      <div className="p-6 border rounded-lg bg-card mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Festival Details</h2>
          <Button onClick={() => navigate(`/organizer-panel/festival/edit`)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Festival
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Name:</strong> {selectedFestival.name}</div>
          <div><strong>Organizer:</strong> {selectedFestival.organizerName}</div>
          <div><strong>Email:</strong> {selectedFestival.email}</div>
          <div><strong>Phone:</strong> {selectedFestival.phone}</div>
          <div><strong>Location:</strong> {selectedFestival.location}</div>
          <div><strong>Dates:</strong> {new Date(selectedFestival.startDate).toLocaleDateString()} - {new Date(selectedFestival.endDate).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="p-6 border rounded-lg bg-card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Quests</h2>
          <div className="flex gap-2">
            <Link to="/reward-scanner">
              <Button>Scan Reward</Button>
            </Link>
            <Button onClick={handleNewQuest}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Quest
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Reward</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quests.map((quest) => (
              <TableRow key={quest.id}>
                <TableCell>{quest.title}</TableCell>
                <TableCell>{quest.reward}</TableCell>
                <TableCell>{quest.difficulty}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditQuest(quest)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteQuest(quest.id!)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <QuestModal
        quest={selectedQuest}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuest}
      />

    </div>
  );
};

export default OrganizerPanel;
