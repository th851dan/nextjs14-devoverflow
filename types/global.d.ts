declare global {
  interface CookieConsent {
    consent: {
      necessary: boolean;
      preferences: boolean;
      statistics: boolean;
      marketing: boolean;
    };
  }
  var Cookiebot: CookieConsent | undefined; // Declare as global var
}

export {}; // This line is necessary to make the file a module
