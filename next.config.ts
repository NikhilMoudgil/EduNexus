import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Keep this at the top level! Next.js 14/15 graduated this feature.
  serverExternalPackages: ["@prisma/client", "pg"],
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;