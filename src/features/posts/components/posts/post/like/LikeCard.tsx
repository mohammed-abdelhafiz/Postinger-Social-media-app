import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { User } from "@/features/users/types";
import Link from "next/link";

interface LikeCardProps {
  like: User;
}

export const LikeCard = ({ like }: LikeCardProps) => {
  return (
    <Link
      href={`/profile/${like._id}`}
      className="flex items-center gap-2 group"
    >
      <Avatar>
        <AvatarImage src={like.avatar.url} />
        <AvatarFallback>{like.name?.[0] ?? "?"}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-semibold">{like.name}</p>
        <p className="text-muted-foreground">{like.username}</p>
      </div>
    </Link>
  );
};
