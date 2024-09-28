import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  "/:locale/onboarding(.*)",
  "/:locale/ask-question(.*)",
  "/:locale/collection(.*)",
  "/:locale/edit-answer/:id(.*)",
  "/:locale/profile/edit(.*)",
  "/:locale/profile",
  "/:locale/question/edit/:id(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  // When user accesses /profile redirects to login or to their own profile
  if (auth().userId && req.nextUrl.pathname === "/profile")
    return NextResponse.redirect(new URL(`/profile/${auth().userId}`, req.url));

  if (req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();

  }
  return handleI18nRouting(req)

});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", '/(de|en)/:path*'],
};
