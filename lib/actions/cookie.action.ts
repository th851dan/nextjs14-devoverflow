import { connectToDatabase } from "@/lib/mongoose";

import type { CookieConsentData } from "./shared.types";

import CookieConsent from "@/database/cookieConsent.model";

export async function saveCookieConsent(params: CookieConsentData) {
  try {
    connectToDatabase();

    const { consentID, consentUTC, consents } = params;

    await CookieConsent.create({
      consentID,
      consentUTC,
      consents,
    });

    return params;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateCookieConsent(params: CookieConsentData) {
  try {
    connectToDatabase();

    const { consentID, consentUTC, consents } = params;

    await CookieConsent.findOneAndUpdate(
      { consentID },
      { consentUTC, consents },
      {
        new: true,
      }
    );
    return params;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
