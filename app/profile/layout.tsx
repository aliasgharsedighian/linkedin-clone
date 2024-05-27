import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SignedIn>
        <main className="max-w-6xl mx-auto col-span-full md:col-span-6">
          {children}
        </main>
      </SignedIn>
      <SignedOut>
        <div className="text-center space-y-2 mt-4  flex flex-col justify-center items-center bg-white dark:bg-[var(--dark-post-background)] rounded-lg border py-4">
          <p>You are not signed in</p>
          <Button asChild className="bg-[#0b63c4] text-white">
            <SignInButton>Sign in</SignInButton>
          </Button>
        </div>
      </SignedOut>
    </>
  );
}
