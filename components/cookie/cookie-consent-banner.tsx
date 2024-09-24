"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { CookieConsentData } from '@/lib/actions/shared.types'
import { generateUniqueID, getCookie, saveConsentToDatabase, setCookie } from '@/lib/cookie'
import { usePostHog } from 'posthog-js/react'
import Image from 'next/image'

const COOKIE_NAME = 'CookieConsent'

export default function CookieConsentBanner() {
    const posthog = usePostHog()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const consentData = getCookie(COOKIE_NAME)
        if (!consentData) {
            setIsVisible(true)
        }
        else {
            try {
                const parsedConsentData: CookieConsentData = JSON.parse(consentData)
                posthog.identify(parsedConsentData.consentID, { CookieConsentDate: parsedConsentData.consentUTC })
                if (parsedConsentData.consents.includes("analytics")) {
                    posthog.set_config({ persistence: "localStorage+cookie" })
                    console.log("set posthog to cookie")
                }
                setIsVisible(false)
            } catch (error) {
                console.error('Error parsing consent data from cookie:', error)
            }
        }
    }, [])

    const handleConsent = async (consents: string[]) => {
        const consentData: CookieConsentData = {
            consentID: generateUniqueID(),
            consentUTC: new Date().toISOString(),
            consents: consents,
        }
        setCookie(COOKIE_NAME, JSON.stringify(consentData), 365) // Cookie expires after 1 year
        setIsVisible(false)
        posthog.identify(consentData.consentID, { CookieConsentDate: consentData.consentUTC })
        if (consents.includes("analytics")) {
            posthog.set_config({ persistence: "localStorage+cookie" })
            console.log("set posthog to cookie")
        } else {
            posthog.set_config({ persistence: "memory" })
            console.log("set posthog to memory")
        }
        await saveConsentToDatabase(consentData)
    }

    const handleAcceptAll = () => {
        handleConsent(['necessary', 'analytics'])
    }

    const handleAcceptNecessary = () => {
        handleConsent(['necessary'])
    }

    if (!isVisible) return null

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-100 shadow-lg dark:bg-gray-800 "
        >
            <div className="container mx-1 max-w-screen-xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex-shrink-0">
                        <Image
                            src="/assets/images/favicon.svg"
                            alt="BuddyKnows Logo"
                            width={80}
                            height={80}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">We value your privacy</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of all cookies. By clicking "Accept Necessary", you consent to only necessary cookies.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleAcceptNecessary}
                            className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-md hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-primary-500 dark:hover:text-white border border-primary-500"
                        >
                            Accept Necessary
                        </button>
                        <button
                            onClick={handleAcceptAll}
                            className="px-4 py-2 text-sm font-medium text-white primary-gradient rounded-md "
                        >
                            Accept All
                        </button>
                    </div>
                    <button
                        onClick={handleAcceptNecessary}
                        className="absolute top-2 right-2 text-primary-500 hover:text-primary-100 dark:hover:text-primary-100"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}