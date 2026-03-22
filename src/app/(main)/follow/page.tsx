import { FollowSuggestions } from "@/features/users/components/follow-suggestions/FollowSuggestions";

export default function FollowPage() {
  return (
    <div className="mx-auto max-w-7xl pt-12 px-4 sm:px-6 lg:px-8 h-full flex flex-col">
      <div className="mb-12 text-center sm:mb-16 lg:mb-24">
        <h2 className="mb-4 text-2xl font-semibold md:text-3xl lg:text-4xl">
          Get to Know Postinger Community
        </h2>
        <p className="text-muted-foreground text-xl">
          Discover new people to follow and connect with.
        </p>
      </div>
      <FollowSuggestions />
    </div>
  );
}
