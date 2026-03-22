"use client";
import { Header } from "@/components/layout/header/Header";
import FloatingActionButton from "@/components/shared/FloatingActionButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-screen overflow-hidden">
      <Header />
      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] overflow-y-auto hide-scrollbar">
        {children}
      </div>
      <FloatingActionButton />
    </div>
  );
}
