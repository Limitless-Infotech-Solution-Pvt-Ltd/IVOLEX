import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ProductQuickView } from "@/components/product/product-quick-view";
import NextAuthSessionProvider from "@/components/session-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "IVOLEX - Premium Furniture & Interior Design",
  description: "Discover handcrafted furniture, luxury leather, and cutting-edge electronics for your dream home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <NextAuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <ProductQuickView />
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
