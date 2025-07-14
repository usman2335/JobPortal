import { api } from "@/lib/api";
import type { CandidateRegistrationFormData } from "@/lib/zod-schemas";

export const checkCandidate = async (
  candidateId: string
): Promise<{ exists: boolean }> => {
  const res = await api.post<{ exists: boolean }>(
    `/candidate/check-candidate/${candidateId}`
  );
  return res.data;
};

export const createCandidate = async (data: CandidateRegistrationFormData) => {
  //   const payload = {};
  const res = await api.post(`/candidate/create-candidate`, data);
  return res.data;
};
