import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import Link from "next/link";

import { LogOutIcon, PaletteIcon, UserIcon } from "lucide-react";
import { useLogoutMutation } from "@/features/auth/hooks/useLogout";
import { useToggleTheme } from "@/shared/hooks/useToggleTheme";
import { useTheme } from "next-themes";
import { Theme } from "@/shared/types";
import { useAuthStore } from "@/shared/store/auth.store";

export function UserProfileItem() {
  const logoutMutation = useLogoutMutation();
  const { theme, setTheme } = useTheme();
  const toggleTheme = useToggleTheme(setTheme);
  const user = useAuthStore((s) => s.user);
  if (!user) return null;
  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Avatar className="size-8">
              <AvatarImage src={user.avatar.url} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          }
          nativeButton={false}
        />
        <DropdownMenuContent
          className="w-60 hidden md:block"
          align="start"
          sideOffset={8}
        >
          <div className="flex items-center gap-3 px-1 pt-1.5">
            <Avatar className="size-8">
              <AvatarImage src={user.avatar.url} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-foreground text-sm font-medium">
                {user.name}
              </span>
              <span className="text-muted-foreground text-xs">
                {user?.email}
              </span>
            </div>
          </div>
          <DropdownMenuGroup className="mt-4">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Link href={`/profile/${user.username}`} className="flex items-center gap-2">
                <UserIcon aria-hidden="true" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <PaletteIcon />
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(value) => toggleTheme(value as Theme)}
                  >
                    <DropdownMenuRadioItem value="light">
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      System
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOutIcon aria-hidden="true" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
