import { Feed } from "@/features/feed/components/Feed";
import { SuggestionsCard } from "@/features/users/components/SuggestionsCard";
import { UserCard } from "@/features/users/components/UserCard";
import type { Metadata } from "next";

export default function HomePage() {
  return (
    <div className="flex gap-4 h-full">
      <aside className="w-72 hidden lg:block">
        <UserCard />
      </aside>
      <Feed />
      <aside className="w-72 hidden sm:block">
        <SuggestionsCard />
      </aside>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};
