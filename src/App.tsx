import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppWidget } from "@/components/property/WhatsAppWidget";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Experiences from "./pages/Packages";
import { Blog, BlogPost } from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/"                element={<Index />} />
          <Route path="/listings"        element={<Listings />} />
          <Route path="/property/:slug"  element={<PropertyDetail />} />
          <Route path="/about"           element={<About />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/experiences"     element={<Experiences />} />
          <Route path="/packages"        element={<Experiences />} />
          <Route path="/blog"            element={<Blog />} />
          <Route path="/blog/:slug"      element={<BlogPost />} />
          <Route path="/journal"         element={<Blog />} />
          <Route path="/journal/:slug"   element={<BlogPost />} />
          <Route path="*"               element={<NotFound />} />
        </Routes>
        <WhatsAppWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
