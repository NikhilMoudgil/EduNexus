import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// This protects the /community page and any future dashboard pages
export const config = { 
  matcher: ["/community/:path*", "/dashboard/:path*"] 
};