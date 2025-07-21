import { api } from "@/lib/api";
import type { JobFormData } from "@/lib/zod-schemas";
import type { Job } from "@/types/job.types";

export const createJob = async (JobPayload: JobFormData) => {
  const payload = {
    ...JobPayload,
    salaryRange: {
      min: Number(JobPayload.salaryMin),
      max: Number(JobPayload.salaryMax),
    },
  };
  const res = await api.post(`/job/create-job`, payload);
  return res.data;
};

export const getJobs = async (): Promise<Job[]> => {
  const res = await api.get<Job[]>(`/job/get-jobs`);
  console.log(res);
  return res.data;
};
export const getJobsRecruiter = async (): Promise<Job[]> => {
  const res = await api.get<Job[]>(`/job/get-jobs-recruiter`);
  console.log(res);
  return res.data;
};

export const deleteJob = async (id: string) => {
  const res = await api.delete(`/job/delete-job/${id}`);
  return res.data;
};

export const getJobById = async (id: string): Promise<Job> => {
  const res = await api.get<Job>(`/job/get-job/${id}`);
  return res.data;
};

export const editJob = async (id: string, JobPayload: JobFormData) => {
  const payload = {
    ...JobPayload,
    salaryRange: {
      min: Number(JobPayload.salaryMin),
      max: Number(JobPayload.salaryMax),
    },
  };
  await api.put(`/job/update-job/${id}`, payload);
};

export const saveJob = async (id: string) => {
  const res = await api.post(`job/${id}/save`);
  return res.data;
};

export const getSavedJobs = async (): Promise<Job[]> => {
  const res = await api.get<Job[]>(`/job/saved-jobs`);
  console.log(res);
  return res.data;
};
