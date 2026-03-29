import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { TrashIcon, PencilIcon, EllipsisIcon } from "lucide-react";
import { useState } from "react";
import { DeleteCommentDialog } from "./DeleteCommentDialog";
import { EditCommentDialog } from "./EditCommentDialog";

export function CommentCardActions() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button aria-label="comment actions">
              <EllipsisIcon aria-hidden="true" size={16}/>
            </button>
          }
        />
        <DropdownMenuContent className="w-48" align="start">
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

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <TrashIcon aria-hidden="true" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditCommentDialog
        open={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
      />

      <DeleteCommentDialog
        open={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </div>
  );
}
