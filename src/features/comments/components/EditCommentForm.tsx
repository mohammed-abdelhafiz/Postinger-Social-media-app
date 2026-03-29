import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { SubmitEvent, useState } from "react";
import { useEditComment } from "@/features/comments/hooks/useEditComment";
import { useCommentContext } from "../context/CommentContext";

interface EditCommentFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const EditCommentForm = ({ setIsOpen }: EditCommentFormProps) => {
  const { comment } = useCommentContext();
  const [content, setContent] = useState(comment.content);
  const editCommentMutation = useEditComment();
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      content === comment.content ||
      !content.trim().length ||
      content.trim().length > 500 ||
      editCommentMutation.isPending
    )
      return;
    setIsOpen(false);
    editCommentMutation.mutate(
      { commentId: comment._id, content,postId:comment.postId },
      {
        onSuccess: () => {
          setContent("");
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
            maxLength={500}
            disabled={editCommentMutation.isPending}
          />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
        <Button
          type="submit"
          form="edit-comment-form"
          disabled={isSubmitDisabled}
        >
          {editCommentMutation.isPending ? "Saving..." : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  );
};
