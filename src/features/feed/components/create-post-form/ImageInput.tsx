"use client";
import { Input } from "@/components/ui/input";
import { ImageIcon } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadedImage } from "../../types/feed.types";

export const ImageInput = ({
  setUploadedImage,
}: {
  setUploadedImage: Dispatch<SetStateAction<UploadedImage | null>>;
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setUploadedImage({
      file,
      preview: url,
    });
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
