import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import ROUTES from "./constants/routes";
import { routing } from "./i18n/routing";
import setLanguageAction from "./i18n/set-language-action";

// ====================================
// Locale Middleware (next-intl setup)
// ====================================
const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: "always", // Ensures all routes include locale prefix (e.g., /en)
});

// ====================================
// Define route access control groups
// ====================================
const authRoutes = ["/login"];
const protectedRoutes = ["/admin"];

// ====================================
// Main Middleware Function
// ====================================
export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;
  const response = NextResponse.next();

  // ====================================
  // Bypass static assets and API routes
  // ====================================
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/assets")
  ) {
    return response;
  }

  // ====================================
  // Apply locale handling middleware. Determine if route is public (uses next-intl)
  // ====================================
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = !isAuthRoute && !isProtectedRoute;

  // 👉 Apply intl only to public routes
  if (isPublicRoute) {
    const intlResponse = intlMiddleware(request);
    if (intlResponse) return intlResponse;
  }

  // ====================================
  // Check and set language cookie
  // ====================================
  const cookie = await cookies();
  const language = cookie.get("language");
  if (!language) {
    setLanguageAction("en");
  }

  // ====================================
  // Fetch user token from NextAuth
  // ====================================
  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const token = nextAuthToken || null;
  const redirect = (path) => NextResponse.redirect(new URL(path, request.url));

  // ====================================
  // Redirect authenticated users away from /login
  // ====================================
  if (isAuthRoute) {
    return token ? redirect(ROUTES.ADMIN_DASHBOARD_ECOMMERCE) : response;
  }

  // ====================================
  // Restrict access to protected /admin routes
  // ====================================
  if (isProtectedRoute) {
    if (!token) return redirect(ROUTES.LOGIN); // Not logged in

    if (!token.role || !token.role.includes("Admin")) {
      return redirect(`/${routing.defaultLocale}${ROUTES.HOME}`); // Lacks Admin role
    }
  }

  return response;
}

// ====================================
// Middleware Matcher Configuration
// ====================================
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (image files)
     * - assets/ (other static assets)
     * - api/ (API routes)
     */
    "/((?!api|_next|favicon.ico|images|assets).*)",
  ],
};
