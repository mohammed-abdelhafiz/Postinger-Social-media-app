import { create } from "zustand";

interface FeedStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;

  isCreatePostDialogOpen: boolean;
  openCreatePostDialog: () => void;
  closeCreatePostDialog: () => void;
}

export const useFeedStore = create<FeedStore>((set) => ({
  activeTab: "for-you",
  setActiveTab: (tab) => set({ activeTab: tab }),

  isCreatePostDialogOpen: false,
  openCreatePostDialog: () => set({ isCreatePostDialogOpen: true }),
  closeCreatePostDialog: () => set({ isCreatePostDialogOpen: false }),
}));