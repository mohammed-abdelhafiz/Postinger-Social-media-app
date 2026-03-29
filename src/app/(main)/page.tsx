import { Feed } from "@/features/posts/components/Feed";
import { SuggestionsCard } from "@/features/users/components/suggestions-card/SuggestionsCard";
import { UserCard } from "@/features/users/components/user-card/UserCard";
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
