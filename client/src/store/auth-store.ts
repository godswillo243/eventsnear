import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export type AuthState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: {
    id: string;
    name: string;
    email: string;
    firebaseUid: string;
    photoURL?: string;
    emailVerified: boolean;
  } | null;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        user: null,
      }),
      {
        name: "auth-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
