import { useEffect } from "react";
import { useAuthStore, useThemeStore } from "../stores";
import { useBookmarkStore } from "../features/bookmarks";

export const useApp = () => {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const user = useAuthStore((s) => s.user);
  const theme = useThemeStore((s) => s.theme);
  const setBookmarks = useBookmarkStore((s) => s.setBookmarks);

  // Log in user on refresh
  useEffect(() => {
    checkAuth();
  }, []);

  // Set theme from localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (user) setBookmarks();
  }, [user]);
};
