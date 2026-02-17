// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];
const DEFAULT_LOGGED_IN_ROUTE = "/";

// Map roles to their specific route prefixes
const ROLE_ROUTES: Record<string, string[]> = {
  player: ["/dashboard", "/events", "/communities"],
  host: ["/community"],
};

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userType = req.cookies.get("user_type")?.value;
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // 1. If user is logged in and tries to access auth routes (login/register), redirect to home
  if (token && AUTH_ROUTES.some((path) => pathname.startsWith(path))) {
    url.pathname = DEFAULT_LOGGED_IN_ROUTE;
    return NextResponse.redirect(url);
  }

  // 2. If user is NOT logged in and tries to access any protected route, redirect to login
  const isProtectedRoute = Object.values(ROLE_ROUTES)
    .flat()
    .some((path) => pathname.startsWith(path));

  if (!token && isProtectedRoute) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 3. Role-based access control
  if (token && userType) {
    // Determine which roles are allowed for the current pathname
    const allowedRolesForPath = Object.entries(ROLE_ROUTES)
      .filter(
        /* eslint-disable @typescript-eslint/no-unused-vars */
        ([_, routes]) => routes.some((route) => pathname.startsWith(route)),
        /* eslint-enable @typescript-eslint/no-unused-vars */
      )
      .map(([role]) => role);

    // If the path is restricted and the user's role is not among the allowed roles
    if (
      allowedRolesForPath.length > 0 &&
      !allowedRolesForPath.includes(userType) &&
      userType !== "admin"
    ) {
      const userHome = ROLE_ROUTES[userType]?.[0] || DEFAULT_LOGGED_IN_ROUTE;
      return NextResponse.redirect(new URL(userHome, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
