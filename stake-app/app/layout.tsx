import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/features/auth/authContext";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Stake - Community Betting App",
  description: "A fun and social betting app for friends and communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <AuthProvider>
          <Providers>
            <AuthGuard>
              {children}
            </AuthGuard>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
