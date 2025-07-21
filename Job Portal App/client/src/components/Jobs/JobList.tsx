import { ScrollArea } from "@/components/ui/scroll-area";
import JobCard from "./JobCard";
import { useJobStore } from "@/store/jobStore";
import type { Job } from "@/types/job.types";

type JobListProps = {
  onSelect: (job: Job) => void;
  selectedJob: Job | null;
};

export const JobList = ({ onSelect, selectedJob }: JobListProps) => {
  const { jobs, filteredJobs, filterApplied } = useJobStore();
  const jobList = filterApplied ? filteredJobs : jobs;
  console.log("FJOBS", filteredJobs.length);
  console.log("JOBLIST", jobList.length);

  return (
    <div className="h-full w-full">
      <ScrollArea className="h-[calc(100vh-200px)] p-2 rounded-md">
        {jobList.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-4">
            No jobs available according to the current filters.
          </div>
        ) : (
          <div className="space-y-1">
            {jobList.map((job) => {
              const isSelected = selectedJob?._id === job._id;
              return (
                <div
                  key={job._id}
                  className="rounded-md"
                  onClick={() => onSelect(job)}
                >
                  <JobCard job={job} isSelected={isSelected} />
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
