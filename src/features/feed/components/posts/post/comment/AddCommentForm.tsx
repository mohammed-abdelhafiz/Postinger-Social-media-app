import { Post } from "@/features/feed/types/feed.types";

import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useState } from "react";
import { useCreateCommentMutation } from "@/features/feed/hooks/useCreateCommentMutation";

interface AddCommentFormProps {
  postId: string;
}
const AddCommentForm = ({ postId }: AddCommentFormProps) => {
  const [comment, setComment] = useState("");
  const createCommentMutation = useCreateCommentMutation(postId);
  const handleSubmit = () => {
    const trimmedComment = comment.trim();
    if (trimmedComment.length === 0 || trimmedComment.length > 500) return;
    createCommentMutation.mutate(
      {
        postId,
        content: trimmedComment,
      },
      {
        onSuccess: () => setComment(""),
      },
    );
  };
  return (
    <Field className="w-full">
      <InputGroup>
        <InputGroupTextarea
          placeholder="Share your thoughts..."
          className="min-h-10 max-h-20"
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="default"
            size="sm"
            className="ml-auto"
            onClick={handleSubmit}
            disabled={comment.trim().length === 0}
          >
            Comment
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};

export default AddCommentForm;
