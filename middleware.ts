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

  // Fix race condition BO-35
  if (auth().userId && req.nextUrl.pathname === "/onboarding") {
    const referer = req.headers.get("referer");
    //Potential bug here(detected 31.08.2024): when user using OAuth of thid parties, get redirected to onboarding,
    //the 'referer' might be null, when the username option on Clerk is turned off. Since username is turned on, user gets
    //one extra step to enter username, the redirection now somehow also carries the referer property.
    if (referer) {
      // Perform logic based on the referer
      // redirected from /onboaring/waiting
      if (referer.includes("/waiting")) {
        return handleI18nRouting(req)
      }
      // request comes from same page, e.x by clicking submit button
      if (referer === req.nextUrl.href) return handleI18nRouting(req)


      return NextResponse.redirect(new URL(`/onboarding/waiting`, req.url));
    }

  }
  if (req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();

  }
  return handleI18nRouting(req)

});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", '/(de|en)/:path*'],
};
