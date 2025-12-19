import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import TeamLeadDashboard from "./pages/TeamLeadDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";

import FieldReports from "./pages/FieldReports"; // ✅ ALREADY IMPORTED
import RegisterFacePage from "./pages/RegisterFacePage";

import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Face Registration */}
          <Route
            path="/register-face"
            element={
              <ProtectedRoute>
                <RegisterFacePage />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Team Lead Dashboard */}
          <Route
            path="/teamlead-dashboard"
            element={
              <ProtectedRoute allowedRoles={["LEADER", "ADMIN"]}>
                <TeamLeadDashboard />
              </ProtectedRoute>
            }
          />

          {/* Volunteer Dashboard */}
          <Route
            path="/volunteer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["VOLUNTEER"]}>
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ FIELD REPORTS (THIS WAS MISSING) */}
          <Route
            path="/field-reports"
            element={
              <ProtectedRoute allowedRoles={["VOLUNTEER"]}>
                <FieldReports />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
