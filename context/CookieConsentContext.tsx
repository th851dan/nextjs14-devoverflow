"use client"

import { generateUniqueID, getCookie, setCookie, updateConsentToDatabase } from '@/lib/cookie'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'

type CookiePreferences = {
    necessary: boolean
    functional: boolean
    analytics: boolean
    marketing: boolean
}

export type CookieConsentData = {
    consentID: string;
    consentUTC: string;
    cookiePreferences: CookiePreferences;
}

type CookieConsentContextType = {
    cookiePreferences: CookiePreferences
    changeCookiePreferences: (preferences: Partial<CookiePreferences>) => void
    updateCookiePreferences: (preferences: Partial<CookiePreferences>) => void
    consentGiven: boolean
    setConsentGiven: (given: boolean) => void
}

const defaultCookiePreferences: CookiePreferences = {
    necessary: true, // Always true as necessary cookies can't be disabled
    functional: false,
    analytics: false,
    marketing: false,
}

const createNewCookieConsentData = (
    cookiePreferences: CookiePreferences
): CookieConsentData => ({
    consentID: generateUniqueID(),
    consentUTC: new Date().toISOString(),
    cookiePreferences,
});

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export const useCookieConsent = () => {
    const context = useContext(CookieConsentContext)
    if (context === undefined) {
        throw new Error('useCookieConsent must be used within a CookieConsentProvider')
    }
    return context
}

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(defaultCookiePreferences)
    const [cookieConsentData, setCookieConsentData] = useState<CookieConsentData>({ consentID: "", consentUTC: "", cookiePreferences: defaultCookiePreferences })
    const [consentGiven, setConsentGiven] = useState<boolean>(false)
    const [triggerUpdateConsentToDatabase, setTriggerUpdateconsentToDatabase] = useState(false)
    const posthog = usePostHog();

    useEffect(() => {
        const storedCookieConsent = getCookie(process.env.NEXT_PUBLIC_COOKIE_CONSENT_NAME || "CookieConsent")

        try {
            if (storedCookieConsent) {
                const parseCookieConsentData: CookieConsentData = JSON.parse(storedCookieConsent)
                setCookieConsentData(parseCookieConsentData)
                setCookiePreferences(parseCookieConsentData.cookiePreferences)
                setConsentGiven(true)
            }
            else {
                setCookieConsentData(createNewCookieConsentData(defaultCookiePreferences))
            }
        } catch (error) {
            console.error("Cannot parse CookieConsent in Cookies")
            console.log("Create new CookieConsent instance")
            setCookieConsentData(createNewCookieConsentData(defaultCookiePreferences))
        }
    }, [])

    useEffect(() => {
        if (cookieConsentData.consentID) {
            posthog.identify(cookieConsentData.consentID, {
                CookieConsentDate: cookieConsentData.consentUTC,
            });
        }
        console.log("cookieConsentData changed" + JSON.stringify(cookieConsentData))


        const update = async () => await updateConsentToDatabase(cookieConsentData)
        if (triggerUpdateConsentToDatabase) {
            setCookie(process.env.NEXT_PUBLIC_COOKIE_CONSENT_NAME || "CookieConsent", JSON.stringify(cookieConsentData), 365)
            update()
            console.log("cookieConsentData update " + JSON.stringify(cookieConsentData))
            setTriggerUpdateconsentToDatabase(false)

            if (cookieConsentData.cookiePreferences.analytics) {
                posthog.set_config({ persistence: "localStorage+cookie" });
                console.log("set posthog to cookie");
            }
            else {
                posthog.set_config({ persistence: "memory" });
                console.log("set posthog to memory");
            }
        }
    }, [cookieConsentData])

    const changeCookiePreferences = async (preferences: Partial<CookiePreferences>) => {
        const updatedPreferences = { ...cookiePreferences, ...preferences }
        setCookiePreferences(updatedPreferences)
    }

    const updateCookiePreferences = async (preferences: Partial<CookiePreferences>) => {
        const updatedPreferences = { ...cookiePreferences, ...preferences }
        setCookiePreferences(updatedPreferences)
        setCookieConsentData({ ...cookieConsentData, cookiePreferences: updatedPreferences })
        setTriggerUpdateconsentToDatabase(true)
    }

    const updateConsentGiven = (given: boolean) => {
        setConsentGiven(given)
    }

    return (
        <CookieConsentContext.Provider
            value={{
                cookiePreferences,
                updateCookiePreferences,
                changeCookiePreferences,
                consentGiven,
                setConsentGiven: updateConsentGiven
            }}
        >
            {children}
        </CookieConsentContext.Provider>
    )
}