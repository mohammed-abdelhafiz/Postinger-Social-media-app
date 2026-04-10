import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/shared/providers/ReactQueryProvider";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { AuthProvider } from "@/shared/providers/AuthProvider";
import { StunningToaster } from "@/shared/components/shared/StunningToaster";

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" });

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

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
      className={cn("font-sans", outfit.variable, geistHeading.variable)}
    >
      <body className="antialiased">
        <ThemeProvider>
          <TooltipProvider>
            <ReactQueryProvider>
              <AuthProvider>
                <main className="min-h-screen">{children}</main>
              </AuthProvider>
              <StunningToaster />
            </ReactQueryProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
