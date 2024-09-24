import React from "react";

import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/shared/navbar/Navbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Footer from "@/components/shared/Footer";
import ContactBanner from "@/components/shared/ContactBanner";
import CookieConsentBanner from "@/components/cookie/cookie-consent-banner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <ContactBanner />
      <Navbar />
      <div className="flex">
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col justify-between px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
          <div className="mt-6 lg:hidden">
            <Footer />
          </div>
        </section>

        <RightSidebar />
      </div>
      <CookieConsentBanner />
      <Toaster />
    </main>
  );
};

export default Layout;
