import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/features/auth/authContext";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Rumble - Community Betting App",
  description: "A fun and social betting app for friends and communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white min-h-screen flex items-center justify-center p-4">
        {/* iPhone 16 Frame */}
        <div className="relative w-full max-w-[393px] aspect-[393/852] bg-black rounded-[50px] shadow-2xl overflow-hidden border-8 border-black">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50"></div>
          
          {/* Screen Content */}
          <div className="w-full h-full bg-background text-foreground overflow-hidden flex flex-col pt-8" suppressHydrationWarning>
            <AuthProvider>
              <Providers>
                <AuthGuard>
                  {children}
                </AuthGuard>
              </Providers>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
