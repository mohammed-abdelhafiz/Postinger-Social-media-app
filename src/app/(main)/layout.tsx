"use client";
import { Header } from "@/components/layout/header/Header";
import FloatingActionButton from "@/components/shared/FloatingActionButton";
import { useFeedStore } from "@/store/feed.store";
import { usePathname, useRouter } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const focusInput = useFeedStore((s) => s.focusNewPostInputRef);
  return (
    <div className="w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col h-screen">
      <Header />
      {children}
      <FloatingActionButton
        onClick={() => {
          if (pathname !== "/") {
            router.push("/");
            setTimeout(() => {
              focusInput();
            }, 500);
          } else {
            focusInput();
          }
        }}
      />
    </div>
  );
}
