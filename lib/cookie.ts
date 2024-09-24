import { CookieConsentData } from "./actions/shared.types";
import crypto from "crypto";

export function generateUniqueID(length: number = 44): string {
  const randomBytes = crypto.randomBytes(length);

  // Convert to base64
  const base64String = randomBytes.toString("base64");

  // Replace '+' and '/' with '-' and '_' respectively to make it URL-safe
  const urlSafeBase64 = base64String.replace(/\+/g, "-").replace(/\//g, "_");

  return urlSafeBase64;
}

export function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  const cookie = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
  document.cookie = cookie;
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

export async function saveConsentToDatabase(consentData: CookieConsentData) {
  try {
    const response = await fetch("/api/cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consentData),
    });
    const result = await response.json();
    if (!result.success) {
      console.error("Failed to save consent to database:", result.error);
    }
  } catch (error) {
    console.error("Error saving consent to database:", error);
  }
}
