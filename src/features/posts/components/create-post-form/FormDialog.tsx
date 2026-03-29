import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useState } from "react";
import { useCreatePost } from "../../hooks/useCreatePost";
import { useAuthStore } from "@/shared/store/auth.store";
import { CreatePostData } from "../../types";
import { SendIcon } from "lucide-react";
import { ImageInput } from "./ImageInput";
import EmojiSelector from "./EmojiSelector";
import { ImagePreview } from "./ImagesPreview";
import { Textarea } from "@/shared/components/ui/textarea";
import { useFeedStore } from "@/shared/store/feed.store";
import { useForm, useWatch } from "react-hook-form";
import { createPostSchema } from "../../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function FormDialog() {
  const user = useAuthStore((s) => s.user);
  const open = useFeedStore((s) => s.isCreatePostDialogOpen);
  const openCreatePostDialog = useFeedStore((s) => s.openCreatePostDialog);
  const closeCreatePostDialog = useFeedStore((s) => s.closeCreatePostDialog);

  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
  });

  const text = useWatch({ control, name: "text" });

  const createPostMutation = useCreatePost();

  const onSubmit = (data: CreatePostData) => {
    closeCreatePostDialog();
    createPostMutation.mutate(data, {
      onSuccess: () => {
        reset({
          text: undefined,
          image: undefined,
        });
        if (preview) {
          URL.revokeObjectURL(preview);
        }
        setPreview(null);
      },
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog
        open={open}
        onOpenChange={(open) =>
          open ? openCreatePostDialog() : closeCreatePostDialog()
        }
      >
        <DialogContent className="max-w-xl!">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>
              Share your thoughts with the world.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex flex-col bg-card p-2 border border-foreground/10 shadow-sm rounded">
            <Textarea
              placeholder={`What's on your mind${user?.name ? `, ${user.name.split(" ")[0]}` : ""}?`}
              className="min-h-16 max-h-[430px] border-none bg-transparent! py-3 focus-visible:ring-0 wrap-anywhere overflow-y-auto resize-none"
              {...register("text")}
              disabled={createPostMutation.isPending}
              maxLength={2000}
            />
            {errors.text && (
              <p className="text-red-500 text-sm">{errors.text.message}</p>
            )}
            {preview && (
              <ImagePreview
                imageUrl={preview}
                onRemove={() => {
                  if (createPostMutation.isPending) return;
                  setPreview(null);
                  URL.revokeObjectURL(preview);
                }}
              />
            )}

            <div className="flex items-center">
              <EmojiSelector
                onEmojiSelect={({ emoji }) => {
                  setValue("text", text + emoji);
                }}
              />
              <div className="flex items-center ml-auto">
                <ImageInput setPreview={setPreview} setValue={setValue} />
                <Button
                  size="icon-xs"
                  disabled={
                    (!text?.trim() && !preview) || createPostMutation.isPending
                  }
                  className="cursor-pointer"
                  onClick={handleSubmit(onSubmit)}
                >
                  <SendIcon />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
