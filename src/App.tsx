import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Login, Signup, ForgotPassword } from "./pages/Auth.tsx";
import { DashboardLayout, ProtectedRoute } from "./components/dashboard/DashboardLayout.tsx";
import { DashboardHome } from "./pages/dashboard/DashboardHome.tsx";
import { NewIdea } from "./pages/dashboard/NewIdea.tsx";
import { Projects } from "./pages/dashboard/Projects.tsx";
import { ProjectDetail } from "./pages/dashboard/ProjectDetail.tsx";
import { Trash } from "./pages/dashboard/Trash.tsx";
import { Settings, Subscription, Billing, BrandingKit, AITools } from "./pages/dashboard/Misc.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner theme="dark" position="top-center" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/forgot" element={<ForgotPassword />} />

            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardHome />} />
              <Route path="new" element={<NewIdea />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="branding" element={<BrandingKit />} />
              <Route path="tools" element={<AITools />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="billing" element={<Billing />} />
              <Route path="trash" element={<Trash />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
