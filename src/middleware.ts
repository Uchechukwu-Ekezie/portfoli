import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Get token from cookie
  const token = req.cookies.get('authToken')?.value;

  // If user is authenticated and accessing login page, redirect to admin
  if (token && path === "/login") {
    // Verify token is not expired
    try {
      const tokenPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      if (tokenPayload.exp && tokenPayload.exp * 1000 > Date.now()) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    } catch {
      // Invalid token, continue to login
    }
  }

  // Protect all admin routes
  if (path.startsWith("/admin")) {
    // No token - redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    // Verify token is valid and not expired
    try {
      const tokenPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      
      // Check if token is expired
      if (tokenPayload.exp && tokenPayload.exp * 1000 < Date.now()) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      
      // Token is valid, allow access
      return NextResponse.next();
    } catch {
      // Invalid token format - redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
