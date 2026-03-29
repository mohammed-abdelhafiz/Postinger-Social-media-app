"use client";

import { useFeedStore } from "@/shared/store/feed.store";
import { PlusIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function FloatingActionButton() {
  const router = useRouter();
  const pathname = usePathname();
  const openCreatePostDialog = useFeedStore((s) => s.openCreatePostDialog);
  const handleCreatePostClick = () => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        openCreatePostDialog();
      }, 500);
    } else {
      openCreatePostDialog();
    }
  };
  return (
    <button
      className="rounded-full w-12 h-12 font-extrabold bg-primary flex items-center justify-center text-primary-foreground cursor-pointer hover:bg-primary/90 fixed bottom-4 right-4 z-50"
      onClick={handleCreatePostClick}
    >
      <PlusIcon />
    </button>
  );
}
