// PostJobPage.tsx (Refactored with Zod + RHF error handling)

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Briefcase,
  Clock,
  User,
  Laptop,
  Globe,
  Building,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { jobSchema, type JobFormData, type JobType } from "@/lib/zod-schemas";
import { useCountryStore } from "@/store/authStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createJob } from "@/services/job.service";
import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "@/components/Navigation/Breadcrumb";

const steps = ["Job Details", "Review & Submit"];

const jobTypes = [
  { label: "Full-time", value: "full-time", icon: Briefcase },
  { label: "Part-time", value: "part-time", icon: Clock },
  { label: "Contract", value: "contract", icon: User },
  { label: "Internship", value: "internship", icon: Laptop },
  { label: "Remote", value: "remote", icon: Globe },
];
const workLocation = [
  { label: "On-site", value: "on-site", icon: Building },
  { label: "Hybrid", value: "hybrid", icon: Home },
  { label: "Remote", value: "remote", icon: User },
];

export default function PostJobPage() {
  const [step, setStep] = useState(0);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [successDialog, setSuccessDialog] = useState(false);

  const countries = useCountryStore((state) => state.countries);
  const fetchCountries = useCountryStore((state) => state.fetchCountries);

  const navigate = useNavigate();
  useEffect(() => {
    if (countries.length == 0) {
      fetchCountries();
    }
  }, [countries, fetchCountries]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      jobType: "full-time",
      salaryMin: "",
      salaryMax: "",
      deadline: "",
      workLocation: "on-site",
    },
  });

  const formValues = watch();
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const [validating, setValidating] = useState(false);

  const onNext = async () => {
    setValidating(true);
    const isValid = await trigger([
      "title",
      "description",
      "location",
      "jobType",
      "salaryMin",
      "salaryMax",
      "deadline",
      "workLocation",
    ]);
    setValidating(false);

    if (isValid) {
      setStep((prev) => prev + 1);
      setCompletedSteps((prev) => [...new Set([...prev, step])]);
    }
  };

  const onSubmit = async (data: JobFormData) => {
    try {
      await createJob(data);
      setSuccessDialog(true);
      setTimeout(() => navigate("/recruiter"), 2000);
    } catch (error: any) {
      setErrorMessage(error?.message || "Something went wrong");
      setErrorDialogOpen(true);
    }
  };

  return (
    <div className="flex min-h-[80vh]">
      <div className="w-60 border-r p-6 space-y-2">
        {steps.map((label, index) => {
          const isActive = index === step;
          const isCompleted = completedSteps.includes(index);

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition text-sm",
                isActive
                  ? "bg-primary text-white font-medium"
                  : isCompleted
                  ? "bg-green-100 text-green-700"
                  : "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow",
                  isActive
                    ? "bg-white text-primary"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      <div className="flex-1 flex-col flex justify-center items-start p-10 py-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-6">
          Post a Job
        </h1>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{steps[step]}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {step === 0 && (
              <>
                <Label className="text-muted-foreground">
                  Basic Information
                </Label>
                <Input placeholder="Job Title" {...register("title")} />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}

                <Textarea
                  placeholder="Job Description"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}

                <Select
                  onValueChange={(value) => setValue("location", value)}
                  value={watch("location")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Country</SelectLabel>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.location && (
                  <p className="text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Employment Type
                  </Label>
                  <div className="flex gap-5 flex-wrap">
                    {jobTypes.map(({ label, value, icon: Icon }) => (
                      <Button
                        key={value}
                        variant={
                          formValues.jobType === value ? "default" : "outline"
                        }
                        onClick={() => setValue("jobType", value as JobType)}
                        className="justify-start gap-2 px-3 py-3 h-12 w-full max-w-[150px] text-sm"
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Work Location
                  </Label>
                  <div className="flex gap-5 flex-wrap">
                    {workLocation.map(({ label, value, icon: Icon }) => (
                      <Button
                        key={value}
                        variant={
                          formValues.workLocation === value
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setValue(
                            "workLocation",
                            value as "remote" | "hybrid" | "on-site"
                          )
                        }
                        className="justify-start gap-2 px-3 py-3 h-12 w-full max-w-[150px] text-sm"
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <Label className="text-muted-foreground">Salary Range</Label>
                <Input
                  placeholder="Minimum Salary"
                  type="number"
                  {...register("salaryMin")}
                />
                {errors.salaryMin && (
                  <p className="text-sm text-red-500">
                    {errors.salaryMin.message}
                  </p>
                )}

                <Input
                  placeholder="Maximum Salary"
                  type="number"
                  {...register("salaryMax")}
                />
                {errors.salaryMax && (
                  <p className="text-sm text-red-500">
                    {errors.salaryMax.message}
                  </p>
                )}
                <Label className="text-muted-foreground">
                  Application Deadline
                </Label>
                <Input type="date" {...register("deadline")} />
                {errors.deadline && (
                  <p className="text-sm text-red-500">
                    {errors.deadline.message}
                  </p>
                )}
              </>
            )}

            {step === 1 && (
              <div className="text-sm space-y-2">
                <p>
                  <strong>Title:</strong> {formValues.title}
                </p>
                <p>
                  <strong>Description:</strong> {formValues.description}
                </p>
                <p>
                  <strong>Location:</strong> {formValues.location}
                </p>
                <p>
                  <strong>Job Type:</strong> {formValues.jobType}
                </p>
                <p>
                  <strong>Salary:</strong> {formValues.salaryMin} -{" "}
                  {formValues.salaryMax}
                </p>
                <p>
                  <strong>Deadline:</strong> {formValues.deadline}
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {step > 0 && (
              <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button onClick={onNext} disabled={validating}>
                {validating ? "Validating..." : "Next"}
              </Button>
            ) : (
              <Button onClick={handleSubmit(onSubmit)}>Post Job</Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submission Failed</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setErrorDialogOpen(false)}>Try Again</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={successDialog} onOpenChange={setSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Job Posted!</DialogTitle>
            <DialogDescription>
              Your job has been successfully added.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setSuccessDialog(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
