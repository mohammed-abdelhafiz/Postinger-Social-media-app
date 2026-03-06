import { Logo } from "@/components/shared/Logo";
import { FloatingPaths } from "@/components/ui/floating-paths";

import { Particles } from "@/components/ui/particles";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col border-r border-muted p-10 lg:flex">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
        <Logo className="fixed top-4 left-4 z-50" />

        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>
      <div className="relative flex min-h-screen flex-col justify-center px-8">
        <Particles
          className="absolute inset-0"
          color="#666666"
          ease={20}
          quantity={120}
        />
        {children}
      </div>
    </main>
  );
}
