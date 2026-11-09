import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { datenschutz } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz | Skills4Life",
  description:
    "Datenschutzerklärung von Skills4Life: welche Daten wir erheben, wofür wir sie nutzen und welche Rechte Sie haben.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return <LegalPage {...datenschutz} />;
}
