import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";

const roboto = Roboto({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
});

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
    <html lang="en" suppressHydrationWarning className={cn("font-sans", roboto.variable)}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <TooltipProvider>
            <ReactQueryProvider>
              <AuthProvider>
                <main className="min-h-screen">{children}</main>
                <Toaster richColors />
              </AuthProvider>
            </ReactQueryProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
