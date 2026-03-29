import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { useFollowUser } from "../../hooks/useFollowUser";
import { User } from "../../types";

interface FollowSuggestionCardProps {
  user: User;
}

export const FollowSuggestionCard = ({ user }: FollowSuggestionCardProps) => {
  const followUserMutation = useFollowUser();

  const handleFollow = (username: string) => {
    followUserMutation.mutate({ username });
  };
  return (
    <Card className="py-0 overflow-visible">
      {" "}
      <CardContent className="px-0 overflow-hidden rounded-xl">
        <div className="bg-muted flex items-center justify-center h-48">
          <Avatar className="h-40 w-40">
            <AvatarImage src={user.avatar?.url} alt={user.name} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-3 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">{user.name}</h2>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
          <Separator />
          <div className="h-10 text-muted-foreground">
            {user.bio ? (
              <p className="text-sm line-clamp-2">{user.bio}</p>
            ) : (
              <p className="text-sm italic text-center">
                No bio available for {user.name}
              </p>
            )}
          </div>
          <Button
            className="w-full cursor-pointer"
            disabled={followUserMutation.isPending}
            onClick={() => handleFollow(user.username)}
          >
            {followUserMutation.isPending ? "Following..." : "Follow"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
