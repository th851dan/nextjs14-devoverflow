import React from "react";

import { ClerkProvider } from "@clerk/nextjs";

// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";

import { ThemeProvider } from "@/context/ThemeProvider";

import type { Metadata } from "next";

import "./globals.css";

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
      <head>
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="c93065fd-a388-4a95-9702-5513a9fa81ec"
          data-blockingmode="auto"
          type="text/javascript"
        ></script>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
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
      </body>
    </html>
  );
}
