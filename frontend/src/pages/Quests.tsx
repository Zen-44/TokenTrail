import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Clock, 
  Coins, 
  Users, 
  Camera,
  Share2,
  CheckCircle,
  Star,
  Loader2,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Save,
  XCircle
} from "lucide-react";
import { useFestival } from "@/contexts/FestivalContext";
import { API_BASE_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface QuestStep {
  id: number;
  title: string;
  order: number;
  createdAt: string;
  questId: number;
  progress: any[];
}

interface Quest {
  id: number;
  title: string;
  description: string;
  reward: number;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  createdAt: string;
  festivalId: number;
  steps: QuestStep[];
  progress: any[];
  startDate?: string;
  endDate?: string;
}

interface QuestResponse {
  wallet: string;
  quests: Quest[];
}

type QuestStatus = "completed" | "active" | "expired" | "upcoming" | "available";

const Quests = () => {
  const { selectedFestival } = useFestival();
  const { walletAddress } = useAuth();
  const { toast } = useToast();
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const [editingQuestId, setEditingQuestId] = useState<number | null>(null);
  const [editedQuestData, setEditedQuestData] = useState<Partial<Quest> | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingQuest, setIsAddingQuest] = useState(false);

  useEffect(() => {
    if (selectedFestival && walletAddress) {
      setIsOrganizer(walletAddress.toLowerCase() === selectedFestival.wallet.toLowerCase());
    } else {
      setIsOrganizer(false);
    }
  }, [walletAddress, selectedFestival]);

  const getQuestStatuses = (quest: Quest): QuestStatus[] => {
    const statuses: QuestStatus[] = [];
    const now = new Date();

    const getStepStatus = (progress: any[]) => {
      if (!progress || progress.length === 0) return false;
      const sortedProgress = [...progress].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      return sortedProgress[0].completed;
    };

    const completedStepsCount = quest.steps.filter(step => getStepStatus(step.progress)).length;

    if (quest.steps.length > 0 && completedStepsCount === quest.steps.length) {
      statuses.push("completed");
    }

    if (quest.endDate && new Date(quest.endDate) < now) {
      statuses.push("expired");
    } else if (quest.startDate && new Date(quest.startDate) > now) {
      statuses.push("upcoming");
    } else if (quest.startDate && new Date(quest.startDate) <= now) {
      if (!quest.endDate || (quest.endDate && new Date(quest.endDate) >= now)) {
        if (!statuses.includes("completed")) {
          statuses.push("active");
        }
      }
    }

    if (statuses.length === 0) {
      statuses.push("available");
    }
    
    return statuses;
  };

  // Function to fetch quests from the API
  const fetchQuests = async (festivalId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Am actualizat ruta pentru a prelua quest-urile conform noii structuri
      const response = await fetch(`${API_BASE_URL}/festivals/${festivalId}/quests`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch quests: ${response.status} ${response.statusText}`);
      }
      
      // Presupunem că noua rută returnează direct un array de quest-uri
      const questsData: QuestResponse = await response.json();
      setQuests(questsData.quests);
    } catch (err) {
      console.error('Error fetching quests:', err);
      setError(err instanceof Error ? err.message : 'Failed to load quests');
      // Fallback to empty array on error
      setQuests([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch quests when component mounts or festival changes
  useEffect(() => {
    if (selectedFestival?.id) {
      fetchQuests(selectedFestival.id);
    } else {
      setLoading(false);
      setQuests([]);
    }
  }, [selectedFestival?.id]);

  const handleEditClick = (quest: Quest) => {
    setEditingQuestId(quest.id);
    setEditedQuestData(quest);
    setSelectedQuest(null); // Close details view when editing
    setIsAddingQuest(false); // Ensure we are not in add mode
  };

  const handleCancelEdit = () => {
    setEditingQuestId(null);
    setEditedQuestData(null);
    setIsAddingQuest(false);
  };

  const handleSaveEdit = async () => {
    if (!editedQuestData || !selectedFestival?.id) return;

    // Am actualizat rutele pentru creare (POST) și actualizare (PUT)
    const url = isAddingQuest
      ? `${API_BASE_URL}/quests`
      : `${API_BASE_URL}/quests/${editedQuestData.id}`;

    const method = isAddingQuest ? 'POST' : 'PUT';

    // Construim corpul cererii conform structurii specificate
    const body = {
      title: editedQuestData.title,
      description: editedQuestData.description,
      reward: Number(editedQuestData.reward) || 0,
      difficulty: editedQuestData.difficulty,
      duration: editedQuestData.duration,
      startDate: editedQuestData.startDate,
      endDate: editedQuestData.endDate,
      festivalId: editedQuestData.festivalId,
      steps: editedQuestData.steps?.map(step => ({
        title: step.title,
        order: step.order,
      })),
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${isAddingQuest ? 'create' : 'update'} quest.`);
      }

      const savedQuest: Quest = await response.json();

      if (isAddingQuest) {
        // Adaugă noul quest la începutul listei locale
        setQuests([savedQuest, ...quests]);
      } else {
        // Actualizează quest-ul existent în lista locală
        setQuests(quests.map(q => q.id === savedQuest.id ? savedQuest : q));
      }

      toast({
        title: `Quest ${isAddingQuest ? 'Created' : 'Updated'}`,
        description: `The quest has been saved successfully.`,
      });

    } catch (error) {
      console.error(`Error saving quest:`, error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setEditingQuestId(null);
      setEditedQuestData(null);
      setIsAddingQuest(false);
    }
  };

  const handleDeleteQuest = async (questId: number) => {
    if (!selectedFestival?.id) return;
    if (window.confirm("Are you sure you want to delete this quest?")) {
      try {
        // Am actualizat ruta pentru ștergere (DELETE)
        const response = await fetch(`${API_BASE_URL}/quests/${questId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ festivalId: selectedFestival.id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete quest.');
        }

        toast({
          title: "Quest Deleted",
          description: "The quest has been removed.",
        });
        
        // Remove quest from local state to update UI immediately
        setQuests(quests.filter(q => q.id !== questId));

      } catch (error) {
        console.error('Error deleting quest:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Could not delete the quest.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddQuest = () => {
    if (!selectedFestival) return;
    setIsAddingQuest(true);
    setEditingQuestId(null); // Deselect any currently editing quest
    // Pre-populate with default/empty values for a new quest
    setEditedQuestData({
      id: -1, // Temporary ID for new quest
      title: "",
      description: "",
      reward: 0,
      difficulty: "Easy",
      duration: "1h",
      startDate: "",
      endDate: "",
      festivalId: Number(selectedFestival.id),
      steps: [],
      progress: [],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedQuestData) return;
    setEditedQuestData({
      ...editedQuestData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDifficultyChange = (value: "Easy" | "Medium" | "Hard") => {
    if (!editedQuestData) return;
    setEditedQuestData({
      ...editedQuestData,
      difficulty: value,
    });
  };

  const handleStepChange = (index: number, field: 'title' | 'description', value: string) => {
    if (!editedQuestData || !editedQuestData.steps) return;
    const newSteps = [...editedQuestData.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setEditedQuestData({ ...editedQuestData, steps: newSteps });
  };

  const handleAddStep = () => {
    if (!editedQuestData) return;
    setEditedQuestData({
      ...editedQuestData,
      steps: [...(editedQuestData.steps || []), { title: "", order: (editedQuestData.steps?.length || 0) + 1 }],
    });
  };

  const handleRemoveStep = (index: number) => {
    if (!editedQuestData || !editedQuestData.steps) return;
    const newSteps = editedQuestData.steps.filter((_, i) => i !== index);
    setEditedQuestData({ ...editedQuestData, steps: newSteps });
  };

  const getStatusColor = (status: QuestStatus) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "active": return "bg-primary/20 text-primary border-primary/50";
      case "expired": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "upcoming": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      default: return "bg-secondary/20 text-secondary border-secondary/50";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "Hard": return "bg-red-500/20 text-red-400 border-red-500/50";
      default: return "bg-muted/20 text-muted-foreground border-muted/50";
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="text-center py-4 sm:py-6">
          <h1 className="text-2xl sm:text-4xl font-bold glow-text mb-2">
            Festival Quests
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg px-2">
            Complete sponsored challenges to earn SPL tokens and exclusive rewards
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading quests...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="text-center py-4 sm:py-6">
          <h1 className="text-2xl sm:text-4xl font-bold glow-text mb-2">
            Festival Quests
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg px-2">
            Complete sponsored challenges to earn SPL tokens and exclusive rewards
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Failed to load quests</h3>
            <p className="text-muted-foreground">{error}</p>
            <Button 
              onClick={() => selectedFestival?.id && fetchQuests(selectedFestival.id)}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show no festival selected state
  if (!selectedFestival) {
    return (
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="text-center py-4 sm:py-6">
          <h1 className="text-2xl sm:text-4xl font-bold glow-text mb-2">
            Festival Quests
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg px-2">
            Complete sponsored challenges to earn SPL tokens and exclusive rewards
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Star className="w-12 h-12 text-muted-foreground" />
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">No Festival Selected</h3>
            <p className="text-muted-foreground">Please select a festival to view available quests</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="text-center py-4 sm:py-6">
        <h1 className="text-2xl sm:text-4xl font-bold glow-text mb-2">
          Festival Quests
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg px-2">
          Complete sponsored challenges to earn SPL tokens and exclusive rewards
        </p>
      </div>



      {/* Quest List */}
      <div className="grid gap-4 sm:gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            Available Quests
          </h2>
          {isOrganizer && (
            <Button onClick={handleAddQuest} disabled={isAddingQuest}>
              <Plus className="mr-2 h-4 w-4" /> Add Quest
            </Button>
          )}
        </div>
        
        {isAddingQuest && (
          <Card key="new-quest" className="gamefi-card ring-2 ring-primary">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="space-y-2">
                    <Input name="title" value={editedQuestData?.title || ''} onChange={handleInputChange} placeholder="New Quest Title" className="text-lg sm:text-xl font-bold" />
                    <Textarea name="description" value={editedQuestData?.description || ''} onChange={handleInputChange} placeholder="Quest Description" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        name="startDate"
                        type="datetime-local"
                        value={editedQuestData?.startDate ? editedQuestData.startDate.slice(0, 16) : ""}
                        onChange={handleInputChange}
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        name="endDate"
                        type="datetime-local"
                        value={editedQuestData?.endDate ? editedQuestData.endDate.slice(0, 16) : ""}
                        onChange={handleInputChange}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:space-y-2">
                  <Input name="reward" type="number" value={editedQuestData?.reward || ''} onChange={handleInputChange} placeholder="Reward" className="w-24 text-right" />
                  <Select onValueChange={handleDifficultyChange} value={editedQuestData?.difficulty}>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" onClick={handleSaveEdit}><Save className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" onClick={handleCancelEdit}><XCircle className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Quest Steps ({editedQuestData?.steps?.length || 0})</h4>
                  <Button variant="outline" size="sm" onClick={handleAddStep}>
                    <Plus className="mr-2 h-4 w-4" /> Add Step
                  </Button>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {editedQuestData?.steps?.map((step, index) => (
                    <div key={step.id} className="p-3 border rounded-lg space-y-2 bg-muted/50 relative">
                       <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:text-red-500"
                        onClick={() => handleRemoveStep(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder={`Step ${index + 1} Title`}
                        value={step.title}
                        onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {quests.length === 0 && !isAddingQuest ? (
          <Card className="gamefi-card">
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
              <Star className="w-12 h-12 text-muted-foreground" />
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">No Quests Available</h3>
                <p className="text-muted-foreground">
                  No quests are currently available for {selectedFestival.name}. 
                  Check back later for new challenges!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          quests.slice().sort((a, b) => {
            const statusOrder: QuestStatus[] = ["active", "upcoming", "available", "completed", "expired"];
            const statusesA = getQuestStatuses(a);
            const statusesB = getQuestStatuses(b);
            const priorityA = Math.min(...statusesA.map(s => statusOrder.indexOf(s)));
            const priorityB = Math.min(...statusesB.map(s => statusOrder.indexOf(s)));
            return priorityA - priorityB;
          }).map((quest) => {
          const questStatuses = getQuestStatuses(quest);
          const getStepStatus = (progress: any[]) => {
            if (!progress || progress.length === 0) {
              return false;
            }
            const sortedProgress = [...progress].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            return sortedProgress[0].completed;
          };
          const completedStepsCount = quest.steps.filter(step => getStepStatus(step.progress)).length;
          const completedSteps = completedStepsCount;
          const progress = quest.steps.length > 0 ? (completedSteps / quest.steps.length) * 100 : 0;
          const isEditing = editingQuestId === quest.id;
          
          return (
            <Card 
              key={quest.id} 
              className={`gamefi-card transition-all duration-300 ${
                selectedQuest === quest.id ? 'ring-2 ring-primary' : ''
              } ${questStatuses.includes('expired') && !isEditing ? 'opacity-60' : ''}`}
              onClick={() => !isEditing && setSelectedQuest(selectedQuest === quest.id ? null : quest.id)}
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input name="title" value={editedQuestData?.title || ''} onChange={handleInputChange} placeholder="Quest Title" className="text-lg sm:text-xl font-bold" />
                        <Textarea name="description" value={editedQuestData?.description || ''} onChange={handleInputChange} placeholder="Quest Description" />
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-lg sm:text-xl cursor-pointer">{quest.title}</CardTitle>
                          {questStatuses.map(status => (
                            <Badge key={status} variant="outline" className={getStatusColor(status)}>
                              {status === 'upcoming' ? 'Available Soon' : status.charAt(0).toUpperCase() + status.slice(1)}
                            </Badge>
                          ))}
                        </div>
                        <CardDescription className="text-sm sm:text-base">
                          {quest.description}
                        </CardDescription>
                      </>
                    )}
                  </div>
                  
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:space-y-2">
                    {isEditing ? (
                      <>
                        <Input name="reward" type="number" value={editedQuestData?.reward || ''} onChange={handleInputChange} placeholder="Reward" className="w-24 text-right" />
                        <Select onValueChange={handleDifficultyChange} value={editedQuestData?.difficulty}>
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    ) : (
                      <div className="flex items-center gap-1 text-accent font-bold text-lg">
                        <Coins className="w-5 h-5" />
                        {quest.reward}
                      </div>
                    )}
                    {!isEditing && (
                      <Badge variant="outline" className={getDifficultyColor(quest.difficulty)}>
                        {quest.difficulty}
                      </Badge>
                    )}
                  </div>
                   {isOrganizer && (
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" onClick={handleSaveEdit}><Save className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" onClick={handleCancelEdit}><XCircle className="h-4 w-4" /></Button>
                        </>
                      ) : (
                        <>
                          <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" onClick={(e) => { e.stopPropagation(); handleEditClick(quest); }}><Edit className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 text-red-500 hover:text-red-400" onClick={(e) => { e.stopPropagation(); handleDeleteQuest(quest.id); }}><Trash2 className="h-4 w-4" /></Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {quest.steps.length} step{quest.steps.length !== 1 ? "s" : ""}
                  </div>
                  {quest.startDate && quest.endDate && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(quest.startDate).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })} - {new Date(quest.endDate).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
                
                {questStatuses.includes("active") && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{completedSteps}/{quest.steps.length} steps</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </CardHeader>
              
              {(selectedQuest === quest.id || isEditing) && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="duration">Duration (hours)</Label>
                            <Input
                              name="duration"
                              value={editedQuestData.duration || ""}
                              onChange={handleInputChange}
                              className="bg-background/50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                              name="startDate"
                              type="datetime-local"
                              value={editedQuestData.startDate ? editedQuestData.startDate.slice(0, 16) : ""}
                              onChange={handleInputChange}
                              className="bg-background/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                              name="endDate"
                              type="datetime-local"
                              value={editedQuestData.endDate ? editedQuestData.endDate.slice(0, 16) : ""}
                              onChange={handleInputChange}
                              className="bg-background/50"
                            />
                          </div>
                        </div>

                        <h4 className="text-lg font-semibold mt-6 mb-2">Quest Steps</h4>
                        {editedQuestData.steps?.map((step, index) => (
                          <div key={index} className="p-4 border rounded-lg bg-background/30 space-y-2">
                            <Label>Step {index + 1}: {step.title}</Label>
                            <Input
                              value={step.title}
                              onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                              className="bg-background/50"
                            />
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleRemoveStep(index)}>Remove</Button>
                            </div>
                          </div>
                        ))}
                        <Button onClick={handleAddStep} className="mt-2">Add Step</Button>
                      </>
                    ) : (
                      <>
                        <h4 className="font-semibold">Quest Steps:</h4>
                        <div className="space-y-3">
                          {quest.steps.map((step, index) => {
                            const getStepStatus = (progress: any[]) => {
                              if (!progress || progress.length === 0) {
                                return false;
                              }
                              const sortedProgress = [...progress].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                              return sortedProgress[0].completed;
                            };
                            const isCompleted = getStepStatus(step.progress);
                            return (
                              <div key={step.id} className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  isCompleted 
                                    ? 'bg-accent text-accent-foreground' 
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : (
                                    <span className="text-xs">{step.order + 1}</span>
                                  )}
                                </div>
                                <span className={isCompleted ? 'line-through text-muted-foreground' : ''}>
                                  {step.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        }))
      }
      </div>
    </div>
  );
}

export default Quests;