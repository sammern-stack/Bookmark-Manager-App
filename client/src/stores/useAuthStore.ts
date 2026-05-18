import { create } from "zustand";
import { signupUser, loginUser, logoutUser } from "../api/auth";
import type { User, NewUser, ApiResponse } from "../types";

interface AuthTypes {
  user: User | null;
  login: (data: User) => Promise<ApiResponse<User>>;
  logout: () => Promise<void>;
  signup: (data: NewUser) => Promise<ApiResponse<NewUser>>;
}

export const useAuthStore = create<AuthTypes>((set) => ({
  user: null,

  login: async (data) => {
    const res = await loginUser(data);
    if (res.ok) set({ user: res.data });
    return res;
  },

  logout: async () => {
    await logoutUser();
    set({ user: null });
  },

  signup: async (data) => {
    const res = await signupUser(data);
    if (res.ok) set({ user: res.data });
    return res;
  },
}));
