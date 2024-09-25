import { Schema, model, models, Document } from "mongoose";

export interface ICookieConsent extends Document {
  consentID: string;
  consentUTC: string;
  consents: string[];
}

export const CookieConsentSchema = new Schema({
  consentID: { type: String, required: true, unique: true },
  consentUTC: { type: Date, default: Date.now, required: true },
  consents: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const CookieConsent =
  models.CookieConsent || model("CookieConsent", CookieConsentSchema);

export default CookieConsent;
