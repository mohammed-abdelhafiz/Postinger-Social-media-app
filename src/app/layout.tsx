import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Postinger",
  description: "Postinger - A Social media platform for sharing your thoughts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body className="antialiased">
        <ThemeProvider>
          <TooltipProvider>
            <ReactQueryProvider>
              <main className="min-h-screen">{children}</main>
              <Toaster richColors />
            </ReactQueryProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
