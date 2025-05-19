
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import OurPillarsPage from "@/pages/OurPillarsPage";
import AboutUsPage from "@/pages/AboutUsPage";
import ApproachPage from "@/pages/ApproachPage";
import LaunchPage from "@/pages/LaunchPage";
import JoinUsPage from "@/pages/JoinUsPage";
import SupportUsPage from "@/pages/SupportUsPage";
import NotFoundPage from "@/pages/NotFoundPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/our-pillars" element={<OurPillarsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/approach" element={<ApproachPage />} />
              <Route path="/launch" element={<LaunchPage />} />
              <Route path="/join-us" element={<JoinUsPage />} />
              <Route path="/support-us" element={<SupportUsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
