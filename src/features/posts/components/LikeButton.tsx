import { Button } from "@/shared/components/ui/button";
import { ThumbsUp } from "lucide-react";

interface LikeButtonProps {
  isLiked: boolean;
  handleLike: () => void;
  handleUnlike: () => void;
  disabled: boolean;
}

export const LikeButton = ({
  isLiked,
  handleLike,
  handleUnlike,
  disabled,
}: LikeButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={`rounded-full cursor-pointer
       hover:bg-primary! hover:text-white transition-all
        duration-300 ease-in-out ${isLiked ? "bg-primary! text-white!" : ""}`}
      onClick={isLiked ? handleUnlike : handleLike}
      disabled={disabled}
    >
      <ThumbsUp size={18} />
    </Button>
  );
};
