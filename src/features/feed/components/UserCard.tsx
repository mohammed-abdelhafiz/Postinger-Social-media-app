"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLogoutMutation } from "@/features/auth/hooks/useLogoutMutation";
import { MailCheckIcon } from "lucide-react";

export const UserCard = () => {
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();
  return (
    <Card className="border rounded-md shadow-lg">
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="flex items-center flex-col gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>MG</AvatarFallback>
          </Avatar>
          <h5 className="font-semibold leading-none">Mohamed Gamal</h5>
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <MailCheckIcon size={16}/>
          moahmed@gmail.com
        </p>
        <p className="text-sm text-muted-foreground text-center line-clamp-2">Your bio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        <Separator />
        <Button variant="destructive" className="w-full cursor-pointer"
          onClick={() => logout()} disabled={isLoggingOut}>
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </CardContent>
    </Card>
  );
};
