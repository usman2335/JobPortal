export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  reEnterPassword: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    role: "candidate" | "recruiter" | "admin"; // adjust if needed
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    role: "candidate" | "recruiter" | "admin"; // adjust if needed
  };
}
