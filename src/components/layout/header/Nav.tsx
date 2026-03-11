import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Bell, User } from "lucide-react";
import { NavItem } from "@/types";

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: <Home /> },
  { name: "Profile", href: "/profile", icon: <User /> },
  { name: "Notifications", href: "/notifications", icon: <Bell /> },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <div className="w-full max-w-md hidden md:block">
      <Tabs value={pathname}>
        <TabsList className="w-full">
          {navItems.map((item) => (
            <TabsTrigger key={item.name} value={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-2 w-full justify-center"
              >
                {item.icon}
                {item.name}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
