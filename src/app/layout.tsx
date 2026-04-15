import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers"; 
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Script from "next/script"; // 🚀 Added for external assets

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduNexus | Modern Learning Hub",
  description: "Your Educational Hub for 100+ professional roadmaps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 🚀 Restore FontAwesome to make your tracker & community icons work */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body 
        className={`${inter.className} min-h-screen bg-[#05050f] text-white antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Navbar /> 
          
          {/* 🛡️ Wrapped in a div with hydration suppression to block extension errors like bis_skin_checked */}
          <main suppressHydrationWarning>{children}</main>

          {/* 🎮 NEW: Dev Arena Floating Button (Bottom Left) */}
          <Link href="/arena" className="fixed bottom-8 left-8 z-50 group">
            <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-6 py-4 rounded-full shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_40px_rgba(217,70,239,0.7)] hover:-translate-y-1 transition-all duration-300 border border-fuchsia-400/50">
              <i className="fas fa-gamepad text-lg animate-pulse group-hover:animate-none"></i>
              <span className="font-bold tracking-wide">Dev Arena</span>
            </div>
          </Link>

          {/* 🚀 Fixed Placement Tracker Button (Bottom Right) */}
          <Link href="/tracker" className="fixed bottom-8 right-8 z-50 group">
            <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] hover:-translate-y-1 transition-all duration-300 border border-green-400/50">
              <i className="fas fa-briefcase text-lg animate-pulse group-hover:animate-none"></i>
              <span className="font-bold tracking-wide">Placement Tracker</span>
            </div>
          </Link>
          
        </Providers>
      </body>
    </html>
  );
}