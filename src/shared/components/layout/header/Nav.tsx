"use client";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Bell, User } from "lucide-react";
import { NavItem } from "@/shared/types";
import { useAuthStore } from "@/shared/store/auth.store";
import { useUnreadCount } from "@/features/notifications/hooks";
import React from "react";



export function Nav() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const { data: unreadCount = 0 } = useUnreadCount();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-md hidden md:block h-8 bg-muted/20 animate-pulse rounded-lg" />
    );
  }

  const navItems: NavItem[] = [
    { name: "Home", href: "/", icon: <Home /> },
    {
      name: "Profile",
      href: user ? `/profile/${user.username}` : "/profile",
      icon: <User size={20} />,
    },
    { 
      name: "Notifications", 
      href: "/notifications", 
      icon: (
        <div className="relative">
          <Bell />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 size-2 bg-destructive rounded-full" />
          )}
        </div>
      ) 
    },
  ];
  return (
    <div className="w-full max-w-md hidden md:block">
      <Tabs value={pathname}>
        <TabsList className="w-full">
          {navItems.map((item) => (
            <TabsTrigger
              key={item.name}
              value={item.href}
              disabled={item.name === "Profile" && !user}
              render={
                <Link
                  href={item.href}
                  className="flex items-center gap-2 w-full justify-center"
                >
                  {item.icon}
                  {item.name}
                </Link>
              }
              nativeButton={false}
            />
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
