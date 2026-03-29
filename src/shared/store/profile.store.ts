import { ProfileTab } from "@/features/users/types";
import { create } from "zustand";

interface ProfileStore {
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  activeTab: "posted",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
