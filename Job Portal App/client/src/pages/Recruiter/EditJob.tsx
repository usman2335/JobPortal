// EditJobPage.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { jobSchema, type JobFormData } from "@/lib/zod-schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { editJob, getJobById } from "@/services/job.service";

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      jobType: "full-time",
      salaryMin: "",
      salaryMax: "",
    },
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) {
        return;
      }
      try {
        const job = await getJobById(id);
        setValue("title", job.title);
        setValue("description", job.description);
        setValue("location", job.location);
        setValue("jobType", job.jobType);
        setValue("salaryMin", job.salaryRange.min.toString());
        setValue("salaryMax", job.salaryRange.max.toString());
      } catch (error) {
        setErrorMessage("Failed to load job");
        setErrorDialogOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, setValue]);

  const onSubmit = async (data: JobFormData) => {
    if (!id) {
      return;
    }
    try {
      await editJob(id, data);
      setSuccessDialogOpen(true);
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Failed to update job");
      setErrorDialogOpen(true);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>

      <Card className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Edit Job Details</CardTitle>
          </CardHeader>
          <CardContent className="mt-4 space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Job Title</Label>
              <Input {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Textarea rows={4} {...register("description")} />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Location</Label>
              <Input {...register("location")} />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Job Type</Label>
              <Input {...register("jobType")} />
              {errors.jobType && (
                <p className="text-red-500 text-sm">{errors.jobType.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2   ">
                <Label>Salary Min</Label>
                <Input type="number" {...register("salaryMin")} />
                {errors.salaryMin && (
                  <p className="text-red-500 text-sm">
                    {errors.salaryMin.message}
                  </p>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <Label>Salary Max</Label>
                <Input type="number" {...register("salaryMax")} />
                {errors.salaryMax && (
                  <p className="text-red-500 text-sm">
                    {errors.salaryMax.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end mt-4">
            <Button type="submit">Update Job</Button>
          </CardFooter>
        </form>
      </Card>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setErrorDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onOpenChange={(open) => {
          if (!open) navigate("/recruiter/jobs");
          setSuccessDialogOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>Job updated successfully!</DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              setSuccessDialogOpen(false);
              navigate("/recruiter/jobs");
            }}
          >
            Go Back
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
