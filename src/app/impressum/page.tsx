import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { impressum } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Impressum | Skills4Life",
  description:
    "Impressum von Skills4Life, Lernbegleitung in Zürich: Unternehmen, Kontakt und Angaben zum Handelsregister.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return <LegalPage {...impressum} />;
}
