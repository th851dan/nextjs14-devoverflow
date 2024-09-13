// app/providers.js
'use client'
import React, { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useCookiebotCallbacks } from '@/lib/cookiebot'

export function PHProvider({ children }: { children: React.ReactNode }) {
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

                posthog.identify(window.Cookiebot.consent.stamp, { CookiebotConsentDate: window.Cookiebot.consentUTC.toString() })
            }
        })


    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}