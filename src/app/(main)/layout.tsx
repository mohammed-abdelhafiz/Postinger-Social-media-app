import { Header } from "@/components/layout/header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Header />
      {children}
    </div>
  );
}
