import { useEffect } from "react";

interface UseCookiebotCallbacksProps {
  CookiebotOnAcceptCallback: EventListener;
  CookiebotOnDeclineCallback: EventListener;
}
// Hook to initialize Cookiebot callbacks
export const useCookiebotCallbacks = ({
  CookiebotOnAcceptCallback,
  CookiebotOnDeclineCallback,
}: UseCookiebotCallbacksProps) => {
  useEffect(() => {
    // Ensure Cookiebot is available before assigning callbacks
    const initializeCookiebotCallbacks = () => {
      if (typeof Cookiebot !== "undefined") {
        window.addEventListener("CookiebotOnAccept", CookiebotOnAcceptCallback);
        window.addEventListener(
          "CookiebotOnDecline",
          CookiebotOnDeclineCallback
        );
      } else {
        console.error("Cookiebot is not loaded yet.");
      }
    };

    // Run the initialization function after the script has loaded
    initializeCookiebotCallbacks();
  }, []);
};
