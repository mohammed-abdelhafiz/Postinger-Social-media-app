import { RefObject } from "react";
import { create } from "zustand";

interface FeedStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;

  newPostInputRef: RefObject<HTMLTextAreaElement | null> | null;
  setNewPostInputRef: (
    ref: RefObject<HTMLTextAreaElement | null>
  ) => void;

  focusNewPostInputRef: () => void;
}

export const useFeedStore = create<FeedStore>((set, get) => ({
  activeTab: "for-you",
  setActiveTab: (tab) => set({ activeTab: tab }),

  newPostInputRef: null,
  setNewPostInputRef: (ref) => set({ newPostInputRef: ref }),

  focusNewPostInputRef: () => {
    const ref = get().newPostInputRef?.current;
    if (!ref) return;

    ref.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    ref.focus();
  },
}));