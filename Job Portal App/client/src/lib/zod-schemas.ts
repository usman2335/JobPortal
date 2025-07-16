import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    reEnterPassword: z.string(),
    role: z.string().min(1, "Role is required"),
  })
  .refine((data) => data.password === data.reEnterPassword, {
    path: ["reEnterPassword"],
    message: "Passwords must match",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const candidateRegistrationSchema = z.object({
  phone: z
    .string()
    .min(1)
    .max(15, "Phone number must be between 1 and 15 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(200, "Address is too long"),
  dateOfBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  country: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  education: z.array(
    z.object({
      degree: z.string().min(1, "Degree is required"),
      institution: z.string().min(1, "Institution is required"),
      year: z
        .number()
        .min(1900, "Invalid year")
        .max(new Date().getFullYear(), "Year cannot be in the future"),
    })
  ),
  experience: z
    .array(
      z.object({
        company: z.string().optional(),
        role: z.string().optional(),
        years: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  resumeUrl: z.string().url("Invalid resume URL").optional(),

  profileSummary: z.string().max(1000, "Summary too long").optional(),
  skills: z.array(z.string()).optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),

  github: z.string().url("Invalid GitHub URL").optional(),

  portfolio: z.string().url("Invalid Portfolio URL").optional(),
});
export type CandidateRegistrationFormData = z.infer<
  typeof candidateRegistrationSchema
>;

export const jobSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  location: z.string().min(2, "Location is required"),
  //   requirements: z.string().min
  jobType: z.enum([
    "full-time",
    "part-time",
    "contract",
    "internship",
    "remote",
  ]),
  workLocation: z.enum(["on-site", "hybrid", "remote"]),
  salaryMin: z.string().min(1, "Required"),
  salaryMax: z.string().min(1, "Required"),
  deadline: z.string(),
});
export type JobType = z.infer<typeof jobSchema>["jobType"];

export type JobFormData = z.infer<typeof jobSchema>;
