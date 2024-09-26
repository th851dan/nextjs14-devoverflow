"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useCookieConsent } from "@/context/CookieConsentContext"
import { toast } from "@/components/ui/use-toast";

export default function CookieDeclaration() {
  const { cookiePreferences, changeCookiePreferences, updateCookiePreferences, setConsentGiven } = useCookieConsent()

  const handleToggle = (cookieType: keyof typeof cookiePreferences) => {
    changeCookiePreferences({ [cookieType]: !cookiePreferences[cookieType] })
  }

  const handleSave = () => {
    updateCookiePreferences(cookiePreferences)
    setConsentGiven(true)
    toast({
      title: "Cookie Preferences updated successfully 🎉",
      variant: "default",
    });
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">We value your privacy</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          We use cookies to enhance your browsing experience and analyze our traffic. Please review and adjust your cookie preferences below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Necessary Cookies</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                These cookies are essential for the website to function properly. They cannot be disabled.
              </p>
            </div>
            <Switch
              id="nessesary"
              checked
              disabled
              className="bg-light-800 dark:bg-gray-700"
            />
          </div>
        </div>
        {(['functional', 'analytics', 'marketing'] as const).map((cookieType) => (
          <div key={cookieType} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{cookieType} Cookies</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {cookieType === 'functional' && 'These cookies enable personalized features and remember your preferences.'}
                  {cookieType === 'analytics' && 'These cookies help us understand how visitors interact with our website.'}
                  {cookieType === 'marketing' && 'These cookies are used to deliver personalized advertisements.'}
                </p>
              </div>
              <Switch
                id={cookieType}
                checked={cookiePreferences[cookieType]}
                onCheckedChange={() => handleToggle(cookieType)}
                className="bg-light-800 dark:bg-gray-700"
              />
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t border-gray-200 dark:border-gray-700">
        <Button
          onClick={handleSave}
          className="w-full bg-primary-500 hover:bg-primary-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  )
}