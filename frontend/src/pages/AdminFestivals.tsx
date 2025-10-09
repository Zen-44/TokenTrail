import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { 
  fetchFestivals, 
  approveFestival, 
  disapproveFestival,
  type Festival 
} from '@/lib/admin-api';

const AdminFestivals = () => {
  const navigate = useNavigate();
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    loadFestivals();
  }, []);

  const loadFestivals = async () => {
    try {
      setLoading(true);
      const fetchedFestivals = await fetchFestivals();
      setFestivals(fetchedFestivals);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load festivals',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (festivalId: number, approve: boolean) => {
    if (processingIds.has(festivalId)) return;

    try {
      setProcessingIds(prev => new Set(prev).add(festivalId));
      
      const response = approve 
        ? await approveFestival(festivalId)
        : await disapproveFestival(festivalId);

      // Update the festival in the local state
      setFestivals(prev => 
        prev.map(festival => 
          festival.id === festivalId 
            ? { ...festival, approved: approve }
            : festival
        )
      );

      toast({
        title: 'Success',
        description: response.message,
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update approval',
        variant: 'destructive',
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(festivalId);
        return newSet;
      });
    }
  };

  const handleEditClick = (festival: Festival) => {
    navigate(`/admin/festivals/${festival.id}/edit`);
  };


  const getApprovalStatus = (festival: Festival) => {
    if (festival.approved === true) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      );
    } else if (festival.approved === false) {
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          Not Approved
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Festival Management</CardTitle>
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
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Festival Management
          </CardTitle>
          <Button 
            variant="outline" 
            onClick={loadFestivals}
            disabled={loading}
          >
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {festivals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No festivals found.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {festivals.map((festival) => {
                    const isProcessing = processingIds.has(festival.id);
                    
                    return (
                      <TableRow key={festival.id} onClick={() => handleEditClick(festival)} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{festival.id}</TableCell>
                        <TableCell className="font-medium">{festival.festivalName}</TableCell>
                        <TableCell className="max-w-xs truncate" title={festival.description}>
                          {festival.description || 'N/A'}
                        </TableCell>
                        <TableCell>{formatDate(festival.startDate)}</TableCell>
                        <TableCell>{formatDate(festival.endDate)}</TableCell>
                        <TableCell>{festival.location || 'N/A'}</TableCell>
                        <TableCell>{getApprovalStatus(festival)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {festival.approved !== true && (
                              <Button
                                size="sm"
                                variant="default"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={(e) => { e.stopPropagation(); handleApproval(festival.id, true); }}
                                disabled={isProcessing}
                              >
                                {isProcessing ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <CheckCircle className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                            {festival.approved !== false && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={(e) => { e.stopPropagation(); handleApproval(festival.id, false); }}
                                disabled={isProcessing}
                              >
                                {isProcessing ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <XCircle className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFestivals;