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
      console.log(`Request was referred from: ${referer}`);

      // Perform logic based on the referer
      if (referer.includes("/waiting")) {
        console.log("Request came from the onboarding page");
        return NextResponse.next();
      }
      if (referer === req.nextUrl.href) return NextResponse.next();
      return NextResponse.redirect(new URL(`/onboarding/waiting`, req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
