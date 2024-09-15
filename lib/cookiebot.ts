import { useEffect } from "react";

interface UseCookiebotCallbacksProps {
  CookiebotOnLoadCallback: EventListener;
}
// Hook to initialize Cookiebot callbacks
export const useCookiebotCallbacks = ({
  CookiebotOnLoadCallback,
}: UseCookiebotCallbacksProps) => {
  useEffect(() => {
    // Ensure Cookiebot is available before assigning callbacks
    const initializeCookiebotCallbacks = () => {
      if (typeof window.Cookiebot !== "undefined") {
        window.addEventListener("CookiebotOnLoad", CookiebotOnLoadCallback);
      } else {
        console.error("Cookiebot is not loaded yet.");
      }
    };

    // Run the initialization function after the script has loaded
    initializeCookiebotCallbacks();
  }, []);
};
