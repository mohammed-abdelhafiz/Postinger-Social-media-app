import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCreatePost } from "../../hooks/useCreatePost";
import { useAuthStore } from "@/store/auth.store";
import { UploadedImage } from "../../types/feed.types";
import { SendIcon } from "lucide-react";
import { ImageInput } from "./ImageInput";
import EmojiSelector from "./EmojiSelector";
import { ImagePreview } from "./ImagesPreview";
import { Textarea } from "@/components/ui/textarea";
import { useFeedStore } from "@/store/feed.store";

export function FormDialog() {
  const user = useAuthStore((s) => s.user);
  const open = useFeedStore((s) => s.isCreatePostDialogOpen);
  const openCreatePostDialog = useFeedStore((s) => s.openCreatePostDialog);
  const closeCreatePostDialog = useFeedStore((s) => s.closeCreatePostDialog);

  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    null,
  );

  const [text, setText] = useState("");

  const createPostMutation = useCreatePost();

  const handleCreatePostSubmit = () => {
    const formData = new FormData();
    formData.append("text", text);
    if (uploadedImage) {
      formData.append("image", uploadedImage.file);
    }
    closeCreatePostDialog();
    createPostMutation.mutate(formData, {
      onSuccess: () => {
        setText("");
        if (uploadedImage) {
          URL.revokeObjectURL(uploadedImage.preview);
        }
        setUploadedImage(null);
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
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={createPostMutation.isPending}
              maxLength={2000}
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
              <div className="flex items-center ml-auto">
                <ImageInput setUploadedImage={setUploadedImage} />
                <Button
                  size="icon-xs"
                  disabled={
                    (!text.trim() && !uploadedImage) ||
                    createPostMutation.isPending
                  }
                  className="cursor-pointer"
                  onClick={handleCreatePostSubmit}
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
