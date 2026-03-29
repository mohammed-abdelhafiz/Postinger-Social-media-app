"use client";
import { Header } from "@/shared/components/layout/header/Header";
import FloatingActionButton from "@/shared/components/shared/FloatingActionButton";
import { Particles } from "@/shared/components/ui/particles";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-screen overflow-hidden">
      <Header />
      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] overflow-y-auto hide-scrollbar">
        {children}
      </div>
      <Particles
        className="absolute inset-0 -z-10 pointer-events-none"
        color="#666666"
        ease={20}
        quantity={120}
      />
      <FloatingActionButton />
    </div>
  );
}
