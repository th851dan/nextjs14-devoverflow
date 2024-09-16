declare global {
  interface Window {
    Cookiebot: {
      consent: {
        necessary: boolean;
        preferences: boolean;
        statistics: boolean;
        marketing: boolean;
        stamp: string;
      };
      consentUTC: Date;
    };
  }
}

export {}; // This line is necessary to make the file a module
