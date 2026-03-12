import { XIcon } from "lucide-react";
import Image from "next/image";
import { UploadedImage } from "../../types/feed.types";

export const ImagePreview = ({
  uploadedImage,
  setUploadedImage,
}: {
  uploadedImage: UploadedImage | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<UploadedImage | null>>;
}) => {
  return (
    <div className="w-full p-3 flex gap-2 items-center">
      {uploadedImage && (
        <div className="relative w-18 h-18">
          <Image
            src={uploadedImage.src}
            alt={uploadedImage.alt}
            fill
            className="rounded-lg object-cover"
          />
          <XIcon
            className="absolute right-[0.1rem] top-[0.1rem] text-foreground bg-background rounded-full p-0.5 cursor-pointer"
            size={16}
            onClick={() => {
              setUploadedImage(null);
              URL.revokeObjectURL(uploadedImage.src);
            }}
          />
        </div>
      )}
    </div>
  );
};
