"use client";

import { useEffect } from "react";

export function CookieDeclaration() {
  useEffect(() => {
    const cookieBotWrapper = document.getElementById("CookiebotDeclaration");
    if (cookieBotWrapper) {
      const script = document.createElement("script");
      script.id = "CookieDeclaration";
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://consent.cookiebot.com/${process.env.NEXT_PUBLIC_COOKIEBOT_DOMAIN_GROUP_ID}/cd.js`;

      cookieBotWrapper.appendChild(script);
    }
  }, []);

  return <div id="CookiebotDeclaration" className="text-dark100_light900" />;
}
