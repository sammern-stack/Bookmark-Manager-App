import { create } from "zustand";
import { setAccessToken } from "../api/utils";
import { signupUser, loginUser, logoutUser, refreshJWT } from "../api/auth";
import type { User, NewUser, ApiResponse, ResponseUser } from "../types";

interface AuthTypes {
  user: ResponseUser | null;
  isLoading: boolean;
  login: (data: User) => Promise<ApiResponse<ResponseUser>>;
  logout: () => Promise<void>;
  signup: (data: NewUser) => Promise<ApiResponse<ResponseUser>>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthTypes>((set) => ({
  user: null,
  isLoading: true,

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

  checkAuth: async () => {
    const publicRoutes = [
      "/forgot-password",
      "/reset-password",
      "/login",
      "/register",
    ];

    if (publicRoutes.includes(window.location.pathname)) {
      set({ isLoading: false });
      return;
    }

    const res = await refreshJWT();
    if (res.ok) {
      setAccessToken(res.data.accessToken);
      set({ user: res.data.user });
    }
    set({ isLoading: false });
  },
}));
