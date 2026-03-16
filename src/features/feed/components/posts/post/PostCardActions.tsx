import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TrashIcon,
  PencilIcon,
  LinkIcon,
  EllipsisVerticalIcon,
} from "lucide-react";
import { DeletePostDialog } from "./DeletePostDialog";
import { Post } from "../../../types/feed.types";
import { useState } from "react";
import { EditPostDialog } from "./EditPostDialog";
import { toast } from "sonner";

interface PostCardActionsProps {
  post: Post;
}

export function PostCardActions({ post }: PostCardActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_APP_URL}/post/${post._id}`,
      );
      toast.success("Post link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy post link");
    }
  };
  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon" aria-label="Post actions">
              <EllipsisVerticalIcon aria-hidden="true" />
            </Button>
          }
        />
        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                setIsEditDialogOpen(true);
              }}
            >
              <PencilIcon aria-hidden="true" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleCopyLink}>
              <LinkIcon aria-hidden="true" />
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <TrashIcon aria-hidden="true" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditPostDialog
        open={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        post={post}
      />

      <DeletePostDialog
        open={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        postId={post._id}
      />
    </div>
  );
}
