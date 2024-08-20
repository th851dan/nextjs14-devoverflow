import React from "react";

import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Auth — BuddyKnows",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col justify-between min-h-screen w-full h-full items-center bg-auth-light bg-cover bg-center bg-no-repeat dark:bg-auth-dark">
      <div />
      <div>{children}</div>
      <div className="mb-2">
        <Footer />
      </div>
    </main>
  );
}
