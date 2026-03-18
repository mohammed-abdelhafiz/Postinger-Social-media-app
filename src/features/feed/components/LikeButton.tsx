import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  isLiked: boolean;
  handleLike: () => void;
  disabled: boolean;
}

export const LikeButton = ({
  isLiked,
  handleLike,
  disabled,
}: LikeButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={`rounded-full cursor-pointer
       hover:bg-red-500! hover:text-white transition-all
        duration-300 ease-in-out ${isLiked ? "bg-red-500! text-white!" : ""}`}
      onClick={handleLike}
      disabled={disabled}
    >
      <Heart size={18} />
    </Button>
  );
};
