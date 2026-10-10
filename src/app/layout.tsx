import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      {/* overflow-x-hidden: safety net against sideways scroll from blurred glow orbs */}
      <body
        className={`${inter.className} min-h-screen overflow-x-hidden bg-[#05050f] text-white antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          <main suppressHydrationWarning>{children}</main>
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
