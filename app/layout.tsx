import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import ThemeProviders from "@/components/ThemeProviders";
import { Inter } from "next/font/google";

export const viewport: Viewport = {
  themeColor: "#fff",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--main-font",
});

export const metadata: Metadata = {
  title: "Linkedin Clone",
  description: "test and demo linkedin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
        <body className="min-h-screen flex flex-col transition-all duration-1000">
          <ThemeProviders>
            {/* Toaster */}
            <Toaster position="bottom-left" closeButton />

            <header className="border-b dark:border-[var(--dark-border)] sticky top-0 z-50 pl-2.5 bg-white dark:bg-[var(--dark-post-background)] shadow-xl h-[65px] md:h-[57px]">
              <Header />
            </header>
            <div className="bg-[#f4f2ed] flex-1 w-full dark:bg-zinc-900 h-full">
              <main className="max-w-6xl mx-auto">{children}</main>
            </div>
          </ThemeProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
