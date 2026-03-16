import { Comment } from "@/features/feed/types/feed.types";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SubmitEvent, useState } from "react";
import { useEditCommentMutation } from "@/features/feed/hooks/useEditCommentMutation";

interface EditCommentFormProps {
  comment: Comment;
  setIsOpen: (isOpen: boolean) => void;
}

export const EditCommentForm = ({
  comment,
  setIsOpen,
}: EditCommentFormProps) => {
  const [content, setContent] = useState(comment.content);
  const editCommentMutation = useEditCommentMutation(comment.postId);
  const handleSubmit = (e:SubmitEvent) => {
    e.preventDefault()
    editCommentMutation.mutate(
      { commentId: comment._id, content },
      {
        onSuccess: () => {
          setContent("");
          setIsOpen(false);
        },
      },
    );
  };
  const isSubmitDisabled =
    !content.trim().length || editCommentMutation.isPending;
  return (
    <form onSubmit={handleSubmit} id="edit-comment-form">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="content">Content</FieldLabel>
          <Input
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
        <Button type="submit" form="edit-comment-form" disabled={isSubmitDisabled}>
          {editCommentMutation.isPending ? "Saving..." : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  );
};
