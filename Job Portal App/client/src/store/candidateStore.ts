import { getSavedJobs, saveJob } from "@/services/job.service";
import type { Job } from "@/types/job.types";
import { create } from "zustand";

interface CandidateStore {
  savedJobs: Job[];
  loadingSavedJobs: boolean;
  fetchSavedJobs: () => Promise<void>;
  saveJob: (jobId: string) => Promise<void>;
}

export const useCandidateStore = create<CandidateStore>((set, get) => ({
  savedJobs: [],
  loadingSavedJobs: false,
  fetchSavedJobs: async () => {
    set({ loadingSavedJobs: true });
    try {
      const jobs = await getSavedJobs();
      console.log("fetching jobs", jobs);
      set({ savedJobs: jobs });
    } catch (error) {
      console.error("Failed to get saved jobs", error);
    } finally {
      set({ loadingSavedJobs: false });
    }
  },
  saveJob: async (jobId: string) => {
    try {
      const res: any = await saveJob(jobId);
      console.log(res.data);
      const { savedJobs } = get();
      const alreadySaved = savedJobs.find((job) => job._id === res.data._id);
      if (!alreadySaved) {
        set({ savedJobs: [...savedJobs, res.data] });
      }
    } catch (error) {
      console.error("Error saving job", error);
    }
  },
}));
