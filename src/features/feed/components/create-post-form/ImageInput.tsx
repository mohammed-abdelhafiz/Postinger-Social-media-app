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
      src: url,
      alt: file.name,
    });
    e.target.value = "";
  };

  return (
    <Button
      variant="ghost"
      onClick={() => imageInputRef.current?.click()}
      className="cursor-pointer"
      aria-label="Upload image"
    >
      <Input
        id="image"
        type="file"
        hidden
        ref={imageInputRef}
        onChange={handleImageChange}
        accept="image/*"
      />
      <ImageIcon className="text-muted-foreground cursor-pointer" />
    </Button>
  );
};
