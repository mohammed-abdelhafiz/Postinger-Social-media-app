"use client";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { SendIcon } from "lucide-react";
import EmojiSelector from "./EmojiSelector";
import { ImageInput } from "./ImageInput";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef, useState } from "react";
import { useNewPostInputStore } from "@/store/newPostInput";
import { UploadedImage } from "../../types/feed.types";
import { ImagePreview } from "./ImagesPreview";
import { useCreatePostMutation } from "../../hooks/useCreatePostMutation";

export function CreatePostForm() {
  const user = useAuthStore((s) => s.user);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const setTextareaRef = useNewPostInputStore((s) => s.setTextareaRef);

  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    null,
  );
  const [textContent, setTextContent] = useState("");

  const createPostMutation = useCreatePostMutation();

  useEffect(() => {
    setTextareaRef(textareaRef);
  }, [setTextareaRef]);

  return (
    <Field className="w-full mx-auto">
      <InputGroup className="bg-background rounded-none! rounded-t!">
        <InputGroupTextarea
          placeholder={`What's on your mind${user ? `, ${user.username}` : ""}?`}
          className="min-h-16 border-none py-3 shadow-none focus-visible:ring-0 wrap-anywhere max-h-16 overflow-y-auto font-semibold "
          ref={textareaRef}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        />

        <ImagePreview
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
        <InputGroupAddon align="block-end" className="px-3 pb-3">
          <EmojiSelector textareaRef={textareaRef} />

          <div className="ml-auto flex items-center gap-2">
            <InputGroupButton variant="secondary" asChild>
              <ImageInput setUploadedImage={setUploadedImage} />
            </InputGroupButton>
            <InputGroupButton
              variant="default"
              size="icon-sm"
              disabled={
                (!textContent.trim() && !uploadedImage) ||
                createPostMutation.isPending
              }
              className="cursor-pointer"
              onClick={() =>
                createPostMutation.mutate(
                  {
                    content: {
                      text: textContent,
                      image: null,
                    },
                  },
                  {
                    onSuccess: () => {
                      setTextContent("");
                      setUploadedImage(null);
                    },
                  },
                )
              }
            >
              <SendIcon />
            </InputGroupButton>
          </div>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
