import { create } from "zustand";
import { persist } from "zustand/middleware";

type Tab = "Home" | "Archived";

interface SidebarStore {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      activeTab: "Home",
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "sidebar",
      partialize: (s) => ({ activeTab: s.activeTab }),
    },
  ),
);
