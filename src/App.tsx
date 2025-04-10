
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Attendance from "./pages/Attendance";
import Timetable from "./pages/Timetable";
import StudyMaterial from "./pages/StudyMaterial";
import Assignments from "./pages/Assignments";
import InternalMarks from "./pages/InternalMarks";
import LeaveRequest from "./pages/LeaveRequest";
import Messaging from "./pages/Messaging";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/study-material" element={<StudyMaterial />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/internal-marks" element={<InternalMarks />} />
          <Route path="/leave-requests" element={<LeaveRequest />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
