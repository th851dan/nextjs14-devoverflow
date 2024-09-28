import { connectToDatabase } from "@lib/mongoose";

import CookieConsent from "@database/cookieConsent.model";
import { CookieConsentData } from "@context/CookieConsentContext";

export async function updateCookieConsent(params: CookieConsentData) {
  try {
    connectToDatabase();

    const { consentID, consentUTC, cookiePreferences } = params;

    await CookieConsent.updateOne(
      { consentID },
      { consentUTC, cookiePreferences },
      {
        new: true,
        upsert: true,
      }
    );
    return { params, success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
