import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormDialog } from "./FormDialog";
import { useAuthStore } from "@/store/auth.store";
import { useFeedStore } from "@/store/feed.store";

export function CreatePostForm() {
  const user = useAuthStore((s) => s.user);
  const openCreatePostDialog = useFeedStore((s) => s.openCreatePostDialog);

  return (
    <div className="flex items-center gap-2 p-4 bg-card hover:bg-card/80 transition-colors duration-300 border border-foreground/10 shadow-sm rounded-lg">
      <Avatar size="sm">
        <AvatarImage src={user?.avatar.url} />
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <button
        className="cursor-text flex-1 text-left py-2"
        onClick={openCreatePostDialog}
      >
        <p className="text-muted-foreground text-sm">
          What&apos;s on your mind
          {user?.name ? `, ${user.name.split(" ")[0]}` : ""}?
        </p>
      </button>
      <FormDialog />
    </div>
  );
}
