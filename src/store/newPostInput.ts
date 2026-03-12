import { create } from "zustand";

interface NewPostInputStore {
  textareaRef: React.RefObject<HTMLTextAreaElement | null> | null;
  setTextareaRef: (
    ref: React.RefObject<HTMLTextAreaElement | null> | null,
  ) => void;
  focus: () => void;
}

export const useNewPostInputStore = create<NewPostInputStore>((set) => ({
  textareaRef: null,
  setTextareaRef: (ref) => set({ textareaRef: ref }),
  focus: () => {
    useNewPostInputStore.getState().textareaRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    useNewPostInputStore.getState().textareaRef?.current?.focus();
  },
}));
