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
import { ProfileTab } from "../../../types";

export function EmptyProfilePosts({ activeTab }: { activeTab: ProfileTab }) {
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
            {activeTab === "posted" ? "No posts yet" : "No Liked Posts"}
          </EmptyTitle>
          <EmptyDescription>
            {activeTab === "posted"
              ? "Be the first to share something"
              : "No posts liked yet"}
          </EmptyDescription>
          <Button
            className="mt-2 cursor-pointer"
            onClick={() => {
              if (activeTab === "posted") {
                openCreatePostDialog();
              } else {
                router.push("/");
              }
            }}
          >
            {activeTab === "posted"
              ? "Post your first thought"
              : "Explore Posts"}
          </Button>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
