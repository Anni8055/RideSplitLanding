import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import AuthPage from "./pages/auth-page";
import DashboardPage from "./pages/dashboard-page";
import HelpPage from "./pages/help-page";
import ThreeDStory from "./pages/3d-story.jsx";
import ThreeDExperience from "./pages/3d-experience";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/help" component={HelpPage} />
      <Route path="/3d-story" component={ThreeDStory} />
      <Route path="/3d-experience" component={ThreeDExperience} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
