import { XIcon } from "lucide-react";
import Image from "next/image";

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

export const ImagePreview = ({
  imageUrl,
  onRemove,
}: ImagePreviewProps) => {
  return (
    <div className="w-full p-3 flex gap-2 items-center">
      {imageUrl && (
        <div className="relative w-18 h-18">
          <Image
            src={imageUrl}
            alt="post image"
            fill
            className="rounded-lg object-cover"
          />
          <XIcon
            className="absolute right-[0.1rem] top-[0.1rem] text-foreground bg-background rounded-full p-0.5 cursor-pointer"
            size={16}
            onClick={onRemove}
          />
        </div>
      )}
    </div>
  );
};
