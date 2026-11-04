// Google Analytics 4. The measurement ID is public (it is visible in every
// page that loads Google Analytics), so it is not a secret.
export const GA_MEASUREMENT_ID = "G-8TR62PKXSJ";

export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "s4l-consent-analytics";
const OPEN_EVENT = "s4l:open-consent";

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the banner simply shows again on the next visit
  }
}

/** Removes the Google Analytics cookies after consent is withdrawn */
export function deleteAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
      }
      document.cookie = `${name}=; Max-Age=0; path=/`;
    }
  }
}

/** Opens the cookie banner again, e.g. from the footer */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenConsentSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
