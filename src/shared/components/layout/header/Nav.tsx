import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Bell, User } from "lucide-react";
import { NavItem } from "@/shared/types";
import { useAuthStore } from "@/shared/store/auth.store";



export function Nav() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: <Home /> },
  { name: "Profile", href: `/profile/${user?.username}`, icon: <User size={20} /> },
  { name: "Notifications", href: "/notifications", icon: <Bell /> },
];
  return (
    <div className="w-full max-w-md hidden md:block">
      <Tabs value={pathname}>
        <TabsList className="w-full">
          {navItems.map((item) => (
            <TabsTrigger
              key={item.name}
              value={item.href}
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
