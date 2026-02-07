import { HeroSection } from "@/components/sections/hero";
import { LocationsBanner } from "@/components/sections/locations-banner";
import { ProblemSection } from "@/components/sections/problem";
import { AboutSection } from "@/components/sections/about";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { PricingSection } from "@/components/sections/pricing";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { AssessmentSection } from "@/components/sections/assessment";
import { BookingSection } from "@/components/sections/booking";
import { FAQSection } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LocationsBanner />
      <ProblemSection />
      <AboutSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <AssessmentSection />
      <BookingSection />
      <FAQSection />
    </>
  );
}
