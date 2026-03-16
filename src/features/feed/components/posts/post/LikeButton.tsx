import { Button } from "@/components/ui/button";
import { Post } from "@/features/feed/types/feed.types";
import { Heart, ThumbsUp } from "lucide-react";

interface LikeButtonProps {
  post: Post;
}
export const LikeButton = ({ post }: LikeButtonProps) => {
  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full cursor-pointer
       hover:bg-red-500! hover:text-white transition-all
        duration-300 ease-in-out"
      >
        <Heart size={18} />
      </Button>
    </div>
  );
};
