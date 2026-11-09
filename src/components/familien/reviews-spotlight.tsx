"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { reviews } from "@/content/familien";
import type { GoogleReview } from "@/lib/google-reviews";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const { spotlight } = reviews;

// One large review at a time. It changes only when the visitor clicks. All
// reviews share one grid cell, so the section keeps the height of the longest.
export function FamilienReviewsSpotlight({ items }: { items: GoogleReview[] }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;

  function go(step: 1 | -1) {
    setCurrent((index) => (index + step + total) % total);
  }

  return (
    <Section id="stimmen" tone="primary">
      <div className="mx-auto max-w-[65ch] text-center">
        <p className="mb-space-5 text-overline uppercase text-on-primary">
          {spotlight.overline}
        </p>

        <div className="grid" aria-live="polite">
          {items.map((review, index) => (
            <figure
              key={review.author}
              aria-hidden={index !== current}
              className={cn(
                "col-start-1 row-start-1 flex flex-col justify-center gap-space-4",
                index !== current && "invisible",
              )}
            >
              <blockquote className="line-clamp-8 text-h3 text-on-primary md:line-clamp-6">
                {review.quote}
              </blockquote>
              <figcaption className="text-body text-on-primary">
                <a
                  href={review.authorUrl ?? site.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={index === current ? undefined : -1}
                  className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary"
                >
                  {review.author}
                </a>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-space-5 flex items-center justify-center gap-space-3">
          <Button
            variant="onDarkOutline"
            className="size-touch px-0"
            onClick={() => go(-1)}
            aria-label={spotlight.previous}
          >
            <Icon icon={ChevronLeft} size={24} />
          </Button>
          <p className="text-small text-on-primary">
            {current + 1} von {total}
          </p>
          <Button
            variant="onDarkOutline"
            className="size-touch px-0"
            onClick={() => go(1)}
            aria-label={spotlight.next}
          >
            <Icon icon={ChevronRight} size={24} />
          </Button>
        </div>
      </div>
    </Section>
  );
}
