import { api } from "@/lib/api";
import type {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
} from "@/types/auth.types";

export const registerUser = async (
  data: RegisterPayload
): Promise<RegisterResponse> => {
  const payload = {
    fullName: data.fullName,
    email: data.email,
    password: data.password,
    role: data.role,
  };
  try {
    const res = await api.post<RegisterResponse>("/user/register", payload);
    console.log("Registration response:", res.data);
    return res.data;
  } catch (err: any) {
    console.log("error on api call", err.response?.data.message);
    throw err; // ✅ Must rethrow so frontend catches it
  }
};

export const loginUser = async (data: LoginPayload) => {
  const payload = {
    email: data.email,
    password: data.password,
  };
  const res = await api.post<LoginResponse>("/user/login", payload);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/user/logout");
  return res.data;
};
