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
  "/question/:id(.*)"
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  // When user accesses /profile redirects to login or to their own profile
  if (auth().userId && req.nextUrl.pathname === "/profile")
    return NextResponse.redirect(new URL(`/profile/${auth().userId}`, req.url));

});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
