import { motion } from "motion/react";
import { NavItem } from "@/shared/types";
import Link from "next/link";
import { Home, MessageCircle, Bell, User, Settings } from "lucide-react";
import { useLogoutMutation } from "@/features/auth/hooks/useLogout";
import { Button } from "@/shared/components/ui/button";
import { ThemeToggle } from "@/shared/components/shared/ThemeToggle";
import { useAuthStore } from "@/shared/store/auth.store";
import { useUnreadCount } from "@/features/notifications/hooks";

const mobileMenuVariants = {
  closed: { opacity: 0, height: 0 },
  open: { opacity: 1, height: "auto" },
};
const mobileItemVariants = {
  closed: { opacity: 0, x: 20 },
  open: { opacity: 1, x: 0 },
};

interface MobileNavProps {
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const MobileNav = ({ setIsMobileMenuOpen }: MobileNavProps) => {
  const logoutMutation = useLogoutMutation();
  const user = useAuthStore((state) => state.user);
  const { data: unreadCount = 0 } = useUnreadCount();
  const navItems: NavItem[] = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Chats", href: "/chats", icon: <MessageCircle size={20} /> },
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
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 size-2 bg-destructive rounded-full" />
          )}
        </div>
      ) 
    },
    { name: "Settings", href: "/settings", icon: <Settings size={20} /> },
  ];
  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <motion.div
        className="border-border bg-background fixed top-16 right-4 z-50 w-80 overflow-hidden rounded-2xl border shadow-2xl lg:hidden"
        variants={mobileMenuVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        <div className="space-y-6 p-6">
          <div className="space-y-1">
            {navItems.map((item) => (
              <motion.div key={item.name} variants={mobileItemVariants}>
                <Link
                  prefetch={false}
                  href={item.href}
                  className="text-foreground hover:bg-muted block rounded-lg px-4 py-3 font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3 text-sm">
                    {item.icon}
                    {item.name}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="border-border space-y-3 border-t"
            variants={mobileItemVariants}
          >
            <ThemeToggle />
            <Button
              variant="destructive"
              className="w-full cursor-pointer"
              onClick={() => logoutMutation.mutate()}
            >
              Logout
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
