import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteJob, getJobsRecruiter } from "@/services/job.service";
import { DeleteJobButton } from "@/components/Buttons/DeleteJobButton";
import { Badge } from "@/components/ui/badge";

type Job = {
  _id: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  salaryRange: {
    min: number;
    max: number;
  };
};

export default function ManageJob() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getJobsRecruiter();
      console.log("jobs:", res);
      setJobs(res);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Failed to delete job", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Jobs</h1>
        <Button onClick={() => navigate("/recruiter/create-job")}>
          <Plus className=" h-4 w-4" />
          Add Job
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Listings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-muted-foreground">No jobs found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job._id}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell className=" max-w-[250px] truncate">
                      {job.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{job.jobType}</Badge>
                    </TableCell>
                    <TableCell>
                      PKR {job.salaryRange.min} - PKR {job.salaryRange.max}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(`/recruiter/edit-job/${job._id}`)
                        }
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {/* <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(job._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button> */}
                      <DeleteJobButton
                        jobId={job._id}
                        onDelete={handleDelete}
                      ></DeleteJobButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
