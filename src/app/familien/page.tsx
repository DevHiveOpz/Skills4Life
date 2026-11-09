import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FamilienHero } from "@/components/familien/hero";
import { FamilienReviewsStrip } from "@/components/familien/reviews-strip";
import { FamilienReviewsSpotlight } from "@/components/familien/reviews-spotlight";
import { FamilienRecognition } from "@/components/familien/recognition";
import { FamilienApproach } from "@/components/familien/approach";
import { FamilienStory } from "@/components/familien/story";
import { FamilienAbout } from "@/components/familien/about";
import { AssessmentSection } from "@/components/sections/assessment";
import { BookingSection } from "@/components/sections/booking";
import { FloatingCTA } from "@/components/floating-cta";
import { reviews } from "@/content/familien";
import { getGoogleReviews } from "@/lib/google-reviews";

export const metadata: Metadata = pageMetadata({
  title: "Skills4Life für Familien | Stärken und Selbstvertrauen",
  description:
    "Wir üben keine Schwächen, wir bauen Stärken auf. Ihr Kind erlebt Erfolge mit dem, was es gut kann. So wächst sein Selbstvertrauen.",
  path: "/familien",
});

export default async function FamilienPage() {
  const googleReviews = await getGoogleReviews();
  const longestReviews = googleReviews?.items
    .toSorted((a, b) => b.quote.length - a.quote.length)
    .slice(0, reviews.spotlightCount);

  return (
    <>
      <FamilienHero />
      {googleReviews && <FamilienReviewsStrip data={googleReviews} />}
      <FamilienRecognition />
      <FamilienApproach />
      <FamilienStory />
      <FamilienAbout />
      {longestReviews && <FamilienReviewsSpotlight items={longestReviews} />}
      <AssessmentSection />
      <BookingSection />
      <FloatingCTA />
    </>
  );
}
