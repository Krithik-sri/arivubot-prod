import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register"];

  if (!token && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if not authenticated
  }

  return NextResponse.next(); // Allow access if authenticated or on a public route
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/profile/:path*", "/space/:path*"], // Define protected routes
};
