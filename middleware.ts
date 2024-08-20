import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

const isProtectedRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/ask-question(.*)",
  "/collection(.*)",
  "/edit-answer/:id(.*)",
  "/profile/edit(.*)",
  "/profile",
  "/question/edit/:id(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  // When user accesses /profile redirects to login or to their own profile
  if (auth().userId && req.nextUrl.pathname === "/profile")
    return NextResponse.redirect(new URL(`/profile/${auth().userId}`, req.url));

  // Fix race condition BO-35
  if (auth().userId && req.nextUrl.pathname === "/onboarding") {
    const referer = req.headers.get("referer");

    if (referer) {
      // Perform logic based on the referer
      // redirected from /onboaring/waiting
      if (referer.includes("/waiting")) {
        return NextResponse.next();
      }
      // request comes from same page, e.x by clicking submit button
      if (referer === req.nextUrl.href) return NextResponse.next();
      return NextResponse.redirect(new URL(`/onboarding/waiting`, req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
