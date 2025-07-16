// src/layouts/RecruiterLayout.tsx
import { AppSidebar } from "@/components/Layout/app-sidebar";
import { RecruiterHeader } from "@/components/Layout/RecruiterHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

export default function RecruiterLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <main className="py-4 w-full">
          <RecruiterHeader title="Recruiter Panel" />

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-4"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </SidebarProvider>
  );
}
