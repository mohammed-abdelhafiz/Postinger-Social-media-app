import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Comment } from "@/features/feed/types/feed.types";
import { timeAgo } from "@/lib/utils";
import { Dot, Heart } from "lucide-react";
import { CommentCardActions } from "./CommentCardActions";

interface CommentCardProps {
  comment: Comment;
}
export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className="flex items-center gap-2 group">
      <Avatar>
        <AvatarImage src={comment.author.avatar} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center">
          <p className="font-semibold">{comment.author.name}</p>
          <Dot className="size-4" />
          <p className="text-xs text-muted-foreground">
            {timeAgo(comment.createdAt)}
          </p>
          <div className="opacity-0 group-hover:opacity-100 p-1">
            <CommentCardActions comment={comment} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{comment.content}</p>
      </div>
      <Button variant="ghost" size="icon">
        <Heart className="size-4" />
      </Button>
    </div>
  );
};
