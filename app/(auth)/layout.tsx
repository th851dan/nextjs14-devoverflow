import React from "react";

import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import ContactBanner from "@/components/shared/ContactBanner";

export const metadata: Metadata = {
  title: "Auth — BuddyKnows",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex size-full min-h-screen flex-col items-center justify-between bg-auth-light bg-cover bg-center bg-no-repeat dark:bg-auth-dark">
      <div />
      <ContactBanner />
      <div>{children}</div>
      <div className="mb-2">
        <Footer />
      </div>
    </main>
  );
}
