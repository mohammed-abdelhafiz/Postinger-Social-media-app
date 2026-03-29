import { useForm, useWatch } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPostSchema } from "@/features/posts/types/schema";
import { useEditPost } from "@/features/posts/hooks/useEditPost";
import { EditPostData } from "@/features/posts/types";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { ImagePreview } from "../../create-post-form/ImagesPreview";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { usePostContext } from "@/features/posts/context/PostContext";

interface EditPostFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const EditPostForm = ({ setIsOpen }: EditPostFormProps) => {
  const { post } = usePostContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    post.content.image?.url || null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
  } = useForm<EditPostData>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      postId: post._id,
      text: post.content.text,
      },
    });
  const text = useWatch({ control, name: "text" });
  const imageFile = useWatch({ control, name: "image" });

  const editPostMutation = useEditPost();

  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    // eslint-disable-next-line
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const onSubmit = (data: EditPostData) => {
    if (!data.image && !previewUrl) {
      data.removeOldImage = true;
    }
    setIsOpen(false);
    editPostMutation.mutate(data, {
      onSuccess: (updatedPost) => {
        reset({
          postId: post._id,
          text: updatedPost.content.text,
        });
        setPreviewUrl(updatedPost.content.image?.url || null);
      },
    });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setValue("image", selectedFile, { shouldValidate: true });
  };

  const handleRemoveImage = () => {
    setValue("image", undefined);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isSubmitDisabled =
    editPostMutation.isPending ||
    (!text?.trim() && !imageFile && !previewUrl);

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
          {!previewUrl && !imageFile && post.content.image?.url && (
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
