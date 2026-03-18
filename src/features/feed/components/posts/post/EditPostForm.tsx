import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editPostFormSchema,
  EditPostFormValues,
} from "@/features/feed/types/feed.schema";
import { useEditPost } from "@/features/feed/hooks/useEditPost";
import { Post } from "@/features/feed/types/feed.types";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ImagePreview } from "../../create-post-form/ImagesPreview";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePostContext } from "@/features/feed/contexts/PostContext";

interface EditPostFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const EditPostForm = ({ setIsOpen }: EditPostFormProps) => {
  const { post } = usePostContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    post.content.image?.url || null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<EditPostFormValues>({
      resolver: zodResolver(editPostFormSchema),
      defaultValues: {
        text: post.content.text,
        newImageFile: null,
      },
    });
  const text = watch("text");
  const newImageFile = watch("newImageFile");

  const editPostMutation = useEditPost();

  useEffect(() => {
    if (!newImageFile) return;
    const objectUrl = URL.createObjectURL(newImageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [newImageFile]);

  const onSubmit = (data: EditPostFormValues) => {
    const formData = new FormData();
    formData.append("text", data.text);
    if (data.newImageFile) {
      formData.append("image", data.newImageFile);
    } else if (!data.newImageFile && !previewUrl) {
      formData.append("removeOldImage", "true");
    }
    editPostMutation.mutate(
      { postId: post._id, formData },
      {
        onSuccess: (updatedPost) => {
          reset({
            text: updatedPost.content.text,
            newImageFile: null,
          });
          setPreviewUrl(updatedPost.content.image?.url || null);
          setIsOpen(false);
        },
      },
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setValue("newImageFile", selectedFile, { shouldValidate: true });
  };

  const handleRemoveImage = () => {
    setValue("newImageFile", null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isSubmitDisabled =
    editPostMutation.isPending ||
    (!text.trim() && !newImageFile && !previewUrl);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="edit-post-form">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="content">Content</FieldLabel>
          <Input id="content" {...register("text")} />
        </Field>

        {previewUrl && (
          <ImagePreview imageUrl={previewUrl} onRemove={handleRemoveImage} />
        )}

        <Field>
          <FieldLabel htmlFor="image">Image</FieldLabel>
          <Input
            type="file"
            id="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {!previewUrl && !newImageFile && post.content.image?.url && (
            <p className="text-destructive text-xs italic">
              *Please select an image (or current image will be deleted)
            </p>
          )}
        </Field>
      </FieldGroup>
      <DialogFooter>
        <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
        <Button type="submit" form="edit-post-form" disabled={isSubmitDisabled}>
          {editPostMutation.isPending ? "Saving..." : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  );
};
