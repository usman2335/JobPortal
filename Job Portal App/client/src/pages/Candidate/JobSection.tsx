import { FilterList } from "@/components/Jobs/FilterList";
import JobDetails from "@/components/Jobs/JobDetails";
import { JobList } from "@/components/Jobs/JobList";
import { useJobStore } from "@/store/jobStore";
import { useEffect } from "react";

const onFilterChange = () => {};
const JobSection = () => {
  const { fetchJobs, selectJob, selectedJob } = useJobStore();

  useEffect(() => {
    fetchJobs(); // Only fetch once on mount
  }, [fetchJobs]);

  return (
    <div className="flex gap-5 align-center w-full px-10">
      <div className="w-1/4">
        <FilterList onFilterChange={onFilterChange} />
      </div>
      <div className="w-full flex bg-accent ">
        <div className="w-2/4">
          <JobList onSelect={selectJob} selectedJob={selectedJob}></JobList>
        </div>
        <div className="w-full">
          <JobDetails></JobDetails>
        </div>
      </div>
    </div>
  );
};

export default JobSection;
