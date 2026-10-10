import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers"; 
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
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

          <FloatingActions />

        </Providers>
      </body>
    </html>
  );
}