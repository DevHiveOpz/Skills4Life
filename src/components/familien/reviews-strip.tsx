import { Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Marquee } from "@/components/ui/marquee";
import { reviews } from "@/content/familien";
import { site } from "@/lib/site";

export function FamilienReviewsStrip() {
  return (
    <Section id="bewertungen" className="overflow-hidden">
      <div className="mb-space-5 text-center">
        <h2 className="mb-space-2 text-h2 text-text">
          {reviews.strip.headline}
        </h2>
        <Button asChild variant="link" className="whitespace-normal">
          <a
            href={site.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon={Star} size={20} />
            <span>{reviews.rating}</span>
          </a>
        </Button>
      </div>

      <Marquee label={reviews.strip.sliderLabel}>
        {reviews.strip.items.map((review) => (
          <li
            key={review.quote}
            className="flex w-[85vw] shrink-0 sm:w-[45vw] lg:w-[30vw]"
          >
            <Card variant="brand" className="w-full justify-between">
              <blockquote className="text-body text-text">
                «{review.quote}»
              </blockquote>
              <p className="text-small text-muted">{review.author}</p>
            </Card>
          </li>
        ))}
      </Marquee>
    </Section>
  );
}
