"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { consent } from "@/content/consent";
import {
  GA_MEASUREMENT_ID,
  type ConsentChoice,
  deleteAnalyticsCookies,
  onOpenConsentSettings,
  readConsent,
  saveConsent,
} from "@/lib/analytics";

// Google Analytics loads only after the visitor allows it in the banner
export function Analytics() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the choice lives in the browser only
    setChoice(stored);
    setBannerOpen(stored === null);
    return onOpenConsentSettings(() => setBannerOpen(true));
  }, []);

  function decide(next: ConsentChoice) {
    saveConsent(next);
    setBannerOpen(false);
    if (choice === "granted" && next === "denied") {
      // Stop Google Analytics that is already running on this page
      deleteAnalyticsCookies();
      window.location.reload();
      return;
    }
    setChoice(next);
  }

  return (
    <>
      {choice === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {bannerOpen && (
        <section
          aria-labelledby="consent-title"
          className="fixed inset-x-0 bottom-0 z-60 border-t border-border bg-surface py-space-4"
        >
          <Container className="flex flex-col gap-space-3 md:flex-row md:items-center md:justify-between md:gap-space-5">
            <div className="max-w-[65ch]">
              <h2 id="consent-title" className="mb-space-2 text-h3 text-text">
                {consent.title}
              </h2>
              <p className="text-small text-muted">
                {consent.text}{" "}
                <Link
                  href={consent.privacyLink.href}
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  {consent.privacyLink.label}
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-space-2 sm:flex-row md:shrink-0">
              <Button variant="secondary" onClick={() => decide("denied")}>
                {consent.reject}
              </Button>
              <Button variant="primary" onClick={() => decide("granted")}>
                {consent.accept}
              </Button>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
