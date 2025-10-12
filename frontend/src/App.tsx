import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FestivalOnboarding from "./pages/FestivalOnboarding";
import FestivalSelection from "./pages/FestivalSelection";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Quests from "./pages/Quests";
import RewardStore from "./pages/RewardStore";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import AdminFestivals from "./pages/AdminFestivals";
import AdminFestivalEdit from "./pages/AdminFestivalEdit";
import AdminQuests from "./pages/AdminQuests";
import AdminRewards from "./pages/AdminRewards";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";
import { FestivalProvider } from "./contexts/FestivalContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import OrganizerPanel from "./pages/OrganizerPanel";
import OrganizerFestivalEdit from "./pages/OrganizerFestivalEdit";
import UserQuestManagement from "./pages/UserQuestManagement";
import { EditorProvider } from "./contexts/EditorContext";
import RewardScanner from "./pages/RewardScanner";
import OrganizerRewardScanner from "./pages/OrganizerRewardScanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FestivalProvider>
        <EditorProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/festival-onboarding" element={<FestivalOnboarding />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/festival-selection" element={
                  <ProtectedRoute>
                    <FestivalSelection />
                  </ProtectedRoute>
                } />
                
                {/* Protected Dashboard Routes with Layout */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout><Dashboard /></DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/quests" element={
                  <ProtectedRoute>
                    <DashboardLayout><Quests /></DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/rewards" element={
                  <ProtectedRoute>
                    <DashboardLayout><RewardStore /></DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/profile" element={
                  <ProtectedRoute>
                    <DashboardLayout><Profile /></DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/wallet" element={
                  <ProtectedRoute>
                    <DashboardLayout><Wallet /></DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/organizer-panel" element={
                  <ProtectedRoute>
                    <DashboardLayout><OrganizerPanel /></DashboardLayout>
                  </ProtectedRoute>
                } />

                <Route path="/organizer-panel/festival/edit" element={
                  <ProtectedRoute>
                    <DashboardLayout><OrganizerFestivalEdit /></DashboardLayout>
                  </ProtectedRoute>
                } />

                <Route path="/user-quest-management" element={
                  <ProtectedRoute>
                    <DashboardLayout><UserQuestManagement /></DashboardLayout>
                  </ProtectedRoute>
                } />

                <Route path="/reward-scanner" element={
                  <ProtectedRoute>
                    <DashboardLayout><RewardScanner /></DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/organizer-reward-scanner" element={
                  <ProtectedRoute>
                    <DashboardLayout><OrganizerRewardScanner /></DashboardLayout>
                  </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin/festivals" element={
                  <ProtectedRoute>
                    <DashboardLayout><AdminFestivals /></DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/festivals/:id/edit" element={
                  <ProtectedRoute>
                    <DashboardLayout><AdminFestivalEdit /></DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/quests" element={
                  <ProtectedRoute>
                    <DashboardLayout><AdminQuests /></DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/rewards" element={
                  <ProtectedRoute>
                    <DashboardLayout><AdminRewards /></DashboardLayout>
                  </ProtectedRoute>
                } />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </EditorProvider>
      </FestivalProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
