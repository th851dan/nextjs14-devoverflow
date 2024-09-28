import CookieConsentBanner from "@components/cookie/cookie-consent-banner";
import ContactBanner from "@components/shared/ContactBanner";
import { CookieConsentProvider } from "@context/CookieConsentContext";
import { ThemeProvider } from "@context/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import PostHogPageView from "../PostHogPageView";

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
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
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
