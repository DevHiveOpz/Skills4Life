import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = pageMetadata({
  title: "Skills4Life für Schulen | Bald verfügbar",
  description:
    "Das Angebot von Skills4Life für Schulen ist bald verfügbar. Für Familien gibt es schon heute Lernbegleitung, die bei den Stärken des Kindes ansetzt.",
  path: "/schulen",
});

export default function SchulenPage() {
  return <ComingSoon audience="Schulen" />;
}
