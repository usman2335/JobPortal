import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { Job } from "@/types/job.types";

type JobCardProps = {
  job: Job;
  isSelected?: boolean;
};

const JobCard = ({ job, isSelected }: JobCardProps) => {
  return (
    <Card
      className={`flex gap-5 p-2 font-medium text-sm rounded-md cursor-pointer transition-colors ${
        isSelected
          ? "border-l-10 border-primary border-r-0 border-t-0 border-b-0 "
          : "hover:bg-secondary"
      }`}
    >
      <CardContent className="flex gap-5 text-sm">
        <div className="mt-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Company Name</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <div>
            <h1 className="text-lg font-semibold text-foreground line-clamp-1">
              {job.title}
            </h1>
            <p className="text-sm text-muted-foreground">Company Name</p>
          </div>
          <div className="flex flex-col text-muted-foreground">
            <span>{job.location}</span>
            <div className="flex justify-between">
              <span>
                {job.salaryRange.min.toLocaleString()} -{" "}
                {job.salaryRange.max.toLocaleString()} PKR
              </span>
              <span className="whitespace-nowrap">
                Deadline: {job.deadline}
              </span>
            </div>
            <span className="whitespace-nowrap capitalize">{job.jobType}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
