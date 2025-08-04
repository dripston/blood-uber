import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import Login from "@/pages/login";
import DashboardPatient from "@/pages/enhanced-dashboard-patient";
import DashboardDonor from "@/pages/enhanced-dashboard-donor";
import MyDonors from "@/pages/my-donors";
import Profile from "@/pages/profile";
import ChatAI from "@/pages/chat-ai";
import Messages from "@/pages/messages";
import HealthDetailsForm from "@/pages/health-details-form";
import NotFound from "@/pages/not-found";
import LandingPage from "@/landing/App"; 
function HealthDetailsWrapper({ params }: { params: { userRole: string; userId: string } }) {
  return (
    <HealthDetailsForm 
      userRole={params.userRole as "patient" | "donor"} 
      userId={params.userId} 
      onComplete={() => {}} 
    />
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/health-details/:userRole/:userId" component={HealthDetailsWrapper} />
      <Route path="/dashboard-patient" component={DashboardPatient} />
      <Route path="/dashboard-donor" component={DashboardDonor} />
      <Route path="/my-donors" component={MyDonors} />
      <Route path="/profile" component={Profile} />
      <Route path="/chat-ai" component={ChatAI} />
      <Route path="/messages" component={Messages} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isLoginPage = location === "/" || location === "/login";
  const isHealthDetailsPage = location.startsWith("/health-details");

  return (
    <div className="min-h-screen bg-white tracking-tighter">
      {!isLoginPage && !isHealthDetailsPage && <Navigation />}
      {isLoginPage || isHealthDetailsPage ? (
        <Router />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Router />
        </main>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
