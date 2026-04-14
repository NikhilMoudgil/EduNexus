import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // Using the Prisma adapter with your v7 configuration
  adapter: PrismaAdapter(db) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = await db.user.findUnique({ 
          where: { email: credentials.email } 
        });
        
        if (user && user.password) {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordValid) return user;
        }
        return null; 
      }
    })
  ],
  session: {
    strategy: "jwt", 
  },
  pages: {
    signIn: '/login', 
  },
  callbacks: {
    // 🛡️ JWT Callback: Controls what data is stored in the encrypted token
    async jwt({ token, user, trigger, session }) {
      // Initial sign in: add the user data from the database
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "STUDENT";
      }

      // Optional: Handle session updates if you change a user's role manually
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      return token;
    },

    // 🛡️ Session Callback: Controls what is accessible to the frontend/client
    async session({ session, token }) {
      if (session.user) {
        // Cast as 'any' to avoid default NextAuth Type restrictions
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };