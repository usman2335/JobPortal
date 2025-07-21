// src/layouts/RecruiterLayout.tsx
import { CandidateHeader } from "@/components/Layout/CandidateHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Toaster } from "sonner";

export default function RecruiterLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <main className="py-4 w-full">
          <CandidateHeader title="Candidate Panel" />

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              //   className="p-4"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Toaster></Toaster>
      </div>
    </SidebarProvider>
  );
}
