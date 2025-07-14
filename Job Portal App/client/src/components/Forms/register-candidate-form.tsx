import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Calendar22 from "../calendar-22";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { fetchCountries } from "@/lib/fetch-nationalities";
import { StepIndicator } from "../ui/step-indicator";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  candidateRegistrationSchema,
  type CandidateRegistrationFormData,
} from "@/lib/zod-schemas";
import { Trash } from "lucide-react";
import { SkillsInput } from "./skills-input";
import { createCandidate } from "@/services/candidate.service";
import { useNavigate } from "react-router-dom";
import { useCountryStore } from "@/store/authStore";

// ...imports remain the same

export function RegisterCandidateForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    // getValues,
  } = useForm<CandidateRegistrationFormData>({
    resolver: zodResolver(candidateRegistrationSchema),
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //   const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [skillsList, setSkillsList] = useState<string[]>([]);

  const [reviewOpen, setReviewOpen] = useState(false);

  const navigate = useNavigate();

  const steps = ["Personal Info", "Education & Experience", "Resume & Links"];
  const [currentStep, setCurrentStep] = useState(0);

  const onSubmit = async (data: CandidateRegistrationFormData) => {
    try {
      await createCandidate(data);
      setSuccessOpen(true);
      setErrorOpen(false);
      //   console.log(res);
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || "Something went wrong");
      setErrorOpen(true);
    }
  };

  const countries = useCountryStore((state) => state.countries);
  const fetchCountries = useCountryStore((state) => state.fetchCountries);
  useEffect(() => {
    if (countries.length == 0) {
      fetchCountries();
    }
  }, [countries, fetchCountries]);
  console.log("countries are:", countries);

  useEffect(() => {
    console.log(reviewOpen);
  }, [reviewOpen]);

  const onNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const onBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className={cn("flex flex-col gap-6 w-1/2", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="">
          <StepIndicator steps={steps} currentStep={currentStep} />

          {currentStep === 0 && (
            <>
              <CardHeader className="text-left">
                <CardTitle className="text-xl">Basic Information</CardTitle>
                <CardDescription>
                  Provide additional details to help employers know you better.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <form> */}
                <div className="grid gap-6">
                  <div className="flex items-center justify-between gap-10 w-full">
                    <div className="grid gap-3 w-full">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        onValueChange={(value) => setValue("country", value)}
                        value={watch("country")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your country" />
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
                      {errors.country && (
                        <p className="text-sm text-red-500">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-3 w-full">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        onValueChange={(value) =>
                          setValue(
                            "gender",
                            value as "Male" | "Female" | "Other"
                          )
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.gender && (
                        <p className="text-sm text-red-500">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="123-456-7890"
                      {...register("phone")}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="123 Main St"
                      {...register("address")}
                    />
                  </div>
                  <div className="grid gap-3 w-full">
                    <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                    <Calendar22
                      selected={
                        watch("dateOfBirth")
                          ? new Date(watch("dateOfBirth"))
                          : undefined
                      }
                      onChange={(date) => {
                        if (date) {
                          setValue("dateOfBirth", date.toISOString());
                        } else {
                          setValue("dateOfBirth", ""); // or undefined/null depending on your schema
                        }
                      }}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-sm text-red-500">
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex justify-end">
                    <Button type="button" onClick={onNext}>
                      Next →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle>Education & Experience</CardTitle>
                <CardDescription>
                  Add your academic background and professional experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Education Section */}
                <div className="mb-6">
                  <div className="w-full flex items-center justify-between mb-3 ">
                    <h3 className="text-md font-semibold mb-2">Education</h3>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() =>
                        appendEducation({
                          degree: "",
                          institution: "",
                          year: new Date().getFullYear(),
                        })
                      }
                    >
                      + Add Education
                    </Button>
                  </div>

                  {educationFields.length === 0 && (
                    <p className="text-sm text-muted-foreground mb-4">
                      No education entries yet. Add one to begin.
                    </p>
                  )}

                  {educationFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid gap-4 mb-4 border p-4 rounded-md relative"
                    >
                      {/* Degree */}
                      <div className="grid gap-2">
                        <Label>Degree</Label>
                        <Input
                          {...register(`education.${index}.degree`)}
                          placeholder="e.g. BSc Computer Science"
                        />
                      </div>

                      {/* Institution */}
                      <div className="grid gap-2">
                        <Label>Institution</Label>
                        <Input
                          {...register(`education.${index}.institution`)}
                          placeholder="e.g. FAST"
                        />
                      </div>

                      {/* Year */}
                      <div className="grid gap-2">
                        <Label>Year</Label>
                        <Input
                          //   type="number"
                          {...register(`education.${index}.year`)}
                          placeholder="e.g. 2023"
                        />
                      </div>

                      {/* 🗑️ Remove */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEducation(index)}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  {/* Add Education */}
                </div>

                {/* Experience Section */}
                <div>
                  <div className="w-full flex items-center justify-between mb-3 ">
                    <h3 className="text-md font-semibold mb-2">Experience</h3>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() =>
                        appendExperience({
                          company: "",
                          role: "",
                          years: "0",
                          description: "",
                        })
                      }
                    >
                      + Add Experience
                    </Button>
                  </div>
                  {experienceFields.length === 0 && (
                    <p className="text-sm text-muted-foreground mb-4">
                      No experience entries yet. Add one to begin.
                    </p>
                  )}

                  {experienceFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid gap-4 mb-4 border p-4 rounded-md relative"
                    >
                      {/* Company */}
                      <div className="grid gap-2">
                        <Label>Company</Label>
                        <Input
                          {...register(`experience.${index}.company`)}
                          placeholder="e.g. Google"
                        />
                      </div>

                      {/* Role */}
                      <div className="grid gap-2">
                        <Label>Role</Label>
                        <Input
                          {...register(`experience.${index}.role`)}
                          placeholder="e.g. Frontend Developer"
                        />
                      </div>

                      {/* Years */}
                      <div className="grid gap-2">
                        <Label>Years</Label>
                        <Input
                          //   type="number"
                          {...register(`experience.${index}.years`)}
                          placeholder="e.g. 2"
                        />
                      </div>

                      {/* Description */}
                      <div className="grid gap-2">
                        <Label>Description</Label>
                        <Input
                          {...register(`experience.${index}.description`)}
                          placeholder="Describe your role (optional)"
                        />
                      </div>

                      {/* 🗑️ Delete Button */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExperience(index)}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" type="button" onClick={onBack}>
                    ← Back
                  </Button>
                  <Button type="button" onClick={onNext}>
                    Next →
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle>Resume & Links</CardTitle>
                <CardDescription>
                  Upload your resume and add your online profiles and skills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {/* Resume URL or Upload */}
                  <div className="grid gap-2">
                    <Label htmlFor="resumeUrl">Resume URL</Label>
                    <Input
                      id="resumeUrl"
                      type="url"
                      placeholder="https://drive.google.com/file..."
                      {...register("resumeUrl")}
                    />
                    {errors.resumeUrl && (
                      <p className="text-sm text-red-500">
                        {errors.resumeUrl.message}
                      </p>
                    )}
                  </div>

                  {/* Profile Summary */}
                  <div className="grid gap-2">
                    <Label htmlFor="profileSummary">Profile Summary</Label>
                    <textarea
                      id="profileSummary"
                      {...register("profileSummary")}
                      placeholder="Tell us about yourself (optional)"
                      className="w-full border rounded-md p-2 text-sm resize-none min-h-[80px]"
                    />
                    {errors.profileSummary && (
                      <p className="text-sm text-red-500">
                        {errors.profileSummary.message}
                      </p>
                    )}
                  </div>

                  {/* Skills Input */}
                  <div className="grid gap-2">
                    <Label htmlFor="skills">Skills</Label>
                    <SkillsInput
                      skills={skillsList}
                      onChange={(newSkills) => {
                        setSkillsList(newSkills);
                        setValue("skills", newSkills); // update react-hook-form field
                      }}
                    />
                    {errors.skills && (
                      <p className="text-sm text-red-500">Enter valid skills</p>
                    )}
                  </div>

                  {/* Links Section */}
                  <div className="grid gap-3">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile"
                      {...register("linkedin")}
                    />
                    {errors.linkedin && (
                      <p className="text-sm text-red-500">
                        {errors.linkedin.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      type="url"
                      placeholder="https://github.com/username"
                      {...register("github")}
                    />
                    {errors.github && (
                      <p className="text-sm text-red-500">
                        {errors.github.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="portfolio">Portfolio</Label>
                    <Input
                      id="portfolio"
                      type="url"
                      placeholder="https://yourportfolio.com"
                      {...register("portfolio")}
                    />
                    {errors.portfolio && (
                      <p className="text-sm text-red-500">
                        {errors.portfolio.message}
                      </p>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" type="button" onClick={onBack}>
                      ← Back
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={() => {
                          setReviewOpen(true);
                        }}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>

        {/* Success & Error Dialogs */}
        <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registration Successful</DialogTitle>
              <DialogDescription>
                Your candidate profile was submitted successfully.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => {
                setSuccessOpen(false);
                navigate("/candidate/dashboard");
              }}
            >
              Continue
            </Button>
          </DialogContent>
        </Dialog>
        <Dialog open={errorOpen} onOpenChange={setErrorOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submission Failed</DialogTitle>
              <DialogDescription>{errorMessage}</DialogDescription>
            </DialogHeader>
            <Button onClick={() => setErrorOpen(false)}>Try Again</Button>
          </DialogContent>
        </Dialog>

        <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Review Your Information</DialogTitle>
              <DialogDescription>
                Please double-check all fields before submitting.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 max-h-[60vh] overflow-y-auto">
              <div>
                <h3 className="font-semibold mb-1">Personal Info</h3>
                <p>
                  <strong>Phone:</strong> {watch("phone")}
                </p>
                <p>
                  <strong>Address:</strong> {watch("address")}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {watch("dateOfBirth")}
                </p>
                <p>
                  <strong>Country:</strong> {watch("country")}
                </p>
                <p>
                  <strong>Gender:</strong> {watch("gender")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Education</h3>
                {watch("education")?.map((edu, idx) => (
                  <div key={idx} className="mb-2">
                    <p>
                      {edu.degree} at {edu.institution} ({edu.year})
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-1">Experience</h3>
                {watch("experience")?.map((exp, idx) => (
                  <div key={idx} className="mb-2">
                    <p>
                      <strong>{exp.role}</strong> at {exp.company} ({exp.years}{" "}
                      yrs)
                    </p>
                    {exp.description && (
                      <p className="text-sm text-muted-foreground">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-1">Resume & Links</h3>
                {watch("resumeUrl") && (
                  <p>
                    <strong>Resume:</strong>{" "}
                    <a
                      href={watch("resumeUrl")}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Resume
                    </a>
                  </p>
                )}
                <p>
                  <strong>LinkedIn:</strong> {watch("linkedin")}
                </p>
                <p>
                  <strong>GitHub:</strong> {watch("github")}
                </p>
                <p>
                  <strong>Portfolio:</strong> {watch("portfolio")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {watch("skills")?.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setReviewOpen(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </form>
      <Button onClick={handleSubmit(onSubmit)} type="button">
        🔥 Test Submit Button
      </Button>
    </div>
  );
}
