import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';


// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";

import { ThemeProvider } from "@/context/ThemeProvider";

import type { Metadata } from "next";

import "./globals.css";
import { PHProvider } from "./providers";
import dynamic from 'next/dynamic'
import ContactBanner from "@/components/shared/ContactBanner";
import CookieConsentBanner from "@/components/cookie/cookie-consent-banner";
import { CookieConsentProvider } from "@/context/CookieConsentContext";

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "BuddyKnows",
  description:
    "A community-driven platform for asking and answering questions about your student life. Get help, share knowledge, and collaborate with students around you.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PHProvider>
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <CookieConsentProvider>
            <ContactBanner />
            <PostHogPageView />
            <ClerkProvider
              appearance={{
                elements: {
                  formButtonPrimary: "primary-gradient",
                  footerActionLink: "primary-text-gradient hover:text-primary-500",
                },
              }}
            >
              <ThemeProvider>{children}</ThemeProvider>
            </ClerkProvider>
            <Analytics />
            <SpeedInsights />
            <CookieConsentBanner />
          </CookieConsentProvider>
        </body>
      </PHProvider>
    </html>
  );
}
