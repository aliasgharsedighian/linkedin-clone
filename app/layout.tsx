import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import ThemeProviders from "@/components/ThemeProviders";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ThemeProviders>
          <body className="min-h-screen flex flex-col">
            {/* Toaster */}
            <Toaster position="bottom-left" />

            <header className="border-b dark:border-[var(--dark-border)] sticky top-0 z-50 bg-white dark:bg-[var(--dark-post-background)] shadow-xl">
              <Header />
            </header>
            <div className="bg-[#f4f2ed] flex-1 w-full dark:bg-black">
              <main className="max-w-6xl mx-auto">{children}</main>
            </div>
          </body>
        </ThemeProviders>
      </html>
    </ClerkProvider>
  );
}
