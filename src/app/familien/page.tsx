import type { Metadata } from "next";
import { FamilienHero } from "@/components/familien/hero";
import { FamilienRecognition } from "@/components/familien/recognition";
import { FamilienApproach } from "@/components/familien/approach";
import { FamilienStory } from "@/components/familien/story";
import { FamilienAbout } from "@/components/familien/about";
import { AssessmentSection } from "@/components/sections/assessment";
import { BookingSection } from "@/components/sections/booking";
import { FloatingCTA } from "@/components/floating-cta";

export const metadata: Metadata = {
  title:
    "Skills4Life für Familien | Stärken entdecken, Selbstvertrauen aufbauen",
  description:
    "Wir entdecken die Stärken Ihres Kindes und bauen darauf Erfolge auf. So wächst Selbstvertrauen, und zuhause kehrt wieder Ruhe ein.",
};

export default function FamilienPage() {
  return (
    <>
      <FamilienHero />
      <FamilienRecognition />
      <FamilienApproach />
      <FamilienStory />
      <FamilienAbout />
      <AssessmentSection />
      <BookingSection />
      <FloatingCTA />
    </>
  );
}
