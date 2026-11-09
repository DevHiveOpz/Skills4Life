import { Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { ScrollRow } from "@/components/ui/scroll-row";
import { reviews } from "@/content/familien";
import { site } from "@/lib/site";

export function FamilienReviewsStrip() {
  return (
    <Section id="bewertungen">
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

      <ScrollRow
        label={reviews.strip.sliderLabel}
        previousLabel={reviews.strip.previous}
        nextLabel={reviews.strip.next}
      >
        {reviews.strip.items.map((review, index) => (
          <li
            key={index}
            className="flex shrink-0 basis-[85%] snap-start sm:basis-[45%] lg:basis-[calc((100%-2*var(--space-4))/3)]"
          >
            <Card variant="brand" className="w-full justify-between">
              <blockquote className="text-body text-text">
                {review.quote}
              </blockquote>
              <p className="text-small text-muted">{review.author}</p>
            </Card>
          </li>
        ))}
      </ScrollRow>
    </Section>
  );
}
