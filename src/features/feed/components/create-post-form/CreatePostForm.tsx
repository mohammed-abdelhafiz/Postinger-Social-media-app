"use client";
import { SendIcon } from "lucide-react";
import EmojiSelector from "./EmojiSelector";
import { ImageInput } from "./ImageInput";
import { useEffect, useRef, useState } from "react";
import { useNewPostInputStore } from "@/store/newPostInput";
import { UploadedImage } from "../../types/feed.types";
import { ImagePreview } from "./ImagesPreview";
import { useCreatePostMutation } from "../../hooks/useCreatePostMutation";
import { AxiosProgressEvent } from "axios";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/features/auth/hooks/useGetMeQuery";

export function CreatePostForm() {
  const { data: user } = useGetMeQuery();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const setTextareaRef = useNewPostInputStore((s) => s.setTextareaRef);

  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    null,
  );

  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);

  const createPostMutation = useCreatePostMutation();

  useEffect(() => {
    setTextareaRef(textareaRef);
  }, [setTextareaRef]);

  const handleCreatePostSubmit = () => {
    const formData = new FormData();
    formData.append("text", text);
    if (uploadedImage) {
      formData.append("image", uploadedImage.file);
    }

    createPostMutation.mutate(
      {
        formData,
        handleProgress: (event: AxiosProgressEvent) => {
          const percent = Math.round((event.loaded * 100) / (event.total || 1));
          setProgress(percent);
        },
      },
      {
        onSuccess: () => {
          setText("");
          if (uploadedImage) {
            URL.revokeObjectURL(uploadedImage.preview);
          }
          setUploadedImage(null);
          setProgress(0);
        },
      },
    );
  };

  return (
    <div className="w-full mx-auto flex flex-col bg-card p-2 border border-foreground/10 shadow-sm">
      <Textarea
        placeholder={`What's on your mind${user ? `, ${user.username}` : ""}?`}
        className="min-h-16 border-none bg-transparent! py-3 focus-visible:ring-0 wrap-anywhere max-h-16 overflow-y-auto resize-none"
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={createPostMutation.isPending}
        maxLength={500}
      />
      {uploadedImage && (
        <ImagePreview
          imageUrl={uploadedImage.preview}
          onRemove={() => {
            if (createPostMutation.isPending) return;
            setUploadedImage(null);
            URL.revokeObjectURL(uploadedImage.preview);
          }}
        />
      )}

      <div className="flex items-center">
        <EmojiSelector setText={setText} />
        {progress > 0 && <Progress value={progress} className="flex-1" />}
        <div className="flex items-center ml-auto">
          <ImageInput setUploadedImage={setUploadedImage} />
          <Button
            size="icon-xs"
            disabled={
              (!text.trim() && !uploadedImage) || createPostMutation.isPending
            }
            className="cursor-pointer"
            onClick={handleCreatePostSubmit}
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
