import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import EvaluatorSelection from "./pages/EvaluatorSelection";
import DataFetching from "./pages/DataFetching";
import DataFetchingWithHeader from "./pages/DataFetchingWithHeader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/evaluator-selection" element={<EvaluatorSelection />} />
          <Route path="/data-fetching" element={<DataFetchingWithHeader />} />
          <Route path="/history" element={<PlaceholderPage title="History" />} />
          <Route path="/starred" element={<PlaceholderPage title="Starred" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
