export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  jobType: "full-time" | "part-time" | "contract" | "internship" | "remote";
  salaryRange: {
    min: number;
    max: number;
  };
  recruiterId: string;
  deadline: string;
  workLocation: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
