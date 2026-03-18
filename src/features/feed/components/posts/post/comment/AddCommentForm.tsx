import { Post } from "@/features/feed/types/feed.types";

import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useRef, useState } from "react";
import { useCreateComment } from "@/features/feed/hooks/useCreateComment";

import { usePostContext } from "@/features/feed/contexts/PostContext";

interface AddCommentFormProps {
  newCommentInputRef: React.RefObject<HTMLTextAreaElement | null >;
}

const AddCommentForm = ({ newCommentInputRef }: AddCommentFormProps) => {
  const { post } = usePostContext();
  const postId = post._id;
  const [comment, setComment] = useState("");
  const createCommentMutation = useCreateComment();
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
      <InputGroup className="w-full">
        <InputGroupTextarea
        ref={newCommentInputRef}
          placeholder="Share your thoughts..."
          className="min-h-10 max-h-20 w-full wrap-anywhere"
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
