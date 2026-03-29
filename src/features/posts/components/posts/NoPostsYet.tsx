import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { useRouter } from "next/navigation";
import { useFeedStore } from "@/shared/store/feed.store";
import { BoardIllustration } from "@/shared/components/shared/BoardIllustration";

export function NoPostsYet({ activeTab }: { activeTab: string }) {
  const openCreatePostDialog = useFeedStore((s) => s.openCreatePostDialog);
  const router = useRouter();
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="py-12">
        <EmptyHeader>
          <EmptyMedia>
            <BoardIllustration />
          </EmptyMedia>
          <EmptyTitle>
            {activeTab === "for-you" ? "No posts yet" : "No Following Posts"}
          </EmptyTitle>
          <EmptyDescription>
            {activeTab === "for-you"
              ? "Be the first to share something"
              : "Follow some people to see their posts"}
          </EmptyDescription>{" "}
          <Button
            className="mt-2 cursor-pointer"
            onClick={() => {
              if (activeTab === "for-you") {
                openCreatePostDialog();
              } else {
                router.push("/follow");
              }
            }}
          >
            {activeTab === "for-you"
              ? "Post your first thought"
              : "Follow some people"}
          </Button>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
