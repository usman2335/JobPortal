import { fetchCountries } from "@/lib/fetch-nationalities";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "candidate" | "recruiter" | "admin";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // name of storage key (local storage)
    }
  )
);

interface CountryState {
  countries: string[];
  fetchCountries: () => Promise<void>;
}

export const useCountryStore = create<CountryState>((set) => ({
  countries: [],
  fetchCountries: async () => {
    const data = await fetchCountries();
    set({ countries: data });
  },
}));
