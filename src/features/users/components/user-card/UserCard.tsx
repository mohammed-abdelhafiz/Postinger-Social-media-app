"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { useLogoutMutation } from "@/features/auth/hooks/useLogout";
import { MailCheckIcon } from "lucide-react";
import UserCardSkeleton from "./UserCardSkeleton";
import { useAuthStore } from "@/shared/store/auth.store";

export const UserCard = () => {
  const user = useAuthStore((s) => s.user);
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();

  if (!user) {
    return <UserCardSkeleton />;
  }

  return (
    <Card className="border rounded-md shadow-lg">
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="flex items-center flex-col gap-3">
          <Avatar>
            <Avatar>
              <AvatarImage src={user.avatar?.url} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>{" "}
          </Avatar>
          <h5 className="font-semibold leading-none">{user.name}</h5>
        </div>
        <Tooltip>
          <TooltipTrigger
            className="text-sm text-muted-foreground flex items-center justify-center gap-2 w-full overflow-hidden cursor-default"
            render={<div />}
          >
            <MailCheckIcon size={16} className="shrink-0" />
            <span className="truncate">{user?.email}</span>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{user?.email}</p>
          </TooltipContent>
        </Tooltip>
        <p className="text-sm text-muted-foreground text-center line-clamp-2">
          {user?.bio}
        </p>
        <Separator />
        <Button
          variant="destructive"
          className="w-full cursor-pointer"
          onClick={() => logout()}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </CardContent>
    </Card>
  );
};
