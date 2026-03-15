import { CreatePostForm } from "@/features/feed/components/create-post-form/CreatePostForm";
import { Feed } from "@/features/feed/components/Feed";
import { Posts } from "@/features/feed/components/posts/Posts";
import { PostsFilterTabs } from "@/features/feed/components/posts/PostsFilterTabs";
import { SuggestionsCard } from "@/features/feed/components/SuggestionsCard";
import { UserCard } from "@/features/feed/components/UserCard";
import type { Metadata } from "next";

export default function HomePage() {
  return (
    <div className="flex gap-4 flex-1 overflow-hidden">
      <aside className="w-64 hidden lg:block">
        <UserCard />
      </aside>
      <div className="flex-1 space-y-1 overflow-y-auto pr-1.5 hide-scrollbar">
        <Feed />
      </div>
      <aside className="w-64 hidden sm:block">
        <SuggestionsCard />
      </aside>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};
