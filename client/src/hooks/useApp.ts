import { useEffect } from "react";
import { useAuthStore, useThemeStore } from "../stores";

export const useApp = () => {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const theme = useThemeStore((s) => s.theme);

  // Log in user on refresh
  useEffect(() => {
    checkAuth();
  }, []);

  // Set theme from localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
};
