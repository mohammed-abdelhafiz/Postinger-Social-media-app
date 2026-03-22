"use client";
import { Header } from "@/components/layout/header/Header";
import FloatingActionButton from "@/components/shared/FloatingActionButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col h-screen">
      <Header />
      {children}
      <FloatingActionButton />
    </div>
  );
}
