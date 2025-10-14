import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, X, CheckCircle } from 'lucide-react';
import { useFestival } from '@/contexts/FestivalContext';
import { getUserProgress, updateStepProgress } from '@/lib/editor-api';
import { useToast } from '@/hooks/use-toast';

interface Progress {
  id: number;
  userId: number;
  stepId: number;
  completed: boolean;
  updatedAt: string;
}

interface Step {
  id: number;
  title: string;
  progress: Progress[];
}

interface Quest {
  id: number;
  title: string;
  steps: Step[];
  startDate?: string;
  endDate?: string;
}

const UserQuestManagement = () => {
  const [userWallet, setUserWallet] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [questData, setQuestData] = useState<Quest[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedWallet, setSearchedWallet] = useState('');
  const { selectedFestival } = useFestival();
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
        setUserWallet(decodedText);
        setIsScanning(false);
        fetchUserData(decodedText);
        scanner.clear();
      };

      const onScanFailure = (error: any) => {
        // console.warn(error);
      };

      scanner.render(onScanSuccess, onScanFailure);

      return () => {
        scanner.clear();
      };
    }
  }, [isScanning]);

  const fetchUserData = async (wallet: string, preserveScroll = false) => {
    if (!wallet) return;
    if (!selectedFestival) {
      toast({
        title: 'No Festival Selected',
        description: 'Please select a festival first.',
        variant: 'destructive',
      });
      return;
    }

    const scrollY = window.scrollY;

    setIsLoading(true);
    if (!preserveScroll) {
      setQuestData(null);
      setSearchedWallet('');
    }

    try {
      const data = await getUserProgress(parseInt(selectedFestival.id, 10), wallet);
      console.log('API response data:', data);
      setQuestData(data.quests);
      setSearchedWallet(wallet);
    } catch (error) {
      console.error('Failed to fetch user progress:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch user progress. The wallet might not be valid or registered.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      if (preserveScroll) {
        window.scrollTo(0, scrollY);
      }
    }
  };

  const handleToggleStepCompletion = async (questId: number, stepId: number, isCompleted: boolean) => {
    if (!searchedWallet) return;

    try {
      await updateStepProgress(questId, stepId, searchedWallet, !isCompleted);
      toast({ title: 'Success', description: `Step marked as ${!isCompleted ? 'complete' : 'incomplete'}.` });
      // Refresh data
      fetchUserData(searchedWallet, true);
    } catch (error) {
      console.error('Failed to update step completion:', error);
      toast({
        title: 'Error',
        description: 'Failed to update step status.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight glow-text">User Quest Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <Input
              type="text"
              placeholder="Enter or scan user wallet address"
              value={userWallet}
              onChange={(e) => setUserWallet(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={() => setIsScanning(!isScanning)} variant="outline" className="w-full sm:w-auto">
              {isScanning ? <X className="w-4 h-4 mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
              {isScanning ? 'Close Scanner' : 'Scan QR'}
            </Button>
            <Button onClick={() => fetchUserData(userWallet)} disabled={!userWallet || isLoading} className="w-full sm:w-auto">
              {isLoading ? 'Loading...' : 'Get User Progress'}
            </Button>
          </div>

          {isScanning && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <div id="qr-scanner"></div>
            </div>
          )}

          {questData && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Quest Progress for:</h3>
              <p className="text-sm text-muted-foreground mb-4 break-all">{searchedWallet}</p>
              
              <div className="space-y-4">
                {[...questData]
                  .sort((a, b) => {
                    const isQuestActive = (quest: Quest) => {
                      const now = new Date();
                      if (!quest.startDate || !quest.endDate) return true;
                      const startDate = new Date(quest.startDate);
                      const endDate = new Date(quest.endDate);
                      return now >= startDate && now <= endDate;
                    };
                    return (isQuestActive(b) ? 1 : 0) - (isQuestActive(a) ? 1 : 0);
                  })
                  .map((quest) => {
                  const isQuestActive = () => {
                    const now = new Date();
                    if (!quest.startDate || !quest.endDate) return true; // Assume active if no dates
                    const startDate = new Date(quest.startDate);
                    const endDate = new Date(quest.endDate);
                    return now >= startDate && now <= endDate;
                  };
                  const active = isQuestActive();

                  return (
                  <Card key={quest.id}>
                    <CardHeader>
                      <CardTitle>{quest.title}</CardTitle>
                      {quest.startDate && quest.endDate && (
                        <p className="text-sm text-muted-foreground">
                          {new Date(quest.startDate).toLocaleString()} - {new Date(quest.endDate).toLocaleString()}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {quest.steps.map((step, index) => {
                          const getStepStatus = (progress: Progress[]) => {
                            if (!progress || progress.length === 0) {
                              return false;
                            }
                            const sortedProgress = [...progress].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                            return sortedProgress[0].completed;
                          };
                          const isCompleted = getStepStatus(step.progress);
                          return (
                            <li key={step.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {isCompleted ? (
                                  <CheckCircle className="w-8 h-8 sm:w-6 sm:h-6 text-yellow-400" />
                                ) : (
                                  <div className="w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-muted text-muted-foreground text-lg sm:text-base font-semibold">
                                    {index + 1}
                                  </div>
                                )}
                                <span className={`${isCompleted ? 'line-through text-muted-foreground' : ''} text-base sm:text-sm`}>
                                  {step.title}
                                </span>
                              </div>
                              <Button size="sm" variant={isCompleted ? "destructive" : "default"} onClick={() => handleToggleStepCompletion(quest.id, step.id, isCompleted)} disabled={!active}>
                                {isCompleted ? 'Mark as Incomplete' : 'Mark as Done'}
                              </Button>
                            </li>
                          );
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserQuestManagement;
