import { XIcon } from "lucide-react";
import Image from "next/image";
import { UploadedImage } from "../../types/feed.types";

interface ImagePreviewProps {
  uploadedImage: UploadedImage | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<UploadedImage | null>>;
  isUploading: boolean;
}

export const ImagePreview = ({
  uploadedImage,
  setUploadedImage,
  isUploading,
}: ImagePreviewProps) => {
  return (
    <div className="w-full p-3 flex gap-2 items-center">
      {uploadedImage && (
        <div className="relative w-18 h-18">
          <Image
            src={uploadedImage.preview}
            alt={uploadedImage.file.name}
            fill
            className="rounded-lg object-cover"
          />
          <XIcon
            className="absolute right-[0.1rem] top-[0.1rem] text-foreground bg-background rounded-full p-0.5 cursor-pointer"
            size={16}
            onClick={() => {
              if (isUploading) return;
              setUploadedImage(null);
              URL.revokeObjectURL(uploadedImage.preview);
            }}
          />
        </div>
      )}
    </div>
  );
};
