"use client";

import { useFeedStore } from "@/shared/store/feed.store";
import { useAuthStore } from "@/shared/store/auth.store";
import { PlusIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function FloatingActionButton() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const openCreatePostDialog = useFeedStore((s) => s.openCreatePostDialog);
  const handleCreatePostClick = () => {
    const isMyProfile = user && pathname === `/profile/${user.username}`;

    if (isMyProfile || pathname === "/") {
      openCreatePostDialog();
    } else {
      router.push("/");
      setTimeout(() => {
        openCreatePostDialog();
      }, 500);
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
