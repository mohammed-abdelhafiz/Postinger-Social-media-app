"use client";
import { Input } from "@/shared/components/ui/input";
import { ImageIcon } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { Button } from "@/shared/components/ui/button";
import { UseFormSetValue } from "react-hook-form";
import { CreatePostData } from "../../types";

export const ImageInput = ({
  setPreview,
  setValue,
}: {
  setPreview: Dispatch<SetStateAction<string | null>>;
  setValue: UseFormSetValue<CreatePostData>;
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview(url);
    setValue("image", file);
    e.target.value = "";
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Upload image"
      className="cursor-pointer text-muted-foreground"
      onClick={() => imageInputRef.current?.click()}
    >
      <Input
        id="image"
        name="image"
        type="file"
        hidden
        ref={imageInputRef}
        onChange={handleImageChange}
        accept="image/*"
      />
      <ImageIcon />
    </Button>
  );
};
