"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLogoutMutation } from "@/features/auth/hooks/useLogoutMutation";
import { MailCheckIcon } from "lucide-react";
import UserCardSkeleton from "./UserCardSkeleton";
import { useGetMeQuery } from "@/features/auth/hooks/useGetMeQuery";

export const UserCard = () => {
  const { data: user, isLoading, isError } = useGetMeQuery();

  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();

  if (isLoading || isError) {
    return <UserCardSkeleton />;
  }

  return (
    <Card className="border rounded-md shadow-lg">
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="flex items-center flex-col gap-3">
          <Avatar>
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <h5 className="font-semibold leading-none">{user?.name}</h5>
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
