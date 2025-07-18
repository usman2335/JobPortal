import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useJobStore } from "@/store/jobStore";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";

const JobDetails = () => {
  const selectedJob = useJobStore((state) => state.selectedJob);
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionParagraphs =
    selectedJob?.description?.split("\n").filter((p) => p.trim() !== "") ?? [];

  const descriptionParagraphsLength = descriptionParagraphs.length;

  if (!selectedJob) return null;

  return (
    <Card className="w-full mt-2">
      <CardHeader>
        <CardTitle className="text-lg">Job Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 font-medium text-sm">
        {/* Header section */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="w-8 h-8">
              <AvatarImage src={"https://github.com/shadcn.png"} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-lg">Company Name</span>
              <span className="text-muted-foreground">Rating</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="rounded-sm ">Apply Now</Button>
            <Button className=" rounded-sm bg-secondary text-secondary-foreground hover:bg-background">
              Save
              <Bookmark />
            </Button>
          </div>
        </div>

        {/* Overview section */}
        <div className="w-full rounded bg-muted px-2 py-1 font-semibold">
          Overview
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
          <p className="text-muted-foreground">Role:</p>
          <p>{selectedJob.title}</p>

          <p className="text-muted-foreground">Location:</p>
          <p>{selectedJob.location}</p>

          <p className="text-muted-foreground">Salary Range:</p>
          <p>
            PKR {selectedJob.salaryRange.min} - {selectedJob.salaryRange.max}
          </p>

          <p className="text-muted-foreground">Deadline:</p>
          <p>{selectedJob.deadline}</p>
          <p className="text-muted-foreground">Job Type:</p>
          <span className="capitalize">{selectedJob.jobType}</span>
          <p className="text-muted-foreground">Work Location:</p>
          <span className="capitalize">{selectedJob.workLocation}</span>
        </div>

        {/* Description section */}
        <div className="w-full rounded bg-muted px-2 py-1 font-semibold">
          Position Description
        </div>
        <div className="text-foreground text-sm font-normal">
          {(isExpanded
            ? descriptionParagraphs
            : descriptionParagraphs.slice(0, 2)
          ).map((para, i) => (
            <p key={i} className="mb-2">
              {para}
            </p>
          ))}

          {descriptionParagraphsLength > 2 && (
            <Button
              variant="link"
              className="mt-2 px-0 text-blue-600 hover:underline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "See Less" : "See More"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDetails;
