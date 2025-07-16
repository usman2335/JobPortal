// stores/jobStore.ts
import { getJobs } from "@/services/job.service";
import type { Job } from "@/types/job.types";
import { create } from "zustand";

interface JobStore {
  jobs: Job[];
  selectedJob: Job | null;
  loading: boolean;
  error: string | null;

  fetchJobs: () => Promise<void>;
  selectJob: (job: Job) => void;
  clearSelectedJob: () => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,

  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const jobs = await getJobs(); // should return Job[]
      set({ jobs, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch jobs", loading: false });
    }
  },

  selectJob: (job) => set({ selectedJob: job }),
  clearSelectedJob: () => set({ selectedJob: null }),
}));
