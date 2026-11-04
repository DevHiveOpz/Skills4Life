import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = pageMetadata({
  title: "Skills4Life für Vereine | Bald verfügbar",
  description:
    "Das Angebot von Skills4Life für Vereine ist bald verfügbar. Für Familien gibt es schon heute Lernbegleitung, die bei den Stärken des Kindes ansetzt.",
  path: "/vereine",
});

export default function VereinePage() {
  return <ComingSoon audience="Vereine" />;
}
