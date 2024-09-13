// app/providers.js
'use client'
import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useCookiebotCallbacks } from '@/lib/cookiebot'

export function PHProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            persistence: "memory",
            //person_profiles: 'identified_only',
            capture_pageview: false, // Disable automatic pageview capture, as we capture manually
            capture_pageleave: true // Enable pageleave capture
        })
    }, [])


    useCookiebotCallbacks(
        {
            CookiebotOnAcceptCallback: () => {
                if (Cookiebot.consent.statistics) {
                    posthog.set_config({ persistence: "localStorage+cookie" })
                    console.log("set posthog to cookie")
                } else {
                    posthog.set_config({ persistence: "memory" })
                    console.log("set posthog to memory")
                }
            },
            CookiebotOnDeclineCallback: () => {
                posthog.set_config({ persistence: "memory" })
                console.log("set posthog to memory")
            }
        })


    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}