// app/providers.js
'use client'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useCookiebotCallbacks } from '@/lib/cookiebot'
import { usePathname, useSearchParams } from 'next/navigation'
import { maskUserIdInEvent } from '@/lib/privacy';

export function PHProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // Function to recursively mask userId in all properties of the event


    // Override the global PostHog capture method to mask userId
    const originalCapture = posthog.capture.bind(posthog);

    posthog.capture = (eventName: string, properties?: any, options?: any) => {
        // Mask userId in event properties
        let url = window.origin + pathname
        if (searchParams.toString()) {
            url = url + `?${searchParams.toString()}`
        }
        properties = {
            '$pathname': pathname,
            '$current_url': url,
            ...properties
        }
        const maskedProperties = maskUserIdInEvent(properties);

        // Call the original PostHog capture method with masked properties
        return originalCapture(eventName, maskedProperties, options);
    };
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            persistence: "memory",
            // person_profiles: 'identified_only',
            capture_pageview: false, // Disable automatic pageview capture, as we capture manually
            capture_pageleave: true // Enable pageleave capture
        })
    }, [])


    useCookiebotCallbacks(
        {
            CookiebotOnLoadCallback: () => {
                if (window.Cookiebot.consent.statistics) {
                    posthog.set_config({ persistence: "localStorage+cookie" })
                    console.log("set posthog to cookie", window.Cookiebot)
                    console.log("Consent date", window.Cookiebot.consentUTC)
                } else {
                    posthog.set_config({ persistence: "memory" })
                    console.log("set posthog to memory")
                }

                // Capture CookiebotWidget at runtime and not capture by Posthog
                const consentIdElement = ReactDOM.findDOMNode(document.querySelector("#CookiebotWidget"));
                if (consentIdElement && consentIdElement instanceof Element)
                    if (consentIdElement) {
                        consentIdElement.classList.add("ph-no-capture"); // Add custom class at runtime
                    }
                posthog.identify(window.Cookiebot.consent.stamp, { CookiebotConsentDate: window.Cookiebot.consentUTC.toString() })
            }
        })


    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}