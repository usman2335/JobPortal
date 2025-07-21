// stores/jobStore.ts
import { getJobs } from "@/services/job.service";
import type { Job } from "@/types/job.types";
import { create } from "zustand";

type FilterParams = {
  jobType?: string[];
  workLocation?: string[];
  location?: string;
  salaryRange?: {
    min: number;
    max: number;
  };
};

interface JobStore {
  jobs: Job[];
  selectedJob: Job | null;
  loading: boolean;
  error: string | null;
  filteredJobs: Job[];
  filterApplied: boolean;
  fetchJobs: () => Promise<void>;
  selectJob: (job: Job) => void;
  clearSelectedJob: () => void;
  applyFilters: (filters: FilterParams) => void;
  resetFilters: () => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
  filteredJobs: [],
  filterApplied: false,

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
  applyFilters: (filters: FilterParams) => {
    const { jobType, workLocation, location, salaryRange } = filters;
    set((state) => {
      const filtered = state.jobs.filter((job) => {
        const matchJobType =
          !jobType || jobType.length === 0 || jobType.includes(job.jobType);

        const matchLocation =
          !location ||
          job.location.toLowerCase().includes(location.toLowerCase());

        const matchWorkLocation =
          !workLocation ||
          workLocation.length === 0 ||
          workLocation.includes(job.workLocation);

        const matchSalary =
          !salaryRange?.min || // no minimum specified
          (job.salaryRange?.min && job.salaryRange.min >= salaryRange.min);

        return (
          matchJobType && matchLocation && matchWorkLocation && matchSalary
        );
      });

      return { filteredJobs: filtered, filterApplied: true };
    });
  },
  resetFilters: () =>
    set((state) => ({
      filters: {
        jobType: [],
        workLocation: [],
        experienceLevel: [],
        salaryRange: { min: null, max: null },
      },
      filterApplied: false,
      filteredJobs: [],
    })),
}));
