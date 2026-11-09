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

export const metadata: Metadata = pageMetadata({
  title: "Skills4Life für Familien | Stärken und Selbstvertrauen",
  description:
    "Wir üben keine Schwächen, wir bauen Stärken auf. Ihr Kind erlebt Erfolge mit dem, was es gut kann. So wächst sein Selbstvertrauen.",
  path: "/familien",
});

export default function FamilienPage() {
  return (
    <>
      <FamilienHero />
      <FamilienReviewsStrip />
      <FamilienRecognition />
      <FamilienApproach />
      <FamilienStory />
      <FamilienAbout />
      <FamilienReviewsSpotlight />
      <AssessmentSection />
      <BookingSection />
      <FloatingCTA />
    </>
  );
}
