import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

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
       hover:bg-primary! hover:text-white transition-all
        duration-300 ease-in-out ${isLiked ? "bg-primary! text-white!" : ""}`}
      onClick={handleLike}
      disabled={disabled}
    >
      <ThumbsUp size={18} />
    </Button>
  );
};
