import { Schema, model, models } from "mongoose";

export const CookieConsentSchema = new Schema({
  consentID: { type: String, required: true, unique: true },
  consentUTC: { type: Date, default: Date.now, required: true },
  cookiePreferences: {
    type: {
      necessary: { type: Boolean, default: true },
      functional: { type: Boolean, default: false },
      analytics: { type: Boolean, default: false },
      marketing: { type: Boolean, default: false },
    },
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const CookieConsent =
  models.CookieConsent || model("CookieConsent", CookieConsentSchema);

export default CookieConsent;
